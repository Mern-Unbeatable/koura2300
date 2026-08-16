/**
 * Minimal static file server for the production `dist/` folder.
 * Used by Coolify / PaaS `npm start` — no nginx required.
 * Honours PORT and binds 0.0.0.0 so container healthchecks succeed.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const ensureDistExists = () => {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      '[serve-dist] Missing dist/. Run "npm run build" before "npm start".',
    );
    process.exit(1);
  }
};

const resolveFilePath = (urlPath) => {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const safePath = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const absolutePath = path.join(DIST_DIR, safePath);

  if (!absolutePath.startsWith(DIST_DIR)) {
    return null;
  }

  if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()) {
    return absolutePath;
  }

  // SPA fallback — client routes resolve to index.html
  return path.join(DIST_DIR, 'index.html');
};

const sendFile = (res, filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[extension] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
};

ensureDistExists();

const server = http.createServer((req, res) => {
  try {
    const filePath = resolveFilePath(req.url || '/');

    if (!filePath || !fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    sendFile(res, filePath);
  } catch (error) {
    console.error('[serve-dist]', error);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal server error');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[serve-dist] Serving ${DIST_DIR} at http://${HOST}:${PORT}`);
});
