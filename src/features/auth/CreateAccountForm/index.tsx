'use client';

import { CreateAccountFormInterface } from './validationSchema';
import { useCreateAccountFormController } from './useCreateAccountFormController';
import { Button } from '@/molecules/Button';
import { Text, TextVariantEnum } from '@/atoms/Text';
import { ErrorMessage } from '@/molecules/ErrorMessage';
import { SuccessMessage } from '@/molecules/Success';
import { useHandleRouter } from '@/libs/useHandleRouter';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { formatI18n } from '@/libs/i18n';
import { TextFieldFormExternal } from '@/libs/react-hook-form/TextFieldForm';

const CreateAccount = () => {
  const { control, onSubmit, isLoading, errorMessage, success } = useCreateAccountFormController();
  const { push } = useHandleRouter();

  return (
    <div className="flex w-full flex-col justify-center items-center py-8">
      <div className="w-full max-w-size-inputs">
        <form
          className="animate-fadeIn300 mt-4 w-full rounded-2xl bg-content-bg/30 p-6 backdrop-blur-sm sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}>
          <div className="flex flex-col gap-5xl">
            <fieldset className="flex flex-col gap-xl border-none">
              <legend className="mb-4 text-lg font-semibold text-content-fg">Informações Pessoais</legend>

              <TextFieldFormExternal<CreateAccountFormInterface>
                control={control}
                id="name"
                name="name"
                label={formatI18n('label.name')}
                placeholder={formatI18n('placeholder.yourName')}
                helpText={formatI18n('helpText.typeYourName')}
              />

              <TextFieldFormExternal<CreateAccountFormInterface>
                control={control}
                id="username"
                name="username"
                label={formatI18n('label.username')}
                placeholder={formatI18n('placeholder.yourUser')}
                helpText={formatI18n('helpText.typeYourUsername')}
              />
            </fieldset>

            <fieldset className="flex flex-col gap-xl border-none border-t border-border-soft/20 pt-8">
              <legend className="mb-4 text-lg font-semibold text-content-fg">Segurança do Acesso</legend>

              <TextFieldFormExternal<CreateAccountFormInterface>
                type="password"
                control={control}
                id="password"
                name="password"
                autoComplete="new-password"
                label="SENHA"
                placeholder="******"
                helpText=""
              />

              <TextFieldFormExternal<CreateAccountFormInterface>
                type="password"
                control={control}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                label="CONFIRME SUA SENHA"
                placeholder="******"
                helpText=""
              />

              <TextFieldFormExternal<CreateAccountFormInterface>
                type="password"
                control={control}
                id="code"
                name="code"
                label="CODIGO DE USO UNICO"
                placeholder="******"
                helpText="Esse é o código secreto que você deve ter recebido"
              />
            </fieldset>
          </div>

          <div className="mt-10 flex flex-col gap-xl">
            {errorMessage ? <ErrorMessage text={errorMessage} /> : undefined}

            {success ? <SuccessMessage text={success} /> : undefined}

            <Button type="submit" variant={'primary'} disabled={isLoading} className="h-12 w-full rounded-xl">
              {isLoading ? 'CRIANDO...' : 'CRIAR CONTA'}
            </Button>

            <div className="mt-2 flex items-center justify-center gap-xs">
              <Text variant={TextVariantEnum.subtext} className="text-neutral-100 opacity-90">
                Já tenho conta?
              </Text>
              <Button
                variant="text"
                className="text-xs font-bold text-secondary hover:bg-secondary/10"
                onClick={() => push(RouteScreensEnum.login)}>
                FAZER LOGIN
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
