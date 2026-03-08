import { ReactElement } from 'react';
import { PostsServiceType } from '@/shared/hooks/useFetchPosts';
import { Image } from '@/libs/image';
import { PostCarousel } from './PostCarousel';
import { PostActions } from './PostActions';

type TProps = {
  post: PostsServiceType;
};

export const PostCard = ({ post }: TProps): ReactElement => {
  return (
    <article className="p-2 pl-0 pr-0 w-full h-full border-t border-gray-600 flex flex-col gap-4">
      <header className="flex flex-col gap-sm">
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

        {/* {isAuthenticated() === true ? (
          <button type="button" className="block text-skin-secondary-regular font-bold">
            <Link href={`/admin/post-edit?id=${post.id}`}>Editar</Link>
          </button>
        ) : null} */}

        <h2 className="text-base text-white w-full">{post.title}</h2>
      </header>

      {post.steps && post.steps.length > 0 && <PostCarousel steps={post.steps} />}

      <div className="flex flex-col gap-2">
        <p className="text-base text-white">{post.description}</p>

        <p className="text-skin-secondary-regular text-lg bg-transparent flex flex-wrap gap-2">
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

      <footer className="mt-auto pt-2">
        <PostActions postId={post.id} />
      </footer>
    </article>
  );
};
