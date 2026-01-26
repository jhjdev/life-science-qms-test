import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import createError from 'http-errors';
import helmet from 'helmet';
import csurf from 'csurf';
import { setupSwagger } from './swagger-setup.js';
import { initializeDatabase } from './utils/db-init.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import groupRouter from './routes/groups.js';
import groupMemberRouter from './routes/groupMembers.js';
import groupHierarchyRouter from './routes/groupHierarchy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security middleware
app.use(helmet());
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// CSRF Protection
const csrfProtection = csurf({ cookie: true });

// Initialize Swagger documentation
setupSwagger(app);

// Initialize database and seed test data
initializeDatabase().catch(console.error);

// Route to get CSRF token (public, no CSRF protection needed)
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken ? req.csrfToken() : null });
});

// Apply CSRF protection to all routes
app.use(csrfProtection);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupRouter);

// catch 404 and forward to error handler
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  next(createError(404));
});

// error handler
app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

export default app;
