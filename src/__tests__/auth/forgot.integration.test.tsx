import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPage from '../../../app/auth/forgot-password/page';

describe('Forgot password integration', () => {
  it('validates email and submits', async () => {
    const user = userEvent.setup();
    render(<ForgotPage />);
    await user.click(screen.getByRole('button', { name: /enviar enlace/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /enviar enlace/i }));
  });
});

