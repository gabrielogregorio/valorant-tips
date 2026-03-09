import Link from 'next/link';
import { fetcherServer } from '@/libs/fetcher';
import { AgentType } from '@/shared/hooks/useFetchAgents';
import { MapsType } from '@/shared/hooks/useFetchMaps';
import { Image } from '@/libs/image';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { PageContainer } from '@/atoms/PageContainer';

export const revalidate = 20;

export async function generateStaticParams() {
  const maps = await fetcherServer<MapsType[]>('/maps/?filter=with-posts');

  return maps.map((map: AgentType) => {
    return {
      map: map.id,
    };
  });
}

export default async function ChoiceAgentAfterMap({ params }: { params: Promise<{ map: string }> }) {
  const { map } = await params;
  const agentsByMap = (await fetcherServer(`/agents/${map}/posts`)) as AgentType[];

  return (
    <PageContainer>
      <TitleAndSubtitle key="" subtitle="" title="Agora escolhe um agente " />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {agentsByMap.map((agents) => (
          <Link
            type="button"
            key={agents.id}
            href={`/posts?agents=${agents.id}&maps=${map}`}
            className={'hover:scale-105 transition-transform duration-150'}>
            <Image
              src={agents.imageUrl}
              alt={agents.name}
              draggable={false}
              aria-hidden="true"
              className="w-full object-cover rounded-lg overflow-hidden aspect-198/330 select-none"
              width={198}
              height={330}
            />
            <span className="text-white text-base p-1 text-center select-none block">{agents.name}</span>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
