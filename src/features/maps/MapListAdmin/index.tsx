import { Image } from '@/libs/image';
import { Text, TextVariantEnum } from '@/atoms/Text';
import { MapAdminType } from './types';

export const MapListAdmin = ({ maps, onEdit }: { maps: MapAdminType[]; onEdit: (map: MapAdminType) => void }) => {
  return (
    <div>
      <Text className="text-center text-content-fg" variant={TextVariantEnum.h3}>
        Mapas disponíveis
      </Text>

      <div className="grid grid-cols-3 gap-3 mt-2">
        {maps.map((map) => {
          return (
            <button
              type="button"
              onClick={() => onEdit(map)}
              className="cursor-pointer hover:scale-105 transition-transform duration-150 max-w-80 max-h-44 overflow-hidden rounded-3xl"
              key={map.name}>
              <Image
                src={map.imageUrl}
                width={320}
                height={180}
                alt=""
                className="rounded-md object-cover w-full h-full"
              />
              <Text className="text-center">{map.name}</Text>
            </button>
          );
        })}
      </div>
    </div>
  );
};
