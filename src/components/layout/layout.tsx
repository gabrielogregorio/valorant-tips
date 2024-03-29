import { ReactElement, ReactNode, useEffect } from 'react';
import { useTheme } from '@/contexts/theme';
import { getTheme } from '@/services/theme';

type layoutType = {
  children: ReactNode;
};

export const Layout = ({ children }: layoutType): ReactElement => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(getTheme());
  }, [setTheme]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="flex  items-center min-h-screen flex-col p-0 w-full bg-skin-gray-300 dark:bg-skin-gray-700  ">
        {children}
      </div>
    </div>
  );
};
