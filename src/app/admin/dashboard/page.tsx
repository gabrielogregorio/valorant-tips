import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { Dashboard } from '@Features/dashboard/Dashboard';

export default function DashboardScreen() {
  return (
    <div className="flex flex-col">
      <TitleAndSubtitle title="Dashboard Geral" subtitle="Esses são os números do Valorant Tips" />

      <div className="mt-6">
        <Dashboard />
      </div>
    </div>
  );
}
