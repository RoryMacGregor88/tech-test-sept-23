import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TITLE_REQUIRED_MESSAGE } from '~/constants';

import TodoForm from './todo-form.component';

let selectedTodo = {};

describe('TodoForm', () => {
  beforeEach(() => {
    selectedTodo = { id: '123', title: 'test-title', onSubmit: vi.fn() };
  });

  it('should render', () => {
    render(<TodoForm selectedTodo={selectedTodo} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('should disable button if form is not dirty', () => {
    render(<TodoForm selectedTodo={{}} />);

    expect(screen.getByRole('button', { name: /create/i })).toBeDisabled();
  });

  it('should show error if title is invalid', async () => {
    render(<TodoForm selectedTodo={{}} />);

    await userEvent.type(screen.getByPlaceholderText(/title/i), 'test title');
    await userEvent.clear(screen.getByPlaceholderText(/title/i));

    expect(screen.getByText(TITLE_REQUIRED_MESSAGE)).toBeInTheDocument();
  });

  it('should call onSubmit if form is valid and button clicked', async () => {
    const { onSubmit } = selectedTodo;
    render(<TodoForm selectedTodo={{}} onSubmit={onSubmit} />);

    const title = 'test-title';

    await userEvent.type(screen.getByPlaceholderText(/title/i), title);
    await userEvent.click(screen.getByRole('button', { name: /create/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: null,
      formValues: { title, done: false },
    });
  });
});
