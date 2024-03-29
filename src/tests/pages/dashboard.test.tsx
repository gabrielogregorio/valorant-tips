import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Router from 'next/router';
import Dashboard from '@/pages/admin/dashboard';
import { MockApp } from '@/mock/App.Mock';
import { URL_GET_DASHBOARD, URL_GET_YOUR_USER } from '@/mock/ROUTES_API';
import { waitByLoading } from '@/utils/waitByLoading';
import { ReactNode } from 'react';
import { ERROR_NOT_ACCESS_HTTP_CODE } from '@/utils/statusCode';

jest.mock('next/router', () => ({
  push: jest.fn(),
  useRouter: () => ({
    asPath: '',
    pathname: '',
    query: { map: 'Ascent32' },
    route: '/',
  }),
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: ReactNode }) =>
      children,
);

let tryNumbers = 0;
const handlers = [
  rest.get(URL_GET_DASHBOARD, async (req, res, ctx) =>
    res(
      ctx.json({
        countAlAgents: 30,
        countAlMaps: 15,
        countAll: 134,
        countAllPosts: 190,
        countAllSuggestions: 10,
        countAllUsers: 3,
        countIps: 318,
      }),
    ),
  ),

  rest.get(URL_GET_YOUR_USER, async (req, res, ctx) => {
    if (tryNumbers === 1) {
      return res(ctx.status(ERROR_NOT_ACCESS_HTTP_CODE), ctx.json({ msg: 'jwt expired' }));
    }
    tryNumbers += 1;

    return res(
      ctx.json({
        id: '12345678',
        image: 'image.png',
        username: 'codigo limpo?',
      }),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Dashboard />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render dashboard', async () => {
    render(
      <MockApp>
        <Dashboard />
      </MockApp>,
    );

    await waitByLoading();

    expect(screen.getByText('Bem vindo(a) codigo limpo?')).toBeInTheDocument();
    expect(screen.getByText('Consultas: 134')).toBeInTheDocument();
    expect(screen.getByText('Usuários: 318')).toBeInTheDocument();
    expect(screen.getByText('agentes: 30')).toBeInTheDocument();
    expect(screen.getByText('mapas: 15')).toBeInTheDocument();
    expect(screen.getByText('posts: 190')).toBeInTheDocument();
    expect(screen.getByText('sugestões: 10')).toBeInTheDocument();
    expect(screen.getByText('administradores: 3')).toBeInTheDocument();
  });

  it('should force error jwt', async () => {
    render(
      <MockApp>
        <Dashboard />
      </MockApp>,
    );

    await waitByLoading();

    expect(Router.push).toHaveBeenCalledWith('/login');
    Router.push('');
  });
});
