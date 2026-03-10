'use client';

import { CardDash } from '@/molecules/CardDash';
import { formatI18n } from '@/libs/i18n';
import { formatNumbers } from '@/shared/utils/formatNumbers';
import { NotFound } from '@/molecules/NotFound';
import { Skeleton } from '@/molecules/Skeleton';
import { ErrorMessage } from '@/molecules/ErrorMessage';
import { Button } from '@/molecules/Button';
import { useFetchDashboards } from '@/shared/hooks/useFetchDashboards';

const styleVarianteStyles = [
  'bg-primary',
  'bg-secondary',
  'bg-accent-radiant',
  'bg-accent-rose',
  'bg-accent-purple',
  'bg-feedback-error-soft',
  'bg-accent-pacific-blue',
];

export const Dashboard = () => {
  const { dashboards, error, isLoading, reload } = useFetchDashboards();

  if (isLoading) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3xl">
        <Skeleton className="w-[160] h-[126]" />
        <Skeleton className="w-[160] h-[126]" />
        <Skeleton className="w-[160] h-[126]" />
        <Skeleton className="w-[160] h-[126]" />
        <Skeleton className="w-[160] h-[126]" />
        <Skeleton className="w-[160] h-[126]" />
        <Skeleton className="w-[160] h-[126]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex gap-3xl flex-col justify-center items-center">
        <ErrorMessage text={error?.message || ''} />
        <Button onClick={() => reload()} className="w-full">
          {formatI18n('button.tryAgain')}
        </Button>
      </div>
    );
  }

  if (!dashboards || dashboards.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-wrap gap-3xl justify-center">
      {dashboards.map((item, index) => (
        <CardDash
          className={styleVarianteStyles[index] || styleVarianteStyles[0]}
          title={formatI18n(`label.dashboard.${item.key}` as Parameters<typeof formatI18n>[0])}
          key={item.key}
          value={formatNumbers(item.value)}
        />
      ))}
    </div>
  );
};
