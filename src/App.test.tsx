import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('should render', () => {
    render(<App />);

    expect(screen.getByText('App')).toBeInTheDocument();
  });
  it('should click button', async () => {
    render(<App />);

    expect(screen.getByText('Count is: 0')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Increment' }));

    expect(screen.getByText('Count is: 1')).toBeInTheDocument();
  });
});
