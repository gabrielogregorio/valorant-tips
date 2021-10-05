/// <reference types="react-scripts" />

type momentType = 'InicioPartida'| 'DuranteRush' | 'QualquerMomento' | 'AntesDoPlant' | 'DuranteOPlant' | 'DepoisDoPlant'
type difficultType = 'Facil' | 'Medio' | 'Díficil'
//type abilityType = 'Spot' | 'BarreiraDeOrbe'
type sideType = 'Defensores' | 'Atacantes'
type mapType = 'Ascent' | 'Split' | 'Ascent' | 'Haven' | 'Breeze' | 'Icebox' | 'Fracture' | 'Bind'
type mapPositionType = 'Meio' | 'B' | 'A' | 'C'
//type agentType  = 'Sova' | 'Vyper'
type positionMapType = 'A' | 'B'| 'C' | 'D' | 'BaseAtacante' | 'BaseDefensora' | 'Meio' | 'Outra'

interface PositionMapInterface {
  id: string,
  name: positionMapType
}

interface PropsPostInterface {
  _id: string,
  user: { _id: string, username: string, image: string }
  description: string
  title: string

  imgs: [{ _id: string, image: string, description: string } ]
  tags: {
    map: mapType, // Pode ser qualquer mapa
    agent: string, // Pode ser qualque agente
    ability: string, // Depende do agente
    moment: momentType,
    difficult: difficultType,
    side: sideType,
    mapPosition: string
  },
  postActions: {
    save: [{_id: string}],
    tested: [{_id: string}]
  },
  toggleSave: (_id: string) => void
  toggleTested: (_id: string) => void
}

interface postActionsInterface {
  save: [ {_id: string} ],
  tested: [{_id: string} ]
}







interface habilitsInterface {
  id: string,
  name: string,
  keyboard: string
}

interface sideInterface {
  id: string,
  name: sideType
}

interface mommentInterface {
  id: string,
  name: momentType
}

interface difficultInterface {
  id: string,
  name: difficultType
}

interface agentInterface {
  id: number,
  name: string,
  img: string,
  habilits: habilitsInterface[]
}

interface mapInterface {
  id: number,
  name: mapType,
  img: string,
  mapPosition: PositionMapInterface[]
}

interface imgsInterface {
  title: string,
  img: string
}

// interface tagProps {
//   moment: momentType[],
//   difficult: difficultType[],
//   ability: abilityType[],
//   side: sideType[],
//   map: mapType[],
//   mapPosition: positionMapType[],
//   agent: agentType[],
// }

interface postsProps {
  _id: string,
  title: string,
  description: string,
  imgs: imgsInterface[] ,
  tags: tagProps,
}

// Tipos de modal de mensagem
type modalType = 'success' | 'error'
