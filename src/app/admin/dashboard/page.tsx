import { AdminPageContainer } from '@/atoms/AdminPageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { Dashboard } from '@Features/dashboard/Dashboard';

export default function DashboardScreen() {
  return (
    <AdminPageContainer innerClassName=" max-w-[800px]">

      <TitleAndSubtitle title="Dashboard Geral" subtitle="Esses são os números do Valorant Tips" />

      <div className="mt-6">
        <Dashboard />
      </div>
    </AdminPageContainer>
  );
}
