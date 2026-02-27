import Link from "next/link"
import { Image } from "../../libs/image"
import { ErrorMessage } from "../../Molecules/ErrorMessage"
import { Skeleton } from "../../Molecules/Skeleton"
import { TitleAndSubtitle } from "../../Molecules/TitleAndSubTitle"
import { Text } from "../../Atoms/Text"

export type Maps = {
  name: string
  image: string
  id: string
}

export const MapList = ({ maps }: { maps: Maps[] }) => {
  return <div>
    <TitleAndSubtitle title="Escolhe um mapa ai parça" />

    <div className="grid grid-cols-3 gap-3 mt-2">
      {maps.map((map) => {
        return <Link href={`/${map.id}/`} className="hover:scale-105 transition-transform duration-150" key={map.name}>
          <Image src={map.image} width={1048} height={698} alt="" className="rounded-md" />
          <Text className="text-center" >{map.name}</Text>
        </Link>
      })}
    </div>
  </div>
}
