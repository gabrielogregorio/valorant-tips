import Link from 'next/link';
import { Image } from '@/libs/image';
import { MapsType } from '@/shared/hooks/useFetchMaps';
import { TitleAndSubtitle } from '@/molecules/TitleAndSubTitle';
import { PageContainer } from '@/atoms/PageContainer';
import { api } from '@/libs/api';

export default async function Page() {
  const maps = (await api.get<MapsType[]>('/maps/?filter=with-posts')).data;

  return (
    <PageContainer>
      <TitleAndSubtitle key="" subtitle="" title="Escolhe um mapa ai Parça" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {maps.map((map) => (
          <Link
            type="button"
            key={map.id}
            href={`/map/${map.id}`}
            className={'hover:scale-105 transition-transform duration-150'}>
            <Image
              src={map.imageUrl}
              alt=""
              draggable={false}
              aria-hidden="true"
              className="w-full object-cover rounded-lg shadow-2xl overflow-hidden aspect-296/158 select-none"
              width={296}
              height={158}
            />
            <span className="text-white text-base p-1 text-center select-none block">{map.name}</span>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
