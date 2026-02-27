import Link from "next/link"
import { Image } from "../../libs/image"
import { ErrorMessage } from "../../Molecules/ErrorMessage"
import { Skeleton } from "../../Molecules/Skeleton"
import { TitleAndSubtitle } from "../../Molecules/TitleAndSubTitle"
import { Text } from "../../Atoms/Text"

export type Agent = {
  name: string
  image: string
  id: string
}

export const AgentList = ({  agents, map }: { agents: Agent[], map: string }) => {
  return <div>
    <TitleAndSubtitle title="Escolha um agente" />

    <div className="grid grid-cols-3 gap-3 mt-2">
      {agents.map((agent) => {
        return <Link href={`/${map}/${agent.id}/`} className="hover:scale-105 transition-transform duration-150" key={agent.name}>
          <Image src={agent.image} width={1048} height={698} alt="" className="rounded-md" />
          <Text className="text-center" >{agent.name}</Text>
        </Link>
      })}
    </div>
  </div>
}
