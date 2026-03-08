import { TitleAndSubtitle } from '@/Molecules/TitleAndSubTitle';
import Login from '@/components/Organisms/LoginForm';

export default function LoginScreen() {
  return (
    <>
      <TitleAndSubtitle title="Fazer Login" subtitle="Essa é uma tela exclusiva ao Ademir do Valorant tips" />

      <Login />
    </>
  );
}
