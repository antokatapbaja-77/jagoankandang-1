const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };

http.createServer((request, response) => {
  const requested = request.url === '/' ? 'index.html' : request.url.split('?')[0].replace(/^\//, '');
  const file = path.resolve(root, requested);
  if (!file.startsWith(root)) { response.writeHead(403); response.end(); return; }
  fs.readFile(file, (error, content) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    response.end(content);
  });
}).listen(4173, () => console.log('Jagoan Kandang running at http://localhost:4173'));
