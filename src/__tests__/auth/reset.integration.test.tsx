import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPage from '../../../app/auth/reset-password/page';
vi.mock('next/navigation', async () => {
  const actual = await vi.importActual<any>('next/navigation');
  return {
    ...actual,
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams('?token=test'),
  };
});

describe('Reset password integration', () => {
  it('validates password and submits', async () => {
    const user = userEvent.setup();
    render(<ResetPage />);
    await user.click(screen.getByRole('button', { name: /actualizar/i }));
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/nueva contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /actualizar/i }));
  });
});

