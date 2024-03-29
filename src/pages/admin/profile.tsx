import { ReactElement, useEffect } from 'react';
import { Navbar } from '@/layout/navbar';
import { Input } from '@/base/input';
import { Loader } from '@/base/loader';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { Title } from '@/base/title';
import { navbarEnum } from '@/enums/navbar';
import Router from 'next/router';
import { Layout } from '@/layout/layout';
import { SubContainer } from '@/base/subContainer';
import { Form } from '@/base/Form';
import { modelNavbarAdmin } from '@/schemas/navbar';
import { logout } from '@/services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/base/button';
import { schemaUpdateProfile } from '@/handlers/forms';
import { useProfile } from '@/hooks/useProfile';
import { Footer } from '@/layout/footer';

const breadcrumbs = [
  { text: 'admin', url: navbarEnum.Dashboard },
  { text: 'perfil', url: navbarEnum.Dashboard },
];

export type registrationFormFields = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

const Profile = (): ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<registrationFormFields>({
    defaultValues: {},
    resolver: yupResolver(schemaUpdateProfile),
  });

  const { isLoading, infoUser } = useProfile();

  useEffect(() => {
    reset({
      username: infoUser?.username,
    });
  }, [infoUser?.username, reset]);

  const handleLogout = (): void => {
    logout();
    Router.push('/login');
  };

  const onSubmit = (): void => {};

  return (
    <Layout>
      <Navbar selected={navbarEnum.Profile} modelNavbar={modelNavbarAdmin} />
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <SubContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>Seu perfil</Title>
          <Loader active={isLoading} />

          {isLoading === false ? (
            <>
              <Input
                placeholder=""
                name="username"
                type="text"
                label="Trocar nome de usuário"
                register={register('username')}
                errors={errors}
              />
              <Input
                placeholder=""
                name="password"
                type="password"
                label="Digite uma nova senha"
                register={register('password')}
                errors={errors}
              />
              <Input
                placeholder=""
                name="passwordConfirmation"
                type="password"
                label="Confirme a nova senha"
                register={register('passwordConfirmation')}
                errors={errors}
              />

              <Button className="text-skin-primary-light border-none mt-2" onClick={(): void => handleLogout()}>
                logoff
              </Button>

              <Button
                className="bg-skin-primary-light text-skin-white border-skin-primary-light mt-2 p-1"
                type="submit">
                Atualizar dados
              </Button>
            </>
          ) : null}
        </Form>
      </SubContainer>
      <Footer />
    </Layout>
  );
};
export default Profile;
