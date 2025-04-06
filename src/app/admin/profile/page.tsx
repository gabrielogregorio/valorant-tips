import { TitleAndSubtitle } from '../../../Molecules/TitleAndSubTitle';
import UpdateProfileData from '../../../Organisms/UpdateProfileData';
import UpdateProfilePassword from '../../../Organisms/UpdateProfilePassword';

const DashboardScreen = () => (
  <>
    <TitleAndSubtitle title="Seu Perfil" subtitle="Atualize suas informações" />

    <UpdateProfileData />

    <UpdateProfilePassword />
  </>
);

export default DashboardScreen;
