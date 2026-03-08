'use client';

import { ReactElement } from 'react';
import { Heart, Lightbulb } from 'lucide-react';
import { useTestedPost } from '@/shared/hooks/useTestedPost';
import { useSavedPost } from '@/shared/hooks/useSavedPost';
import { Button } from '@/components/Molecules/Button';

type TProps = {
  postId: string;
};

export const PostActions = ({ postId }: TProps): ReactElement => {
  const testedPost = useTestedPost();
  const savedPost = useSavedPost();

  const savedPostsIsChecked = savedPost.savedIds.includes(postId);
  const testedPostsIsChecked = testedPost.testedIds.includes(postId);

  return (
    <div className="flex items-center gap-xs w-full" role="group" aria-label="Ações do post">
      <Button
        variant="text"
        ariaLabel={savedPostsIsChecked ? 'Remover dos salvos' : 'Salvar post'}
        onClick={() => savedPost.toggle(postId)}
        aria-pressed={savedPostsIsChecked}
        leftIcon={
          <Heart size={18} className={savedPostsIsChecked ? 'fill-primary stroke-primary' : ''} aria-hidden="true" />
        }
        className={`
          flex-1 border
          ${
            savedPostsIsChecked
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border-soft bg-content-bg text-content-fg hover:text-primary hover:border-primary-soft hover:bg-primary/10'
          }
        `}>
        <span className="hidden sm:block text-sm font-semibold">{savedPostsIsChecked ? 'Salvo' : 'Salvar'}</span>
      </Button>

      <Button
        variant="text"
        ariaLabel={testedPostsIsChecked ? 'Remover dos testados' : 'Marcar como testado'}
        onClick={() => testedPost.toggle(postId)}
        aria-pressed={testedPostsIsChecked}
        leftIcon={
          <Heart
            size={18}
            className={testedPostsIsChecked ? 'fill-secondary stroke-secondary' : ''}
            aria-hidden="true"
          />
        }
        className={`
          flex-1 border
          ${
            testedPostsIsChecked
              ? 'border-secondary text-secondary bg-secondary/10'
              : 'border-border-soft bg-content-bg text-content-fg hover:text-secondary hover:border-secondary-soft hover:bg-secondary/10'
          }
        `}>
        <span className="hidden sm:block text-sm font-semibold">{testedPostsIsChecked ? 'Testado' : 'Testar'}</span>
      </Button>

      <Button
        variant="text"
        ariaLabel="Sugerir melhoria ou alteração"
        leftIcon={<Lightbulb size={18} aria-hidden="true" />}
        className="flex-1 border border-border-soft bg-content-bg text-content-fg hover:text-accent-radiant hover:border-accent-radiant hover:bg-accent-radiant/10 transition-colors">
        <span className="hidden sm:block text-sm font-semibold">Sugerir</span>
      </Button>
    </div>
  );
};
