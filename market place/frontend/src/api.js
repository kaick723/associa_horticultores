export const API_BASE = 'https://associa-horticultores-backend.onrender.com';

export async function apiFetch(path, opts){
  const url = API_BASE + path;
  const init = opts || {};
  init.headers = init.headers || {};
  if (init.body && typeof init.body === 'object' && !(init.body instanceof FormData)) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(init.body);
  }
  const res = await fetch(url, init);
  const text = await res.text();
  let data = null;
  try { data = JSON.parse(text); } catch(e) { data = text; }
  return { ok: res.ok, status: res.status, data };
}
