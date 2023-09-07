import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import TodoList from './todo-list.component';

describe('TodoList', () => {
  it('should render children', () => {
    render(
      <TodoList>
        <h1>Child Element</h1>
      </TodoList>,
    );

    expect(
      screen.getByRole('heading', { name: /child element/i }),
    ).toBeInTheDocument();
  });
});
