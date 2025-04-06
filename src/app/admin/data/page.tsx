import { TitleAndSubtitle } from '../../../Molecules/TitleAndSubTitle';
import { AgentList } from '../../../Organisms/AgentList';
import { CategoryWithTags } from '../../../Organisms/CategoryWithTags';
import { MapList } from '../../../Organisms/MapsList';

const DashboardScreen = () => (
  <>
    <TitleAndSubtitle title="Dashboard" subtitle="Esse é um dashboard" />

    <div>
      <MapList />

      <AgentList />

      <CategoryWithTags />
    </div>
  </>
);

export default DashboardScreen;
