import { AdminPageContainer } from '@/atoms/AdminPageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { UpdateProfileData } from '@Features/profile/UpdateProfileData';
import UpdateProfilePassword from '@Features/profile/UpdateProfilePassword';

const ProfileScreen = () => (
  <AdminPageContainer innerClassName=" max-w-[600px]">
    <TitleAndSubtitle title="Seu Perfil" subtitle="Atualize suas informações" />

    <UpdateProfileData />

    <UpdateProfilePassword />
  </AdminPageContainer>
);

export default ProfileScreen;
