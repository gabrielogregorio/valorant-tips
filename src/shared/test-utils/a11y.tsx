import { render as rtlRender } from '@testing-library/react';
import { axe } from 'jest-axe';
import { expect } from 'vitest';

export async function testA11y(ui: React.ReactElement, options = {}) {
  const { container } = rtlRender(ui, options);
  const results = await axe(container);

  expect(results).toHaveNoViolations();

  return { container, results };
}
