import { Button } from '@mui/joy';
import { Check, X } from 'lucide-react';
import React from 'react';

import { BaseToolbar } from './BaseToolbar';

export type SavingToolbarProps = {
  onSave: () => void,
  onCancel?: () => void,
}

export const SavingToolbar = ({
  onSave,
  onCancel,
}: SavingToolbarProps) => {
  return (
    <BaseToolbar>
      {
        onCancel &&
        <Button
          color="danger"
          startDecorator={<X />}
          onClick={onCancel}
        >
          Cancel
        </Button>
      }
      <Button
        color="success"
        startDecorator={<Check />}
        onClick={onSave}
      >
        Save
      </Button >
    </BaseToolbar>
  );
};