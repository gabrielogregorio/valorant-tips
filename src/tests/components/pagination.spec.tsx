import { render, screen } from '@testing-library/react';
import { Pagination } from '@/widgets/pagination';

describe('Pagination', () => {
  it('should render pagination component', () => {
    render(<Pagination urlBase="posts" finish={4} selected={2} map="Ascent" agent="Neon" />);
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-white bg-skin-secondary-light text-skin-white',
    );

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'href',
      '/posts?page=1&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'href',
      '/posts?page=2&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'href',
      '/posts?page=3&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '4' })).toHaveAttribute(
      'href',
      '/posts?page=4&map=Ascent&agent=Neon',
    );
  });

  it('should render pagination component 2', () => {
    render(<Pagination urlBase="posts" finish={10} selected={1} map="Ascent" agent="Neon" />);
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-white bg-skin-secondary-light text-skin-white',
    );

    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'href',
      '/posts?page=1&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'href',
      '/posts?page=2&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '3' })).toHaveAttribute(
      'href',
      '/posts?page=3&map=Ascent&agent=Neon',
    );
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '10' })).toHaveAttribute(
      'href',
      '/posts?page=10&map=Ascent&agent=Neon',
    );
  });

  it('should render pagination component 3', () => {
    render(<Pagination urlBase="posts" finish={100} selected={28} map="Ascent" agent="Neon" />);
    expect(screen.getByRole('link', { name: '28' })).toHaveAttribute(
      'class',
      'block p-2 bg-transparent hover:bg-skin-secondary-light hover:text-skin-white bg-skin-secondary-light text-skin-white',
    );

    expect(screen.getAllByText('...')[0]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '27' })).toHaveAttribute(
      'href',
      '/posts?page=27&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '28' })).toHaveAttribute(
      'href',
      '/posts?page=28&map=Ascent&agent=Neon',
    );
    expect(screen.getByRole('link', { name: '29' })).toHaveAttribute(
      'href',
      '/posts?page=29&map=Ascent&agent=Neon',
    );
    expect(screen.getAllByText('...')[1]).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '100' })).toHaveAttribute(
      'href',
      '/posts?page=100&map=Ascent&agent=Neon',
    );
  });
});