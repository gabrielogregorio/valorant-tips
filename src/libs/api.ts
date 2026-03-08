import * as Sentry from '@sentry/nextjs';
import { authCookieName } from '@/shared/constants/cookies';
import { NEXT_PUBLIC_API_HOST } from '@/shared/envs';
import { ApiError } from '@/shared/services/ApiError';

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown,
  ) {
    super(`HTTP Error ${status}: ${statusText}`);
    this.name = 'HttpError';
  }
}

type MiddlewareRequest = (config: RequestInit) => RequestInit | Promise<RequestInit>;
type MiddlewareResponse = (response: Response) => Response | Promise<Response>;

class HttpClientFetch {
  private baseURL: string;
  private requestInterceptors: MiddlewareRequest[] = [];
  private responseInterceptors: MiddlewareResponse[] = [];

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    // Default response interceptor for ApiError transformation
    this.middlewareResponse(async (response) => {
      if (!response.ok) {
        const errorData = await response
          .clone()
          .json()
          .catch(() => ({}));
        const message = errorData?.message;
        const error = errorData?.error;

        if (message && typeof message === 'string' && error && typeof error === 'string') {
          throw new ApiError(message, error);
        }
      }
      return response;
    });
  }

  public middlewareRequest(interceptor: MiddlewareRequest) {
    this.requestInterceptors.push(interceptor);
  }

  public middlewareResponse(interceptor: MiddlewareResponse) {
    this.responseInterceptors.push(interceptor);
  }

  private async getAuthToken(): Promise<string | undefined> {
    if (typeof window === 'undefined') {
      // Server Component
      try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        return (await cookieStore).get(authCookieName)?.value;
      } catch {
        return undefined;
      }
    } else {
      // Client Component
      const { ClientCookies } = await import('./clientCookies');
      return ClientCookies.getCookie(authCookieName);
    }
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<{ data: T }> {
    return await Sentry.withScope(async (scope) => {
      const isFormData = options.body instanceof FormData;
      const config: RequestInit = {
        ...options,
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          ...options.headers,
        },
      };

      // Inject Token
      const token = await this.getAuthToken();
      if (token) {
        config.headers = {
          ...config.headers,
          authorization: token,
        };
      }

      let finalConfig = config;
      // Run Request Interceptors
      for (const interceptor of this.requestInterceptors) {
        finalConfig = await interceptor(finalConfig);
      }

      const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;

      scope.setTag('component', 'HttpClientFetch');
      scope.setTag('url', url);
      scope.setTag('method', finalConfig.method || 'GET');

      try {
        let response = await fetch(url, finalConfig);

        // Run Response Interceptors
        for (const interceptor of this.responseInterceptors) {
          response = await interceptor(response);
        }

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new HttpError(response.status, response.statusText, errorBody);
        }

        const data = await response.json();
        return { data };
      } catch (error) {
        if (error instanceof HttpError) {
          Sentry.captureException(error, {
            extra: { path, status: error.status, body: error.body },
          });
        } else {
          Sentry.captureException(error, { extra: { path } });
        }
        throw error;
      }
    });
  }

  public async get<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  public async post<T>(path: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  public async put<T>(path: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  public async patch<T>(path: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  }

  public async delete<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { ...options, method: 'DELETE' });
  }
}

export const api = new HttpClientFetch(NEXT_PUBLIC_API_HOST);
