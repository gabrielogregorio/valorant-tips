import { postsProps } from '@/interfaces/posts';

interface returnPostsMock {
  posts: postsProps[];
  count: number;
  tags: string[];
}

export function mockPosts(): returnPostsMock {
  return {
    posts: [
      {
        id: '617d44c81bc4243f9b2d5a67',
        title: 'title1',
        description: 'description1',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'DepoisDoPlant',
          difficult: 'Díficil',
          ability: 'FlechaRastreadora',
          side: 'Defensores',
          map: 'Ascent',
          mapPosition: 'BaseDefensora',
          agent: 'Sova',
        },
        imgs: [
          {
            id: '45f83bdc-1f44-44a5-a03d-47ab7d9b7c9f',
            description: 'title1_img1',
            image: 'image-1635599600225',
          },
          {
            id: '45f83bdc-1f44-44a5-a03d-47ab7d9b7c9f',
            description: 'title1_img2',
            image: 'image-1635599600225',
          },
          {
            id: '45f83bdc-1f44-44a5-a03d-47ab7d9b7c9f',
            description: 'title1_img3',
            image: 'image-1635599600225',
          },
        ],
      },
      {
        id: '617d44dd1bc4243f9b2d5a75',
        title: 'title2',
        description: 'description2',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'DuranteOPlant',
          difficult: 'Facil',
          ability: 'FlechaDeChoque',
          side: 'Defensores',
          map: 'Ascent',
          mapPosition: 'Outra',
          agent: 'Sova',
        },
        imgs: [
          {
            id: '13782385-5125-4fc5-96c2-1df29089c1e2',
            description: '',
            image: 'image-1635599579266',
          },
        ],
      },
      {
        id: '617d44bb1bc4243f9b2d5a5d',
        title: 'title3',
        description: 'description3',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'DepoisDoPlant',
          difficult: 'Díficil',
          ability: 'DroneCoruka',
          side: 'Atacantes',
          map: 'Ascent',
          mapPosition: 'BaseDefensora',
          agent: 'Sova',
        },
        imgs: [
          {
            id: '9aa8a971-cd39-4fae-b1f9-7a31202bb273',
            description: '',
            image: 'image-1635599545528',
          },
        ],
      },
      {
        id: '617d44a41bc4243f9b2d5a4f',
        title: 'title4',
        description: 'description4',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'DuranteOPlant',
          difficult: 'Díficil',
          ability: 'FlechaDeChoque',
          side: 'Atacantes',
          map: 'Ascent',
          mapPosition: 'BaseDefensora',
          agent: 'Sova',
        },
        imgs: [
          {
            id: '49d71936-fd0e-4d5f-a294-22bf571972c4',
            description: '',
            image: 'image-1635599482539',
          },
        ],
      },
      {
        id: '617d44981bc4243f9b2d5a45',
        title: 'title5',
        description: 'description5',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'AntesDoPlant',
          difficult: 'Medio',
          ability: 'FlechaRastreadora',
          side: 'Atacantes',
          map: 'Ascent',
          mapPosition: 'BaseDefensora',
          agent: 'Sova',
        },
        imgs: [
          {
            id: 'aefdee5f-eea6-4d6b-bf6a-a42aa950b201',
            description: '',
            image: 'image-1635599510471',
          },
        ],
      },
      {
        id: '617d447c1bc4243f9b2d5a3b',
        title: 'titl6',
        description: 'description6',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'DuranteOPlant',
          difficult: 'Díficil',
          ability: 'FlechaDeChoque',
          side: 'Defensores',
          map: 'Ascent',
          mapPosition: 'Meio',
          agent: 'Sova',
        },
        imgs: [
          {
            id: '49d71936-fd0e-4d5f-a294-22bf571972c4',
            description: '',
            image: 'image-1635599482539',
          },
        ],
      },
      {
        id: '617d44691bc4243f9b2d5a31',
        title: 'title7',
        description: 'description7',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'AntesDoPlant',
          difficult: 'Medio',
          ability: 'FlechaDeChoque',
          side: 'Defensores',
          map: 'Ascent',
          mapPosition: 'Meio',
          agent: 'Sova',
        },
        imgs: [
          {
            id: 'c1dce16a-5023-4915-9170-64b99acaebb5',
            description: '',
            image: 'image-1635599463295',
          },
        ],
      },
      {
        id: '617d44541bc4243f9b2d5a27',
        title: 'titl8',
        description: 'description8',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'DuranteOPlant',
          difficult: 'Medio',
          ability: 'FlechaRastreadora',
          side: 'Atacantes',
          map: 'Ascent',
          mapPosition: 'Meio',
          agent: 'Sova',
        },
        imgs: [
          {
            id: 'dcc446a6-ab07-4e51-b405-3a67d2b3b968',
            description: '',
            image: 'image-1635599441810',
          },
        ],
      },
      {
        id: '6157a4c79ac01fd816bed483',
        title: 'title9',
        description: 'description9',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'ComeçoPartida',
          difficult: 'hard',
          ability: 'Spot',
          side: 'Atacantes',
          map: 'Ascent',
          mapPosition: 'heaven',
          agent: 'Sova',
        },
        imgs: [
          {
            id: '49d71936-fd0e-4d5f-a294-22bf571972c4',
            description: '',
            image: 'image-1635599482539',
          },
        ],
      },
      {
        id: '6157a58d38432f3c972865ef',
        title: 'title10',
        description: 'description10',
        user: {
          id: '615301f1b2f117e4b06db30e',
          username: 'gabriel',
        },
        tags: {
          moment: 'InicioPartida',
          difficult: 'Díficil',
          ability: 'DroneCoruka',
          side: 'Atacantes',
          map: 'Ascent',
          mapPosition: 'B',
          agent: 'Sova',
        },
        imgs: [
          {
            id: 'cbf7519a-7fb4-47e9-baf6-5706a7f3977e',
            description: 'fddfdfdffd',
            image: 'image-1633696743955',
          },
        ],
      },
    ],
    count: 2,
    tags: [
      'DepoisDoPlant',
      'Díficil',
      'FlechaRastreadora',
      'Defensores',
      'BaseDefensora',
      'DuranteOPlant',
      'Facil',
      'FlechaDeChoque',
      'Outra',
      'DroneCoruka',
      'Atacantes',
      'AntesDoPlant',
      'Medio',
      'Meio',
      'ComeçoPartida',
      'hard',
      'Spot',
      'heaven',
      'InicioPartida',
      'B',
    ],
  };
}

