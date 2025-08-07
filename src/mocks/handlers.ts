import { http, HttpResponse } from 'msw';

export const handlers = [
  // NextAuth endpoints used by signIn
  http.get('/api/auth/providers', () => HttpResponse.json({ credentials: { id: 'credentials', name: 'Credentials', type: 'credentials' } })),
  http.get('/api/auth/csrf', () => HttpResponse.json({ csrfToken: 'test' })),
  http.post('/api/auth/callback/credentials', async () => HttpResponse.json({ ok: true, status: 200, url: null })),
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json().catch(()=>({}));
    if (!body?.email) return HttpResponse.json({ error: 'Invalid' }, { status: 400 });
    return HttpResponse.json({ ok: true });
  }),
  http.post('/api/auth/forgot', async () => HttpResponse.json({ ok: true })),
  http.post('/api/auth/reset-password', async ({ request }) => {
    const body = await request.json().catch(()=>({}));
    if (!body?.password) return HttpResponse.json({ error: 'Invalid' }, { status: 400 });
    return HttpResponse.json({ ok: true });
  }),
];

