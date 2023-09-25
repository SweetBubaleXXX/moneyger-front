import { Button, ButtonProps } from '@mui/joy';
import { Check, X } from 'lucide-react';
import React from 'react';

import { BaseToolbar } from './BaseToolbar';

export type SavingToolbarProps = {
  onSave?: () => void,
  onCancel?: () => void,
  saveButtonProps?: ButtonProps,
  cancelButtonProps?: ButtonProps,
}

export const SavingToolbar = ({
  onSave,
  onCancel,
  saveButtonProps,
  cancelButtonProps,
}: SavingToolbarProps) => {
  return (
    <BaseToolbar>
      {
        onCancel &&
        <Button
          color="danger"
          startDecorator={<X />}
          onClick={onCancel}
          {...cancelButtonProps}
        >
          Cancel
        </Button>
      }
      <Button
        color="success"
        startDecorator={<Check />}
        onClick={() => onSave?.()}
        {...saveButtonProps}
      >
        Save
      </Button >
    </BaseToolbar>
  );
};