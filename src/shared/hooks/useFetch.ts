import { useState } from 'react';

export const useFetch = <T>() => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetcher = (promise: () => Promise<{ data: T }>) => {
    setIsLoading(true);
    setErrorMessage('');
    setData(null);

    promise()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErrorMessage(err?.message || 'Any error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    fetcher,
    data,
    isLoading,
    errorMessage,
  };
};
