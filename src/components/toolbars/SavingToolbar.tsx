import { Button, ButtonProps } from '@mui/joy';
import { Check, X } from 'lucide-react';
import React from 'react';

import { BaseToolbar } from './BaseToolbar';

export type SavingToolbarProps = {
  onSave?: () => void,
  onCancel?: () => void,
  saveButtonProps?: ButtonProps,
  cancelButtonProps?: ButtonProps,
  loading?: boolean,
}

export const SavingToolbar = ({
  onSave,
  onCancel,
  saveButtonProps,
  cancelButtonProps,
  loading,
}: SavingToolbarProps) => {
  return (
    <BaseToolbar>
      {
        (onCancel || cancelButtonProps) &&
        <Button
          color="danger"
          startDecorator={<X />}
          disabled={loading}
          onClick={onCancel}
          {...cancelButtonProps}
        >
          Cancel
        </Button>
      }
      <Button
        color="success"
        startDecorator={<Check />}
        disabled={loading}
        onClick={() => onSave?.()}
        {...saveButtonProps}
      >
        Save
      </Button >
    </BaseToolbar>
  );
};