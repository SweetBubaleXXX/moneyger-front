import { Input } from '@mui/joy';
import React from 'react';
import { Controller } from 'react-hook-form';

import { FormControllerProps } from '../../components/categories/types';

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
          placeholder="Название категории"
          error={!!error}
          {...field}
        />
      }
    />
  );
};
