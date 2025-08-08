import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? 5);
  const items = [
    { id: 's1', name: 'Panadería Aurora', sales: 52000000, margin: 32 },
    { id: 's2', name: 'Café Montaña', sales: 41000000, margin: 28 },
    { id: 's3', name: 'Moda Andina', sales: 29000000, margin: 35 },
    { id: 's4', name: 'ElectroMax', sales: 21000000, margin: 18 },
    { id: 's5', name: 'EcoMarket', sales: 15000000, margin: 22 },
  ].slice(0, limit);
  return NextResponse.json({ items });
}




