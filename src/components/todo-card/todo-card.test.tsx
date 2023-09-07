import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TODO_COMPLETE_TEXT, TODO_INCOMPLETE_TEXT } from '~/constants';

import TodoCard from './todo-card.component';

let defaultProps = {};

describe('TodoCard', () => {
  beforeEach(() => {
    defaultProps = {
      todo: {
        title: 'test-title',
        done: true,
        createdAt: '2023-09-06T20:20:28.851Z',
        modifiedAt: '2023-09-06T20:20:28.851Z',
      },
      handleEdit: vi.fn(),
      handleDelete: vi.fn(),
    };
  });

  it('should render', () => {
    render(<TodoCard {...defaultProps} />);

    const headerText = `Title: ${defaultProps.todo.title}`,
      statusMesasage = `Status: ${TODO_COMPLETE_TEXT}`;

    expect(
      screen.getByRole('heading', { name: headerText }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: statusMesasage }),
    ).toBeInTheDocument();
  });

  it('should format dates', () => {
    render(
      <TodoCard
        {...defaultProps}
        todo={{ ...defaultProps.todo, done: false }}
      />,
    );

    const formattedDate = '6th September 2023',
      headingText = `Created: ${formattedDate}`;

    expect(
      screen.getByRole('heading', { name: headingText }),
    ).toBeInTheDocument();
  });

  it('should show alternate text if `done` is false', () => {
    render(
      <TodoCard
        {...defaultProps}
        todo={{ ...defaultProps.todo, done: false }}
      />,
    );

    const statusMesasage = `Status: ${TODO_INCOMPLETE_TEXT}`;

    expect(
      screen.getByRole('heading', { name: statusMesasage }),
    ).toBeInTheDocument();
  });

  it('should call handleEdit when button clicked', async () => {
    render(<TodoCard {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: /edit/i }));

    const { handleEdit, todo } = defaultProps;

    expect(handleEdit).toHaveBeenCalledWith(todo);
  });

  it('should call handleDelete when button clicked', async () => {
    render(<TodoCard {...defaultProps} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    const { handleDelete, todo } = defaultProps;

    expect(handleDelete).toHaveBeenCalledWith(todo);
  });
});
