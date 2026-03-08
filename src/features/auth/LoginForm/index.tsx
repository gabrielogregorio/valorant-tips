'use client';

import { TextFieldForm } from '@/molecules/TextFieldForm';
import { Button } from '@/molecules/Button';
import { Text, TextVariantEnum } from '@/atoms/Text';
import { ErrorMessage } from '@/molecules/ErrorMessage';
import { SuccessMessage } from '@/molecules/Success';
import { useLoginAccountFormController } from './useLoginAccountFormController';
import { LoginFormInterface } from './validationSchema';
import { useHandleRouter } from '@/libs/useHandleRouter';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';

export const LoginForm = () => {
  const { control, onSubmit, isLoading, errorMessage, success } = useLoginAccountFormController();
  const { push } = useHandleRouter();

  return (
    <form
      className="max-w-size-inputs animate-fadeIn300 mx-auto w-full"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}>
      <div className="flex flex-col gap-4xl">
        <TextFieldForm<LoginFormInterface>
          control={control}
          id="username"
          name="username"
          label="USUÁRIO"
          placeholder="Seu usuário"
          helpText="Digite o usuário para fazer login"
        />

        <TextFieldForm<LoginFormInterface>
          type="password"
          control={control}
          id="password"
          name="password"
          autoComplete="current-password"
          label="SENHA"
          placeholder="******"
        />
      </div>

      <div className="mt-7xl flex flex-col gap-2xl">
        {errorMessage ? <ErrorMessage text={errorMessage} /> : undefined}

        {success ? <SuccessMessage text={success} /> : undefined}

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'LOGANDO...' : 'FAZER LOGIN'}
        </Button>

        <div className="mt-xl flex items-center justify-center gap-xs">
          <Text variant={TextVariantEnum.subtext} className="text-content-fg-subcontent">
            Não tem conta?
          </Text>
          <Button variant="text" className="text-xs font-bold" onClick={() => push(RouteScreensEnum.register)}>
            CRIAR CONTA
          </Button>
        </div>
      </div>
    </form>
  );
};
