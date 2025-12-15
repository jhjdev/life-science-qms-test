import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/svelte';

// Mock SMUI components in tests.
// After the Svelte 5 + SMUI v8 upgrade, many SMUI components no longer forward DOM events
// in a way that plays nicely with jsdom/testing-library. For unit tests we mock them to
// simple native elements so we can focus on our own logic.
vi.mock('@smui/button', async () => ({
  default: (await import('./mocks/smui/Button.svelte')).default,
}));

vi.mock('@smui/icon-button', async () => ({
  default: (await import('./mocks/smui/IconButton.svelte')).default,
}));

vi.mock('@smui/textfield', async () => ({
  default: (await import('./mocks/smui/Textfield.svelte')).default,
}));

vi.mock('@smui/data-table', async () => {
  const DataTable = (await import('./mocks/smui/DataTable.svelte')).default;
  const Head = (await import('./mocks/smui/Head.svelte')).default;
  const Body = (await import('./mocks/smui/Body.svelte')).default;
  const Row = (await import('./mocks/smui/Row.svelte')).default;
  const Cell = (await import('./mocks/smui/Cell.svelte')).default;
  return { default: DataTable, Head, Body, Row, Cell };
});

vi.mock('@smui/select', async () => {
  const Select = (await import('./mocks/smui/Select.svelte')).default;
  const Option = (await import('./mocks/smui/Option.svelte')).default;
  return { default: Select, Option };
});

vi.mock('@smui/card', async () => {
  const Card = (await import('./mocks/smui/Card.svelte')).default;
  const Content = (await import('./mocks/smui/CardContent.svelte')).default;
  const Actions = (await import('./mocks/smui/CardActions.svelte')).default;
  return { default: Card, Content, Actions };
});

// Mock fetch for tests
global.fetch = vi.fn();

// Mock ResizeObserver which is not available in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill Web Animations API for Svelte transitions in jsdom
if (!Element.prototype.animate) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Element.prototype as any).animate = () => ({
    cancel: vi.fn(),
    finish: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    reverse: vi.fn(),
    onfinish: null,
  });
}

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Setup any global mocks or configurations here
beforeAll(() => {
  // Setup code that runs before all tests
});

afterAll(() => {
  // Cleanup code that runs after all tests
});
