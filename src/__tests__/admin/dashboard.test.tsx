import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../../../app/admin/dashboard/page';

// Mock fetch in RSC
// use MSW handlers declared in setup

describe('Admin dashboard', () => {
  it('renders KPIs and lists top stores and alerts', async () => {
    // Render server component by awaiting it
    const Comp = await Dashboard();
    render(Comp as any);
    expect(await screen.findByText(/Ventas totales/i)).toBeInTheDocument();
    expect(screen.getByText(/Top 5 Tiendas/i)).toBeInTheDocument();
    expect(screen.getByText(/Alertas/i)).toBeInTheDocument();
  });
});

