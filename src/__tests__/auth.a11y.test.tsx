import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import LoginPage from '../../app/auth/login/page';

expect.extend(toHaveNoViolations);

describe('Auth pages a11y', () => {
  it('login has no obvious a11y violations', async () => {
    const { container } = render(<LoginPage />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

