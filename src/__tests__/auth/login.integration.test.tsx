import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../../../app/auth/login/page';

describe('Login integration', () => {
  it('shows validation and submits successfully', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    await user.click(screen.getByRole('button', { name: /log in/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));
  });
});

