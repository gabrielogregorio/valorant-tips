import { authCookieName } from '@/shared/constants/cookies';
import { ClientCookies } from './clientCookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3333';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const fetcher = async (path: string) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      authorization: `${ClientCookies.getCookie(authCookieName)}`,
    },
  });

  if (!response.ok) {
    throw new HttpError(response.status, `Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const fetcherServer = async <T>(path: string): Promise<T> => {
  // alterar
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new HttpError(response.status, `Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
