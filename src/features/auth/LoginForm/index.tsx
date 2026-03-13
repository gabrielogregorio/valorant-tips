'use client';

import { Button } from '@/molecules/Button';
import { Text, TextVariantEnum } from '@/atoms/Text';
import { ErrorMessage } from '@/molecules/ErrorMessage';
import { SuccessMessage } from '@/molecules/Success';
import { useLoginAccountFormController } from './useLoginAccountFormController';
import { LoginFormInterface } from './validationSchema';
import { useHandleRouter } from '@/libs/useHandleRouter';
import { RouteScreensEnum } from '@/shared/@types/routeScreenEnum';
import { TextFieldFormExternal } from '@/libs/react-hook-form/TextFieldForm';

export const LoginForm = () => {
  const { control, onSubmit, isLoading, errorMessage, success } = useLoginAccountFormController();
  const { push } = useHandleRouter();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-size-inputs">
        <form
          className="animate-fadeIn300 w-full rounded-2xl bg-content-bg/30 backdrop-blur-sm sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}>
          <div className="flex flex-col gap-xl">
            <TextFieldFormExternal<LoginFormInterface>
              control={control}
              id="username"
              name="username"
              label="USUÁRIO"
              placeholder="Seu usuário"
              helpText="Digite o usuário para fazer login"
            />

            <TextFieldFormExternal<LoginFormInterface>
              type="password"
              control={control}
              id="password"
              name="password"
              autoComplete="current-password"
              label="SENHA"
              placeholder="******"
            />
          </div>

          <div className="mt-8 flex flex-col gap-xl">
            {errorMessage ? <ErrorMessage text={errorMessage} /> : undefined}

            {success ? <SuccessMessage text={success} /> : undefined}

            <Button type="submit" variant="primary" disabled={isLoading} className="w-full h-12 rounded-xl">
              {isLoading ? 'LOGANDO...' : 'FAZER LOGIN'}
            </Button>

            <div className="mt-2 flex items-center justify-center gap-xs">
              <Text variant={TextVariantEnum.subtext} className="text-neutral-100 opacity-90">
                Não tem conta?
              </Text>
              <Button
                variant="text"
                className="text-xs font-bold text-primary hover:bg-primary/10"
                onClick={() => push(RouteScreensEnum.register)}>
                CRIAR CONTA
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
