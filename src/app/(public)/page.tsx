import { MapList, Maps } from "../../Organisms/MapList";


export default async function Home() {
  const maps: Maps[] = await fetch('http://127.0.0.1:3333/maps', { next: { revalidate: 20 } }).then((res) => res.json())

  return <MapList maps={maps} />

};

