import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { key: 'sales', label: 'Ventas totales', value: 125_000_000, delta: 12, currency: true },
      { key: 'stores', label: 'Tiendas activas', value: 42, delta: 3 },
      { key: 'orders', label: 'Pedidos globales', value: 1324, delta: -2 },
      { key: 'customers', label: 'Clientes', value: 987, delta: 5 },
      { key: 'commission', label: 'Comisión total', value: 9_800_000, delta: 8, currency: true },
    ],
  });
}





