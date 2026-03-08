import { api } from './api';

export { HttpError } from './api';

export const fetcher = async (path: string) => {
  const { data } = await api.get(path);
  return data;
};

export const fetcherServer = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const { data } = await api.get<T>(path, options);
  return data;
};
