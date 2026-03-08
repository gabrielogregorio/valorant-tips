import '@testing-library/jest-dom/vitest';
import { expect, vi } from 'vitest';
import * as matchers from 'jest-axe';

expect.extend(matchers.toHaveNoViolations);

// Polyfill for jest methods if used in tests

globalThis.jest = {
  fn: vi.fn,
  spyOn: vi.spyOn,
  mock: vi.mock,
  clearAllMocks: vi.clearAllMocks,
  resetAllMocks: vi.resetAllMocks,
} as any;
