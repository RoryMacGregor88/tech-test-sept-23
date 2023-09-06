import { ReactNode } from 'react';

import { Button as MantineButton } from '@mantine/core';

import { BUTTON_LOADING_MESSAGE } from '~/constants';

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  submitType?: 'button' | 'submit';
  children: ReactNode;
}

const Button = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  submitType = 'button',
  children,
}: Props) => (
  <MantineButton
    className='bg-black text-white'
    disabled={isDisabled}
    type={submitType}
    onClick={onClick}
  >
    {isLoading ? BUTTON_LOADING_MESSAGE : children}
  </MantineButton>
);

export default Button;
