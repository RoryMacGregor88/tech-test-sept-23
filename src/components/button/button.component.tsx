import { ReactNode } from 'react';

import { Button as MantineButton, createStyles } from '@mantine/core';

import { BUTTON_LOADING_MESSAGE } from '~/constants';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: '#fff !important',
  },
}));

interface Props {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
}

const Button = ({
  onClick,
  isLoading = false,
  isDisabled = false,
  children,
}: Props) => {
  const { button } = useStyles();
  return (
    <MantineButton className={button} disabled={isDisabled} onClick={onClick}>
      {isLoading ? BUTTON_LOADING_MESSAGE : children}
    </MantineButton>
  );
};

export default Button;
