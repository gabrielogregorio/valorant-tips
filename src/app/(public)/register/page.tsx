import { PageContainer } from '@/atoms/PageContainer';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import CreateAccount from '@Features/auth/CreateAccountForm';

export default function Home() {
  return (
    <PageContainer>
      <TitleAndSubtitle
        title="Fazer Cadastro"
        subtitle="Essa é uma tela exclusiva a quem recebeu um código para virar adiminstrador do valorant tips."
      />

      <CreateAccount />
    </PageContainer>
  );
}
