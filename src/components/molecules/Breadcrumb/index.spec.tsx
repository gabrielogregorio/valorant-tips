import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Breadcrumb from './index';

expect.extend(toHaveNoViolations);

describe('Breadcrumb', () => {
  const entriesList = [{ label: 'Início', href: '/' }, { label: 'Mapas', href: '/map' }, { label: 'Agentes' }];

  it('should render breadcrumbs with correct entries', () => {
    render(<Breadcrumb entries={entriesList} />);

    const navElement = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(navElement).toBeInTheDocument();

    const inicioLink = screen.getByRole('link', { name: /início/i });
    expect(inicioLink).toBeInTheDocument();
    expect(inicioLink).toHaveAttribute('href', '/');

    const mapasLink = screen.getByRole('link', { name: /mapas/i });
    expect(mapasLink).toBeInTheDocument();
    expect(mapasLink).toHaveAttribute('href', '/map');

    // The last element is the current page and should not be a link
    const agentesText = screen.getByText(/agentes/i);
    expect(agentesText).toBeInTheDocument();
    expect(agentesText.tagName).toBe('SPAN');
    expect(agentesText).toHaveAttribute('aria-current', 'page');
  });

  it('should not violate accessibility standards', async () => {
    const { container } = render(<Breadcrumb entries={entriesList} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should return null if entries is empty', () => {
    const { container } = render(<Breadcrumb entries={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
