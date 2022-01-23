import { useState } from 'react';
import api from '@/services/api';
import NavbarComponent from '@/layout/navbar';
import Input from '@/base/input';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import Button from '@/base/button';
import { navbarEnum } from '@/interfaces/navbar';

const breadcrumbs = [
  { url: '/Dashboard', text: 'administrativo' },
  { url: '/Config', text: 'Configs' },
];

export default function ConfigScreen() {
  const [keyAccess, setKeyAccess] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [codeMsg, setCodeMsg] = useState<string>('');

  async function handleSubmit() {
    try {
      const code = await api.post('/generate_code', {
        GENERATOR_CODE: keyAccess,
      });
      setCodeMsg(code.data.code);
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrorMsg('Essa não é uma chave válida!');
      } else if (error.response.status === 405) {
        setErrorMsg('Por segurança o servidor bloqueou a geração de novos convites permanentemente!');
      } else {
        setErrorMsg('Erro desconhecido no servidor!');
      }
    }
  }

  return (
    <div className="container">
      <NavbarComponent selected={navbarEnum.Config} />
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />

      <div className="sub__container">
        <div className="form">
          <h1>Gerar Convite</h1>
          <p>** !!! Somente para Devs !!! *</p>
          <p className="errorMsg">{errorMsg}</p>

          <Input name="keySecret" type="password" text="Chave Secreta" value={keyAccess} setValue={setKeyAccess} />

          <div className="groupInput">
            <div className="groupInputSelect">
              <Button className="btn-secondary" onClick={() => handleSubmit()}>
                Gerar
              </Button>
            </div>
          </div>
          <p>{codeMsg}</p>
        </div>
      </div>
      <FooterComponent color="secondary" />
    </div>
  );
}
