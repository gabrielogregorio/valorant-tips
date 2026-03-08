import { TitleAndSubtitle } from '@/molecules/TitleAndSubtitle';
import { postsService } from '@/features/posts/services/postsService';
import { CACHE_REVALIDATE_TIMES } from '@/shared/constants/cache';

export const revalidate = CACHE_REVALIDATE_TIMES.TWENTY_FOUR_HOURS;

export default async function PostsMapAgents({ params }: { params: { agent: string; map: string } }) {
  const { agent, map } = await params;

  const { posts } = await postsService.getPostsByMapAndAgent(map, agent);

  return (
    <div>
      <TitleAndSubtitle title={`Tutoriais do ${agent} no mapa ${map}`} />

      {posts.length > 0 ? (
        posts.map((post) => <div key={post.id}>POST: {post.title}</div>)
      ) : (
        <div className="py-20 text-center text-content-fg/60">Nenhum tutorial encontrado para essa combinação.</div>
      )}
    </div>
  );
}
