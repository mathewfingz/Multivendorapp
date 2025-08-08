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
  // Admin dashboard
  http.get('/api/admin/kpis', () => HttpResponse.json({
    items: [
      { key: 'sales', label: 'Ventas totales', value: 1000000, delta: 10, currency: true },
      { key: 'stores', label: 'Tiendas activas', value: 10, delta: 0 },
      { key: 'orders', label: 'Pedidos globales', value: 100, delta: -5 },
      { key: 'customers', label: 'Clientes', value: 50, delta: 3 },
      { key: 'commission', label: 'Comisión total', value: 50000, delta: 2, currency: true },
    ],
  })),
  http.get('/api/admin/alerts', () => HttpResponse.json({
    items: [ { id: 'a1', type: 'stock', title: 'SKU crítico' } ],
  })),
  http.get('/api/admin/top-stores', ({ request }) => {
    return HttpResponse.json({ items: [
      { id: '1', name: 'A', sales: 500000, margin: 20 },
      { id: '2', name: 'B', sales: 400000, margin: 15 },
    ]});
  }),
];