export const mockAllPosts = () => ({
  posts: [
    {
      id: '617d44c81bc4243f9b2d5a67',
      title: 'titleA',
      description: 'descriptionA',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DepoisDoPlant',
        difficult: 'Díficil',
        ability: 'FlechaRastreadora',
        side: 'Defensores',
        map: 'Ascent',
        mapPosition: 'BaseDefensora',
        agent: 'Sova',
      },
      imgs: [
        {
          id: '45f83bdc-1f44-44a5-a03d-47ab7d9b7c9f',
          description: 'abc',
          image: 'image-1635599600225',
        },
      ],
    },
    {
      id: '617d44dd1bc4243f9b2d5a75',
      title: 'titleB',
      description: 'descriptionB',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DuranteOPlant',
        difficult: 'Facil',
        ability: 'FlechaDeChoque',
        side: 'Defensores',
        map: 'Ascent',
        mapPosition: 'Outra',
        agent: 'Sova',
      },
      imgs: [
        {
          id: '13782385-5125-4fc5-96c2-1df29089c1e2',
          description: '',
          image: 'image-1635599579266',
        },
      ],
    },
    {
      id: '617d44bb1bc4243f9b2d5a5d',
      title: 'titleC',
      description: 'descriptionC',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DepoisDoPlant',
        difficult: 'Díficil',
        ability: 'DroneCoruka',
        side: 'Atacantes',
        map: 'Ascent',
        mapPosition: 'BaseDefensora',
        agent: 'Sova',
      },
      imgs: [
        {
          id: '9aa8a971-cd39-4fae-b1f9-7a31202bb273',
          description: '',
          image: 'image-1635599545528',
        },
      ],
    },
    {
      id: '617d44a41bc4243f9b2d5a4f',
      title: 'titleD',
      description: 'descriptionD',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DuranteOPlant',
        difficult: 'Díficil',
        ability: 'FlechaDeChoque',
        side: 'Atacantes',
        map: 'Ascent',
        mapPosition: 'BaseDefensora',
        agent: 'Sova',
      },
      imgs: [],
    },
    {
      id: '617d44981bc4243f9b2d5a45',
      title: 'titleE',
      description: 'descriptionE',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'AntesDoPlant',
        difficult: 'Medio',
        ability: 'FlechaRastreadora',
        side: 'Atacantes',
        map: 'Ascent',
        mapPosition: 'BaseDefensora',
        agent: 'Sova',
      },
      imgs: [
        {
          id: 'aefdee5f-eea6-4d6b-bf6a-a42aa950b201',
          description: '',
          image: 'image-1635599510471',
        },
      ],
    },
    {
      id: '617d447c1bc4243f9b2d5a3b',
      title: 'titleF',
      description: 'descriptionF',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DuranteOPlant',
        difficult: 'Díficil',
        ability: 'FlechaDeChoque',
        side: 'Defensores',
        map: 'Ascent',
        mapPosition: 'Meio',
        agent: 'Sova',
      },
      imgs: [
        {
          id: '49d71936-fd0e-4d5f-a294-22bf571972c4',
          description: '',
          image: 'image-1635599482539',
        },
      ],
    },
    {
      id: '617d44691bc4243f9b2d5a31',
      title: 'titleG',
      description: 'descriptionG',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'AntesDoPlant',
        difficult: 'Medio',
        ability: 'FlechaDeChoque',
        side: 'Defensores',
        map: 'Ascent',
        mapPosition: 'Meio',
        agent: 'Sova',
      },
      imgs: [
        {
          id: 'c1dce16a-5023-4915-9170-64b99acaebb5',
          description: '',
          image: 'image-1635599463295',
        },
      ],
    },
    {
      id: '617d44541bc4243f9b2d5a27',
      title: 'titleH',
      description: 'descriptionH',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DuranteOPlant',
        difficult: 'Medio',
        ability: 'FlechaRastreadora',
        side: 'Atacantes',
        map: 'Ascent',
        mapPosition: 'Meio',
        agent: 'Sova',
      },
      imgs: [
        {
          id: 'dcc446a6-ab07-4e51-b405-3a67d2b3b968',
          description: '',
          image: 'image-1635599441810',
        },
      ],
    },
    {
      id: '617c587dab83a4da97e076fc',
      title: 'titleI',
      description: 'descriptionI',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DuranteOPlant',
        difficult: 'Díficil',
        ability: 'Clarão',
        side: 'Atacantes',
        map: 'Breeze',
        mapPosition: 'B',
        agent: 'Kay/0',
      },
      imgs: [
        {
          id: '400da6df-31c1-4829-9bc4-03d705ced35f',
          description: 'llllllllllllllllll',
          image: 'image-1635539049044',
        },
      ],
    },
    {
      id: '617c5827ab83a4da97e076ed',
      title: 'titleJ',
      description: 'descriptionJ',
      user: {
        id: '615301f1b2f117e4b06db30e',
        username: 'gabriel',
      },
      tags: {
        moment: 'DuranteRush',
        difficult: 'Medio',
        ability: 'Torreta',
        side: 'Atacantes',
        map: 'Haven',
        mapPosition: 'B',
        agent: 'Killjoy',
      },
      imgs: [
        {
          id: '2c868ff6-9961-4f7c-8667-d325bbd812e7',
          description: 'sdsddsssddssdsdsddsdsd',
          image: 'image-1635538971373',
        },
        {
          id: '1f1bd279-a45c-48a6-8599-d184ed30cf62',
          description: 'sdsdsdsdssddsdsdsdsdsds',
          image: 'image-1635538951428',
        },
      ],
    },
  ],
  count: 2,
  tags: [],
});
