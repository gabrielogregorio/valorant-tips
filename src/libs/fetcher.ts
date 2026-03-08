import * as Sentry from '@sentry/nextjs';
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

export const fetcherServer = async <T>(path: string, options?: RequestInit): Promise<T> => {
  return await Sentry.withScope(async (scope) => {
    scope.setTag('component', 'fetcherServer');
    scope.setTag('url', path);
    scope.setTag('method', options?.method ?? 'GET');

    try {
      const response = await fetch(`${API_URL}${path}`, options);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        Sentry.captureException(new HttpError(response.status, `API Failure: ${response.statusText}`), {
          extra: {
            path,
            status: response.status,
            errorBody,
            options,
          },
        });

        throw new HttpError(response.status, `Erro ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      if (!(error instanceof HttpError)) {
        Sentry.captureException(error, {
          extra: { path, options },
        });
      }
      throw error;
    }
  });
};
