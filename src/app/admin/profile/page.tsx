import { TitleAndSubtitle } from '@/components/Molecules/TitleAndSubTitle';
import UpdateProfileData from '@/components/Organisms/UpdateProfileData';
import UpdateProfilePassword from '@/components/Organisms/UpdateProfilePassword';

const ProfileScreen = () => (
  <div className="flex flex-col">
    <TitleAndSubtitle title="Seu Perfil" subtitle="Atualize suas informações" />

    <UpdateProfileData />

    <UpdateProfilePassword />
  </div>
);

export default ProfileScreen;
