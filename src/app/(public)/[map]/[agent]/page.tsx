import { TitleAndSubtitle } from "../../../../Molecules/TitleAndSubTitle"




export default async function PostsMapAgents({ params }: { params: { agent: string, map: string } }) {
  const { agent, map } = await params

  const url = `http://127.0.0.1:3333/posts/${map}/${agent}`
  const posts = (await fetch(url).then((res) => res.json())).posts as { id: string }[]

  return <div>
    <TitleAndSubtitle title={`Tutoriais do ${agent} no mapa ${map}`} />


    {posts.map((post) => {
      return <div key={post.id}>POST: {post.id}</div>
    })}

  </div>
}
