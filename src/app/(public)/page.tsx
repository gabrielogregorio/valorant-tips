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
            className={'overflow-hidden hover:scale-105 transition-transform duration-150'}>
            <Image src={map.imageUrl} alt={map.name} className="object-cover rounded-lg" width={500} height={500} />
            <div className="text-white text-base p-1 text-center">{map.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
