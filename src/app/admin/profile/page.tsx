import { TitleAndSubtitle } from '@/molecules/TitleAndSubtitle';
import UpdateProfileData from '@Features/profile/UpdateProfileData';
import UpdateProfilePassword from '@Features/profile/UpdateProfilePassword';

const ProfileScreen = () => (
  <div className="flex flex-col">
    <TitleAndSubtitle title="Seu Perfil" subtitle="Atualize suas informações" />

    <UpdateProfileData />

    <UpdateProfilePassword />
  </div>
);

export default ProfileScreen;
