import Link from 'next/link';
import { fetcherServer } from '@/libs/fetcher';
import { AgentType } from '@/shared/hooks/useFetchAgents';
import { MapsType } from '@/shared/hooks/useFetchMaps';
import { Image } from '@/libs/image';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';

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
    <div>
      <TitleAndSubtitle key="" subtitle="" title="Agora escolhe um agente " />

      <div className="grid grid-cols-4 gap-4 mt-4">
        {agentsByMap.map((agents) => (
          <Link
            type="button"
            key={agents.id}
            href={`/posts?agents=${agents.id}&maps=${map}`}
            className={'rounded-lg overflow-hidden hover:scale-105 transition-transform duration-150'}>
            <Image src={agents.imageUrl} alt={agents.name} className="object-cover" width={500} height={500} />
            <div className="text-white text-xs text-center">{agents.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
