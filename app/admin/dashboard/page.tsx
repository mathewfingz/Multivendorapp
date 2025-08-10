import React from 'react';
import Link from 'next/link';
import { formatCOP } from '@/src/lib/format';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export default async function AdminDashboardPage() {
  const [kpis, alerts, top] = await Promise.all([
    fetchJSON<any>('/api/admin/kpis'),
    fetchJSON<any>('/api/admin/alerts'),
    fetchJSON<any>('/api/admin/top-stores?limit=5'),
  ]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Panel de control</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {kpis.items.map((k: any) => (
          <div key={k.key} className="rounded-xl border bg-white p-4">
            <div className="text-sm text-gray-500">{k.label}</div>
            <div className="text-2xl font-bold">{k.currency ? formatCOP(k.value) : k.value}</div>
            <div className={k.delta >= 0 ? 'text-emerald-600' : 'text-red-600'}>{k.delta >= 0 ? `+${k.delta}%` : `${k.delta}%`}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Ventas</h2>
            <div className="space-x-2">
              <Link className="text-sm text-blue-600" href="?range=30">30d</Link>
              <Link className="text-sm text-blue-600" href="?range=90">90d</Link>
            </div>
          </div>
          <div className="h-56 grid place-items-center text-gray-400">Gráfico área (placeholder)</div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold mb-3">Alertas</h2>
          <ul className="space-y-2">
            {alerts.items.map((a: any) => (
              <li key={a.id} className="flex items-center justify-between text-sm">
                <span>{a.title}</span>
                <span className={`px-2 py-1 rounded text-white ${a.type === 'stock' ? 'bg-amber-500' : a.type === 'pagos' ? 'bg-red-500' : 'bg-gray-500'}`}>{a.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-3">Top 5 Tiendas</h2>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-gray-500"><th>Nombre</th><th>Ventas</th><th>Margen</th></tr></thead>
          <tbody>
            {top.items.map((s: any) => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.name}</td>
                <td>{formatCOP(s.sales)}</td>
                <td>{s.margin}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}





