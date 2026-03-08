import { TitleAndSubtitle } from '@/components/Molecules/TitleAndSubTitle';
import CreateAccount from '@/Organisms/CreateAccountForm';

export default function Home() {
  return (
    <>
      <TitleAndSubtitle
        title="Fazer Cadastro"
        subtitle="Essa é uma tela exclusiva a quem recebeu um código para virar adiminstrador do valorant tips."
      />

      <CreateAccount />
    </>
  );
}
