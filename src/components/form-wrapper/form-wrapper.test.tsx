import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import FormWrapper from './form-wrapper.component';

describe('FormWrapper', () => {
  it('should render children', () => {
    render(
      <FormWrapper>
        <h1>Child Element</h1>
      </FormWrapper>,
    );

    expect(
      screen.getByRole('heading', { name: /child element/i }),
    ).toBeInTheDocument();
  });

  it('should call onSubmit handler', async () => {
    const onSubmit = vi.fn();
    render(
      <FormWrapper onSubmit={onSubmit}>
        <button>Submit</button>
      </FormWrapper>,
    );

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalled();
  });
});
