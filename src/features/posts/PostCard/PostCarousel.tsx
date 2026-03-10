'use client';

import { ReactElement, useState, useId } from 'react';
import { PostsServiceType } from '@/shared/hooks/useFetchPosts';
import { Image } from '@/libs/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/molecules/Button';

type TProps = {
  steps: PostsServiceType['steps'];
};

const NORMALIZE_COUNTER_STARTING_IN_ONE = 1;

export const PostCarousel = ({ steps }: TProps): ReactElement => {
  const carouselId = useId();
  const [indexStep, setIndexStep] = useState(0);
  const totalImages = steps.length;

  const nextStep = (): void => {
    setIndexStep((prev) => (prev + 1 < totalImages ? prev + 1 : 0));
  };

  const prevStep = (): void => {
    setIndexStep((prev) => (prev - 1 >= 0 ? prev - 1 : totalImages - 1));
  };

  const currentStep = steps[indexStep];

  return (
    <div className="w-full" role="region" aria-roledescription="carousel" aria-label="Passos do post">
      <div className="relative w-full overflow-x-auto flex h-full min-w-full">
        <div className="h-full w-full" id={carouselId} aria-live="polite">
          <Image
            key={currentStep.imageUrl}
            ariaLabel={currentStep.description || `Imagem do passo ${indexStep + NORMALIZE_COUNTER_STARTING_IN_ONE}`}
            className="object-cover rounded-md rounded-b-none h-full  w-full aspect-840/500"
            placeholder="blur"
            priority
            width={900}
            height={500}
            blurDataURL="/images/assets/loader.webp"
            data-src={currentStep.imageUrl}
            src={currentStep.imageUrl}
            alt={currentStep.description || `Passo ${indexStep + NORMALIZE_COUNTER_STARTING_IN_ONE}`}
          />
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12">
          <Button
            ariaLabel="Passo anterior"
            aria-controls={carouselId}
            className="flex items-center justify-center w-full h-full rounded-full bg-black/40 backdrop-blur-sm text-white border-none hover:bg-black/60 active:bg-black/80 transition-all duration-200 select-none touch-none ml-2"
            onClick={prevStep}>
            <ChevronLeft className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12">
          <Button
            ariaLabel="Próximo passo"
            aria-controls={carouselId}
            className="flex items-center justify-center w-full h-full rounded-full bg-black/40 backdrop-blur-sm text-white border-none hover:bg-black/60 active:bg-black/80 transition-all duration-200 select-none touch-none mr-2"
            onClick={nextStep}>
            <ChevronRight className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="w-full overflow-hidden bg-orange-600">
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
          <p className="text-white text-base leading-relaxed">
            <span className="font-semibold block mb-1">
              Passo {indexStep + NORMALIZE_COUNTER_STARTING_IN_ONE} de {steps.length}
            </span>
            <span className="block">{currentStep.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
