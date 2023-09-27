import { Button, ToggleButtonGroup } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import React from 'react';

import { TransactionType } from '../../features/api/types';

export type TransactionTypeToggleProps = {
  value: TransactionType,
  onChange: (transactionType: TransactionType) => void,
  disabled?: boolean,
}

const BUTTON_STYLE: SxProps = {
  flex: '0 1 120px',
};

export const TransactionTypeToggle = ({
  value,
  onChange,
  disabled,
}: TransactionTypeToggleProps) => {
  return (
    <ToggleButtonGroup
      disabled={disabled}
      value={value}
      onChange={(_, value) => {
        onChange(value ?? 'OUT');
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mx: 'auto',
        my: 2,
      }}
    >
      <Button value="OUT" sx={BUTTON_STYLE}>Outcome</Button>
      <Button value="IN" sx={BUTTON_STYLE}>Income</Button>
    </ToggleButtonGroup>
  );
};
