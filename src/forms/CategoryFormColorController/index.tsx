import { FormControl, FormLabel, Input } from '@mui/joy';
import React from 'react';
import { Controller } from 'react-hook-form';

import { DEFAULT_CATEGORY_COLOR } from '../../components/categories/constants';
import { FormControllerProps } from '../../components/categories/types';

export const CategoryFormColorController = ({
  control,
  defaultValue,
  error,
  disabled,
}: FormControllerProps) => {
  return (
    <Controller
      name="color"
      control={control}
      defaultValue={defaultValue || DEFAULT_CATEGORY_COLOR}
      render={({ field }) =>
        <FormControl error={error}>
          <FormLabel>Цвет</FormLabel>
          <Input
            disabled={disabled}
            type="color"
            variant="plain"
            {...field}
          />
        </FormControl>
      }
    />
  );
};
