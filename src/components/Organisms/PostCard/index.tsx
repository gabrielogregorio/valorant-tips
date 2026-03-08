'use client';

import { ReactElement, useState } from 'react';
import { PostsServiceType } from '../../../shared/hooks/useFetchPosts';
import { Image } from '../../../libs/image';
import { ChevronLeft, ChevronRight, Heart, Lightbulb } from 'lucide-react';
import { useTestedPost } from '../../../shared/hooks/useTestedPost';
import { useSavedPost } from '../../../shared/hooks/useSavedPost';
import { Button } from '../../Molecules/Button';

type TProps = {
  post: PostsServiceType;
};

const NORMALIZE_COUNTER_STARTING_IN_ONE = 1;

export const PostCard = ({ post }: TProps): ReactElement => {
  const [indexStep, setIndexStep] = useState(0);
  const totalImages = post.steps.length;

  const nextStep = (): void => {
    setIndexStep((prev) => (prev + 1 < totalImages ? prev + 1 : 0));
  };

  const prevStep = (): void => {
    setIndexStep((prev) => (prev - 1 >= 0 ? prev - 1 : totalImages - 1));
  };

  const testedPost = useTestedPost();
  const savedPost = useSavedPost();

  const savedPostsIsChecked = savedPost.savedIds.includes(post.id);
  const tesetdPostsIsChecked = testedPost.testedIds.includes(post.id);

  return (
    <div className="p-2 pl-0 pr-0 w-full h-full border-t border-gray-200 dark:border-gray-600">
      <div>
        <div className="flex flex-col gap-sm">
          {post.authors.map((author) => (
            <div key={author.id} className="flex items-center gap-lg px-lg py-md rounded-sm">
              <Image
                className="rounded-full object-cover"
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
      </div>

      <h2 className="text-base dark:text-skin-white text-skin-gray-800 w-full mb-2.5">{post.title}</h2>

      <div className="w-full">
        <div className="relative w-full">
          <div className="relative h-125 w-full">
            <div className="w-full h-full overflow-x-auto flex">
              <div className="h-full min-w-full relative">
                <Image
                  key={post.steps[indexStep].imageUrl}
                  ariaLabel=""
                  className="object-cover rounded-md rounded-b-none"
                  placeholder="blur"
                  priority
                  width={900}
                  height={500}
                  blurDataURL="/images/assets/loader.webp"
                  data-src={post.steps[indexStep].imageUrl}
                  src={post.steps[indexStep].imageUrl}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              ariaLabel="Item anterior"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white border-none hover:bg-black/60 active:bg-black/80 transition-all duration-200 select-none touch-none"
              onClick={(): void => prevStep()}>
              <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </Button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              ariaLabel="Proximo item"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white border-none hover:bg-black/60 active:bg-black/80 transition-all duration-200 select-none touch-none"
              onClick={(): void => nextStep()}>
              <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full rounded-b-md overflow-hidden">
        <div className="w-full h-1 overflow-hidden" style={{ backgroundColor: 'var(--color-neutral-750)' }}>
          <div
            className="h-full transition-all duration-300 ease-out min-h-2 bg-primary"
            style={{
              width: `${(indexStep / (totalImages - 1)) * 100}%`,
            }}
            role="progressbar"
            aria-valuenow={indexStep + 1}
            aria-valuemin={1}
            aria-valuemax={totalImages}
            aria-label={`Progresso: ${indexStep + 1} de ${totalImages}`}
          />
        </div>

        <div className="p-3 bg-black backdrop-blur-sm rounded-b-md">
          <p className="text-white text-base leading-relaxed" aria-live="polite" role="status">
            <span className="font-semibold">
              {indexStep + NORMALIZE_COUNTER_STARTING_IN_ONE} de {post.steps?.length}
            </span>
            <span className="block mt-1">{post.steps[indexStep].description}</span>
          </p>
        </div>
      </div>

      <div>
        <p className="text-base dark:text-skin-white text-skin-gray-800">{post.description}</p>

        <p className="text-skin-secondary-regular text-lg bg-transparent">
          {post.maps.map((map) => {
            return (
              <span className="text-base font-bold" key={map.id}>
                {' '}
                #{map.name}
              </span>
            );
          })}

          {post.agents.map((agent) => {
            return (
              <span className="text-base font-bold" key={agent.id}>
                {' '}
                #{agent.name}
              </span>
            );
          })}
        </p>
      </div>

      <div className="flex items-center gap-xs w-full">
        <button
          type="button"
          aria-label="Salvar"
          onClick={() => savedPost.toggle(post.id)}
          aria-pressed={savedPostsIsChecked}
          className={`
    flex flex-1 justify-center items-center cursor-pointer gap-xs px-lg py-md
    rounded-sm border transition-colors
    ${
      savedPostsIsChecked
        ? 'border-primary text-primary bg-neutral-100'
        : 'border-border-soft bg-content-bg text-content-fg-subcontent hover:text-primary hover:border-primary-soft hover:bg-neutral-100'
    }
  `}>
          <Heart size={18} className={savedPostsIsChecked ? 'fill-primary stroke-primary' : ''} />
          <span className="hidden sm:block text-sm font-semibold">{savedPostsIsChecked ? 'Salvo' : 'Salvar'}</span>
        </button>

        <button
          type="button"
          aria-label="Testar"
          onClick={() => testedPost.toggle(post.id)}
          aria-pressed={tesetdPostsIsChecked}
          className={`
    flex flex-1 justify-center items-center cursor-pointer gap-xs px-lg py-md
    rounded-sm border transition-colors
    ${
      tesetdPostsIsChecked
        ? 'border-secondary text-secondary bg-neutral-100'
        : 'border-border-soft bg-content-bg text-content-fg-subcontent hover:text-secondary hover:border-secondary-soft hover:bg-neutral-100'
    }
  `}>
          <Heart size={18} className={tesetdPostsIsChecked ? 'fill-secondary stroke-secondary' : ''} />
          <span className="hidden sm:block text-sm font-semibold">{tesetdPostsIsChecked ? 'Testado' : 'Testar'}</span>
        </button>

        <button
          type="button"
          aria-label="Sugerir"
          className="flex flex-1 justify-center items-center cursor-pointer gap-xs px-lg py-md rounded-sm border border-border-soft bg-content-bg text-content-fg-subcontent hover:text-accent-radiant hover:border-accent-radiant hover:bg-neutral-100 transition-colors">
          <Lightbulb size={18} />
          <span className="hidden sm:block text-sm font-semibold">Sugerir</span>
        </button>
      </div>
    </div>
  );
};
