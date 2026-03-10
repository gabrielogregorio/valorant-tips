import { PageContainer } from '@/atoms/PageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { LoginForm } from '@Features/auth/LoginForm';

export default function LoginScreen() {
  return (
    <PageContainer>
      <TitleAndSubtitle title="Fazer Login" subtitle="Essa é uma tela exclusiva ao Ademir do Valorant tips" />

      <LoginForm />
    </PageContainer>
  );
}
