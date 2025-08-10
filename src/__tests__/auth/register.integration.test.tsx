import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '../../../app/auth/register/page';

describe('Register integration', () => {
  it('validates fields and submits', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);
    await user.click(screen.getByRole('button', { name: /create account/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), 'new@user.com');
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'password123');
    await user.click(screen.getByRole('button', { name: /create account/i }));
  });
});





