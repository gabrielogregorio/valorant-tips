'use client';

import { useSearchParams } from 'next/navigation';
import { PostsServiceType, useFetchStablePosts } from '@/shared/hooks/useFetchPosts';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { PostCard } from '@Features/posts/PostCard';
import { PageContainer } from '@/atoms/PageContainer';
import { Skeleton } from '@/molecules/Skeleton';

export default function Page() {
  const searchParams = useSearchParams();

  const agents = searchParams.get('agents')!;
  const maps = searchParams.get('maps')!;

  // TODO: analyze
  const { posts, isLoading, error } = useFetchStablePosts();

  const filteredPosts =
    posts?.filter((post) => {
      // If no agents/maps in URL, show all
      if (!agents && !maps) return true;

      const selectedAgents = agents ? agents.split(',') : [];
      const selectedMaps = maps ? maps.split(',') : [];

      const matchesAgent =
        selectedAgents.length === 0 || post.agents.some((agent) => selectedAgents.includes(agent.id));

      const matchesMap = selectedMaps.length === 0 || post.maps.some((map) => selectedMaps.includes(map.id));

      return matchesAgent && matchesMap;
    }) || [];

  if (isLoading) {
    return (
      <PageContainer>
        <TitleAndSubtitle key="" subtitle="" title="As melhores dicas de Valorant" />
        <div className="grid grid-cols-1 gap-6 w-full mt-4">
          <Skeleton className="w-full h-size-inputs rounded-xl" />
          <Skeleton className="w-full h-size-inputs rounded-xl" />
        </div>
      </PageContainer>
    );
  }

  console.log(error);
  if (error) {
    return <div>Error</div>;
  }

  if (filteredPosts.length === 0) {
    return <div>sem dados</div>;
  }

  return (
    <PageContainer>
      <TitleAndSubtitle key="" subtitle="" title="As melhores dicas de Valorant" />
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div className="flex justify-center">
          <button type="button" className="p-2 m-2 text-primary font-bold">
            #Sova
          </button>

          <button type="button" className="p-2 m-2 text-primary font-bold">
            #Bind
          </button>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {[
            'QualquerMomento',
            'Facil',
            'FlechaRastreadora',
            'Defensores',
            'A',
            'Outra',
            'Medio',
            'Atacantes',
            'BaseAtacante',
            'BaseDefensora',
          ].map((tag) => (
            <button
              type="button"
              key={tag}
              className="p-3 pb-1 pt-1 border border-secondary rounded-md transition duration-100 font-bold text-secondary ">
              #{tag}
            </button>
          ))}
        </div>

        {filteredPosts.map((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </PageContainer>
  );
}
