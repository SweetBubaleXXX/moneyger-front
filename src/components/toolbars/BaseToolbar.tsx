import { ButtonGroup } from '@mui/joy';
import React, { ReactNode } from 'react';

export type BaseToolbarProps = {
  children: ReactNode,
}

export const BaseToolbar = ({
  children,
}: BaseToolbarProps) => {
  return (
    <ButtonGroup
      buttonFlex="0 1 200px"
      sx={{ justifyContent: 'center' }}
    >
      {children}
    </ButtonGroup>
  );
};
