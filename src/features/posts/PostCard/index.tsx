import { ReactElement } from 'react';
import { PostsServiceType } from '@/shared/hooks/useFetchPosts';
import { Image } from '@/libs/image';
import { PostCarousel } from './PostCarousel';
import { PostActions } from './PostActions';
import { ClientCookies } from '@/libs/clientCookies';
import { authCookieName } from '@/shared/constants/cookies';
import Link from 'next/link';

type TProps = {
  post: PostsServiceType;
};

export const PostCard = ({ post }: TProps): ReactElement => {
  const token = ClientCookies.getCookie(authCookieName);

  return (
    <article className="py-4 w-full h-full border-t border-gray-600 flex flex-col gap-4">
      <header className="flex flex-col gap-sm shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {post.authors.map((author) => (
              <div key={author.id} className="flex items-center gap-lg px-lg py-md">
                <Image
                  className="rounded-full object-cover w-10 h-10"
                  width={40}
                  height={40}
                  src={author.imageUrl || '/default/profile.webp'}
                  alt={`Foto de perfil de ${author.username}`}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-content-fg truncate">{author.username}</span>
                </div>
              </div>
            ))}
          </div>

          {token && (
            <Link
              href={`/admin/updatePost/${post.id}`}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-400 border border-gray-600 rounded-lg hover:text-primary hover:border-primary hover:bg-primary/10 transition-all"
              aria-label="Editar post">
              Editar
            </Link>
          )}
        </div>

        <h2 className="text-xl font-bold text-white w-full">{post.title}</h2>
      </header>

      {post.steps && post.steps.length > 0 && (
        <div className="shrink-0 w-full">
          <PostCarousel steps={post.steps} />
        </div>
      )}

      <div className="flex flex-col gap-2 grow">
        <p className="text-base text-white wrap-break-word whitespace-pre-wrap">{post.description}</p>

        <p className="text-skin-secondary-regular text-lg bg-transparent flex flex-wrap gap-2 mt-2">
          {post.maps.map((map) => (
            <span className="text-base font-bold text-primary" key={map.id}>
              #{map.name}
            </span>
          ))}

          {post.agents.map((agent) => (
            <span className="text-base font-bold text-primary" key={agent.id}>
              #{agent.name}
            </span>
          ))}
        </p>
      </div>

      <footer className="mt-auto pt-2 shrink-0">
        <PostActions postId={post.id} />
      </footer>
    </article>
  );
};
