import { FormControl, FormLabel, Input } from '@mui/joy';
import React from 'react';
import { Controller } from 'react-hook-form';

import { DEFAULT_CATEGORY_COLOR } from './constants';
import { FormControllerProps } from './types';

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
          <FormLabel>Color</FormLabel>
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
