import { render as rtlRender } from '@testing-library/react';
import { axe } from 'jest-axe';
import { expect } from 'vitest';

export async function testA11y(ui: React.ReactElement, options = {}) {
    const { container } = rtlRender(ui, options);
    const results = await axe(container);

    // Custom matcher already extended in vitest.setup.ts
    expect(results).toHaveNoViolations();

    return { container, results };
}
