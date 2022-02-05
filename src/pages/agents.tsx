import { useRouter } from 'next/router';
import { agents } from '@/data/data-valorant';
import LoaderComponent from '@/base/loader';
import FooterComponent from '@/layout/footer';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import ErrorMsg from '@/base/errorMsg';
import useAgents from '@/hooks/useAgents';
import Title from '@/base/title';
import LINKS from '@/data/links';
import LayoutComponent from '../components/layout/layout';
import navbarEnum from '../interfaces/navbar';
import { modelNavbarPublic } from '../core/schemas/navbar';
import NavbarComponent from '../components/layout/navbar';
import ImageCard from '../components/widgets/imageCard';
import SubContainer from '../components/base/subContainer';

const breadcrumbs = [LINKS.inicio, LINKS.Maps, LINKS.Agents];

export default function AgentScreen() {
  const item = useRouter();

  const { mapSelected, agentsApi, isLoading, error } = useAgents(item);

  function renderAgent() {
    if (agentsApi.length === 0) {
      return null;
    }
    return agents().map((agent) =>
      agentsApi.includes(agent.name) ? (
        <ImageCard
          href={`/posts?map=${mapSelected.map}&agent=${agent.name}`}
          key={agent.id}
          srcImage={agent.img}
          titleImage={agent.name}
        />
      ) : null,
    );
  }

  return (
    <LayoutComponent>
      <NavbarComponent selected={navbarEnum.Mistic} modelNavbar={modelNavbarPublic} />
      <BreadcrumbComponent breadcrumbs={breadcrumbs} admin={false} />

      <SubContainer>
        <Title>Escolha um Agente</Title>
        <LoaderComponent active={isLoading} />
        {isLoading ? <p>Buscando Agentes...</p> : ''}
        <ErrorMsg msg={error} />
        <div className="grid grid-cols-3 gap-6 p-10">{renderAgent()}</div>
      </SubContainer>
      <FooterComponent />
    </LayoutComponent>
  );
}
