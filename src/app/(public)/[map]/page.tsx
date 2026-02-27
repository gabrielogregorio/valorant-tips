import { GetStaticPaths, GetStaticProps } from "next";
import { AgentList, Agent } from "../../../Organisms/AgentList";
import { Maps } from "../../../Organisms/MapList";


export const revalidate = 20

export async function generateStaticParams() {
  const maps: Maps[] = await fetch('http://127.0.0.1:3333/maps').then((res) => res.json())

  console.log(maps, ' aaaaaaaaaaxxxxxxxx')
  return maps.map((map: Maps) => {
    return {
      id: map.id
    }
  })

}


export default async function ChoiceAgentAfterMap({ params }: { params: Promise<{ map: string }> }) {
  const { map } = await params
  const url = `http://127.0.0.1:3333/agents/${map}`
  console.log(url, 'urlurlurl')
  const agents: Agent[] = await fetch(url).then((res) => res.json())

  return <AgentList agents={agents} map={map} />;
}
