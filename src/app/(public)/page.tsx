import Link from 'next/link';
import { Image } from '@/libs/image';
import { fetcherServer } from '@/libs/fetcher';
import { MapsType } from '@/shared/hooks/useFetchMaps';
import { TitleAndSubtitle } from '../../components/Molecules/TitleAndSubTitle';

export default async function Page() {
  const maps = await fetcherServer<MapsType[]>('/maps/?filter=with-posts');

  return (
    <div>
      <TitleAndSubtitle key="" subtitle="" title="Escolhe um mapa ai Parça" />

      <div className="grid grid-cols-4 gap-4 mt-4">
        {maps.map((map) => (
          <Link
            type="button"
            key={map.id}
            href={`/map/${map.id}`}
            className={'relative rounded-lg overflow-hidden border-2 transition-all'}>
            <Image src={map.imageUrl} alt={map.name} className="object-cover" width={500} height={500} />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
              {map.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
