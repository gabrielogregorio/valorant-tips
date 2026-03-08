import Link from 'next/link';
import { fetcherServer } from '@/libs/fetcher';
import { AgentType } from '@/shared/hooks/useFetchAgents';
import { MapsType } from '@/shared/hooks/useFetchMaps';
import { Image } from '@/libs/image';

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
    <div className="grid grid-cols-4 gap-4">
      {agentsByMap.map((agents) => (
        <Link
          type="button"
          key={agents.id}
          href={`/posts?agents=${agents.id}&maps=${map}`}
          className={'relative rounded-lg overflow-hidden border-2 transition-all'}>
          <Image src={agents.imageUrl} alt={agents.name} className="object-cover" width={500} height={500} />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
            {agents.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
