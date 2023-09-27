import { FormControl, FormLabel, Input } from '@mui/joy';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { DEFAULT_CATEGORY_COLOR } from './constants';

export type CategoryFormColorControllerProps = {
  control: Control<any>,
  defaultValue?: string,
  error?: boolean,
  disabled?: boolean,
}

export const CategoryFormColorController = ({
  control,
  defaultValue,
  error,
  disabled,
}: CategoryFormColorControllerProps) => {
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
