import { app } from '../server.js';

function restaurarRota(req) {
  const url = new URL(req.url || '/', 'http://localhost' );
  const rota = url.searchParams.get('__route');
  if (!rota) return;
  url.searchParams.delete('__route');
  req.url = `/api/${rota.replace(/^\/+/, '')}${url.search ? url.search : ''}`;
}

export default function handler(req, res) {
  restaurarRota(req);
  return app(req, res);
}
