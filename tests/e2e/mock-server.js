// eslint-disable-next-line @typescript-eslint/no-require-imports
const http = require('http');

const PORT = 4444;

const POSTS_DATA = [
  {
    title: 'Esse pixel permite pegar os atacantes na região do meio',
    description: 'Esse pixel permite pegar os atacantes na região do meio',
    agents: [
      {
        id: '1963e9995765796512eae7c1',
        imageUrl: '/agents/Cypher.webp',
        name: 'Cypher',
      },
    ],
    authors: [
      {
        username: 'developer',
        id: '61a3ae838fe6df463e7bc1cf',
      },
    ],
    id: '615f311ed5dfc1f8ad206f2f',
    maps: [
      {
        id: '33a3ae241fe2df449e8bc1cf',
        imageUrl: '/maps/Ascent.webp',
        name: 'Ascent',
      },
    ],
    steps: [
      {
        id: '5e7b422d-6286-4988-b037-42cb2365e2f9',
        description:
          'Daqui é possível pegar aquele Operator padrão, e o melhor, é possível varar ele pela parede. SIM, as paredes varam!',
        imageUrl: `http://127.0.0.1:${PORT}/posts/1.webp`,
      },
    ],
  },
  {
    title: 'Impedir o desarme da Spyke plantada nesse ponto',
    description:
      'As vezes você não consegue posicionar o nanoenxame, ou simplesmente quer tornar a vida do seu adversário mais difícil',
    agents: [
      {
        id: '2963e9995765796512eae7c1',
        imageUrl: '/agents/Killjoy.webp',
        name: 'Killjoy',
      },
    ],
    authors: [
      {
        username: 'developer',
        id: '61a3ae838fe6df463e7bc1cf',
      },
    ],
    id: '615b06383d918dc99eaff809',
    maps: [
      {
        id: '13a6ae835fe6df413e8bc2cf',
        imageUrl: '/maps/Fracture.webp',
        name: 'Fracture',
      },
    ],
    steps: [
      {
        id: '5ef83544-7006-4466-a2ce-30f4eb574dab',
        description: 'Esse pixel cai em cima da spyke plantada nessa posição',
        imageUrl: `http://127.0.0.1:${PORT}/posts/2.webp`,
      },
    ],
  },
  {
    title: 'Melhores Ultimates #3',
    description: 'Melhores Ultimates #3',
    agents: [
      {
        id: '2963e9995765796512eae7c1',
        imageUrl: '/agents/Killjoy.webp',
        name: 'Killjoy',
      },
    ],
    authors: [
      {
        username: 'developer',
        id: '61a3ae838fe6df463e7bc1cf',
      },
    ],
    id: '615b1ec8805f300d78edda6e',
    maps: [
      {
        id: '11a1ae241fe2df449e8bc1cf',
        imageUrl: '/maps/Haven.webp',
        name: 'Haven',
      },
    ],
    steps: [
      {
        id: '81b2aca3-83d3-4448-a680-c20e8a8e1fb2',
        description: 'Essa ultimate impede o avanço pelo céu',
        imageUrl: `http://127.0.0.1:${PORT}/posts/3.webp`,
      },
    ],
  },
];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Next.js might be fetching /maps
  if (req.url && (req.url.startsWith('/maps') || req.url.startsWith('/api/maps'))) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify([
        {
          id: '13a6ae835fe6df413e8bc2cf',
          name: 'Fracture',
          imageUrl: `http://127.0.0.1:${PORT}/maps/Fracture.webp`,
        },
        {
          id: '11a1ae241fe2df449e8bc1cf',
          name: 'Haven',
          imageUrl: `http://127.0.0.1:${PORT}/maps/Haven.webp`,
        },
        {
          id: '33a3ae241fe2df449e8bc1cf',
          name: 'Ascent',
          imageUrl: `http://127.0.0.1:${PORT}/maps/Ascent.webp`,
        },
      ]),
    );
    return;
  }

  // Next.js might be fetching /agents/:map/posts
  if (req.url && req.url.includes('/agents/') && req.url.includes('/posts')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify([
        {
          id: '2963e9995765796512eae7c1',
          name: 'Killjoy',
          imageUrl: `http://127.0.0.1:${PORT}/agents/Killjoy.webp`,
        },
        {
          id: '1963e9995765796512eae7c1',
          name: 'Cypher',
          imageUrl: `http://127.0.0.1:${PORT}/agents/Cypher.webp`,
        },
      ]),
    );
    return;
  }

  // Next.js fethcing /posts
  if (req.url && (req.url.startsWith('/posts') || req.url.startsWith('/api/posts'))) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: POSTS_DATA }));
    return;
  }

  // Placeholder mocked webp image avoiding Next.js image loading panics
  if (req.url && req.url.endsWith('.webp')) {
    const placeholder = Buffer.from('UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==', 'base64');
    res.writeHead(200, { 'Content-Type': 'image/webp' });
    res.end(placeholder);
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Mock server listening on http://127.0.0.1:${PORT}`);
});
