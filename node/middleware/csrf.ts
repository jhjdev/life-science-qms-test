import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

const CSRF_COOKIE = 'csrf-token';
const CSRF_HEADER = 'x-csrf-token';
const CSRF_BODY_FIELD = '_csrf';
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Double-submit cookie CSRF protection.
 *
 * - On every request, ensures a CSRF token cookie exists (creates one if not).
 * - On state-changing requests (POST, PUT, PATCH, DELETE), validates that the
 *   token sent via header or body matches the cookie value.
 * - Exposes `req.csrfToken()` so routes can return the token to clients.
 */
export function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Ensure a CSRF token cookie is present
  let token: string = req.cookies?.[CSRF_COOKIE];
  if (!token) {
    token = randomUUID();
    res.cookie(CSRF_COOKIE, token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // Expose token via response header so clients can read it
  res.setHeader('X-CSRF-Token', token);

  // Attach helper so routes can retrieve the current token
  (req as any).csrfToken = () => token;

  // Safe methods don't need validation
  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  // Validate: the token from header or body must match the cookie
  const submitted =
    req.headers[CSRF_HEADER] ??
    (req.body as Record<string, unknown>)?.[CSRF_BODY_FIELD];

  if (!submitted || submitted !== token) {
    res.status(403).json({ error: 'Invalid CSRF token' });
    return;
  }

  next();
}
