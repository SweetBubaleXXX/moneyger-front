import {
  Button,
  FormControl,
  FormLabel,
} from '@mui/joy';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import { CategoryIcon } from '../categories/CategoryIcon';
import { FormControllerProps } from '../categories/types';
import { CategoryIconSelector } from './CategoryIconSelector';

export type CategoryFormIconControllerProps = FormControllerProps & {
  onEdit?: () => void,
}

export const CategoryFormIconController = ({
  control,
  defaultValue,
  error,
  disabled,
  onEdit,
}: CategoryFormIconControllerProps) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Controller
      name="icon"
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field }) =>
        <FormControl error={error}>
          <FormLabel>Icon</FormLabel>
          <Button
            disabled={disabled}
            variant="outlined"
            onClick={() => setDrawerOpen(true)}
          >
            {field.value ? <CategoryIcon name={field.value} /> : 'Pick'}
          </Button>
          <CategoryIconSelector
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            selectedValue={field.value}
            onSelect={value => {
              field.onChange(value);
              onEdit?.();
            }}
          />
        </FormControl>
      }
    />
  );
};
