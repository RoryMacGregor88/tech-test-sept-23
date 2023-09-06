import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BUTTON_LOADING_MESSAGE } from '~/constants';

import Button from './button.component';

const buttonText = 'Button Text';

describe('Button', () => {
  it('should render', () => {
    render(<Button onClick={vi.fn()}>Button Text</Button>);

    expect(
      screen.getByRole('button', { name: buttonText }),
    ).toBeInTheDocument();
  });

  it('should show loading message if isLoading is true', () => {
    render(
      <Button isLoading onClick={vi.fn()}>
        Button Text
      </Button>,
    );

    expect(
      screen.getByRole('button', { name: BUTTON_LOADING_MESSAGE }),
    ).toBeInTheDocument();
  });

  it('should disable button if isDisabled is true', () => {
    render(
      <Button isDisabled onClick={vi.fn()}>
        Button Text
      </Button>,
    );

    expect(screen.getByRole('button', { name: buttonText })).toBeDisabled();
  });

  it('should call click handler when button click', async () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Button Text</Button>);

    await userEvent.click(screen.getByRole('button', { name: buttonText }));

    expect(onClick).toHaveBeenCalled();
  });
});
