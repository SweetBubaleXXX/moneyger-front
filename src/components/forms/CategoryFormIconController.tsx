import {
  Button,
  FormControl,
  FormLabel,
} from '@mui/joy';
import { icons } from 'lucide-react';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import { CategoryIcon } from '../categories/CategoryIcon';
import { FormControllerProps } from '../categories/types';
import { CategoryIconSelector } from './CategoryIconSelector';

export const CategoryFormIconController = ({
  control,
  defaultValue,
  error,
  disabled,
}: FormControllerProps) => {
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
            {
              field.value && Object.hasOwn(icons, field.value) ?
                <CategoryIcon name={field.value} />
                :
                'Pick'
            }
          </Button>
          <CategoryIconSelector
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            field={field}
          />
        </FormControl>
      }
    />
  );
};
