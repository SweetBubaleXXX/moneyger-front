import { Input } from '@mui/joy';
import React from 'react';
import { Controller } from 'react-hook-form';

import { FormControllerProps } from './types';

export const CategoryFormNameController = ({
  control,
  defaultValue,
  error,
  disabled,
}: FormControllerProps) => {
  return (
    <Controller
      name="name"
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field }) =>
        <Input
          disabled={disabled}
          placeholder="Category Name"
          error={!!error}
          {...field}
        />
      }
    />
  );
};
