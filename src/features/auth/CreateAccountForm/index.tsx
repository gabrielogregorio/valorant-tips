'use client';

import { CreateAccountFormInterface } from './validationSchema';
import { useCreateAccountFormController } from './useCreateAccountFormController';
import { TextFieldForm } from '@/molecules/TextFieldForm';
import { Button } from '@/molecules/Button';
import { Text } from '@/atoms/Text';
import { ErrorMessage } from '@/molecules/ErrorMessage';
import { SuccessMessage } from '@/molecules/Success';
import { useHandleRouter } from '@/libs/useHandleRouter';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { formatI18n } from '@/libs/i18n';

const CreateAccount = () => {
  const { control, onSubmit, isLoading, errorMessage, success } = useCreateAccountFormController();
  const { push } = useHandleRouter();

  return (
    <form
      className="animate-fadeIn300 max-w-size-inputs mx-auto w-full"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}>
      <div className="flex flex-col gap-xl">
        <TextFieldForm<CreateAccountFormInterface>
          control={control}
          id="name"
          name="name"
          label={formatI18n('label.name')}
          placeholder={formatI18n('placeholder.yourName')}
          helpText={formatI18n('helpText.typeYourName')}
        />

        <TextFieldForm<CreateAccountFormInterface>
          control={control}
          id="username"
          name="username"
          label={formatI18n('label.username')}
          placeholder={formatI18n('placeholder.yourUser')}
          helpText={formatI18n('helpText.typeYourUsername')}
        />

        <TextFieldForm<CreateAccountFormInterface>
          type="password"
          control={control}
          id="password"
          name="password"
          autoComplete="password"
          label="SENHA"
          placeholder="******"
          helpText=""
        />

        <TextFieldForm<CreateAccountFormInterface>
          type="password"
          control={control}
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="password"
          label="CONFIRME SUA SENHA"
          placeholder="******"
          helpText=""
        />

        <TextFieldForm<CreateAccountFormInterface>
          type="password"
          control={control}
          id="code"
          name="code"
          label="CODIGO DE USO UNICO"
          placeholder="******"
          helpText="Esse é o código secreto que você deve ter recebido"
        />
      </div>

      <div className="flex flex-col gap-xl">
        <Text className="text-center text-content-fg">Já tenho conta?</Text>

        <Button onClick={() => push(RouteScreensEnum.login)} variant={'secondary'}>
          FAZER LOGIN
        </Button>

        {errorMessage ? <ErrorMessage text={errorMessage} /> : undefined}

        {success ? <SuccessMessage text={success} /> : undefined}

        <Button type="submit" variant={'primary'} disabled={isLoading}>
          {isLoading ? 'CRIANDO...' : 'CRIAR CONTA'}
        </Button>
      </div>
    </form>
  );
};

export default CreateAccount;
