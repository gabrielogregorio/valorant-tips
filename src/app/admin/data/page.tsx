import { TitleAndSubtitle } from '../../../Molecules/TitleAndSubTitle';
import { AgentList } from '../../../Organisms/AgentList';
import { CategoryWithTags } from '../../../Organisms/CategoryWithTags';
import { MapList } from '../../../Organisms/MapsList';

export default function DashboardScreen() {
  return (
    <>
      <TitleAndSubtitle title="Dashboard" subtitle="Esse é um dashboard" />

      <div>
        <MapList />

        <AgentList />

        <CategoryWithTags />
      </div>
    </>
  );
}
