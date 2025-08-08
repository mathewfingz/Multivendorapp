import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 'a1', type: 'stock', title: 'SKU 123 en nivel crítico' },
      { id: 'a2', type: 'pagos', title: 'Factura #455 vencida' },
      { id: 'a3', type: 'webhooks', title: 'Webhook de pedidos falló (3 intentos)' },
    ],
  });
}




