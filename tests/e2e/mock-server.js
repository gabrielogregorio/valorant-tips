// eslint-disable-next-line @typescript-eslint/no-require-imports
const http = require('http');

const PORT = 4444;

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
          id: '61a3ae838fe6df413e8bc2cf',
          name: 'Icebox',
          imageUrl: `http://127.0.0.1:${PORT}/maps/Icebox.webp`,
        },
      ]),
    );
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
