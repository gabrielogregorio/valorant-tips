'use client';

import { useSearchParams } from 'next/navigation';
import { PostsServiceType, useFetchStablePosts } from '@/shared/hooks/useFetchPosts';
import { PostCard } from '@/components/Organisms/PostCard';
import { TitleAndSubtitle } from '@/components/Molecules/TitleAndSubTitle';

export default function Page() {
  const searchParams = useSearchParams();

  const agents = searchParams.get('agents');
  const maps = searchParams.get('maps');

  const posts = useFetchStablePosts({ agent: agents?.toString(), map: maps?.toString() }); // resolver agents e maps vs agent e map
  if (posts.isLoading) {
    return <div>is loading</div>;
  }

  console.log(posts.error);
  if (posts.error) {
    return <div>Error</div>;
  }

  if (!posts.posts?.length) {
    return <div>sem dados</div>;
  }

  return (
    <div>
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

        {posts.posts.map((post: PostsServiceType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
