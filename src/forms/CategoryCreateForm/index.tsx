import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, FormLabel, Option, Select, Stack } from '@mui/joy';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { CategoryCreateRequest } from '../../api/types';
import { useCategoryNameErrorSnackbar } from '../../hooks/snackbar';
import { CategoryFormColorController } from '../CategoryFormColorController';
import { CategoryFormIconController } from '../CategoryFormIconController';
import { CategoryFormNameController } from '../CategoryFormNameController';
import { CategoryUpsertSchema } from '../schemas';

export type CategoryCreateFormProps = {
  onSubmit: (request: CategoryCreateRequest) => void;
  loading?: boolean;
};

export const CategoryCreateForm = ({ onSubmit, loading }: CategoryCreateFormProps) => {
  const { handleSubmit, control, formState } = useForm<CategoryCreateRequest>({
    resolver: zodResolver(CategoryUpsertSchema),
  });

  useCategoryNameErrorSnackbar(formState.errors.name);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={2}>
        <CategoryFormNameController control={control} error={!!formState.errors.name} />
        <Controller
          name="type"
          control={control}
          defaultValue="OUT"
          render={({ field }) => (
            <FormControl error={!!formState.errors.type}>
              <FormLabel>Type</FormLabel>
              <Select {...field} onChange={(_, value) => field.onChange(value)}>
                <Option value="OUT">OUTCOME</Option>
                <Option value="IN">INCOME</Option>
              </Select>
            </FormControl>
          )}
        />
        <CategoryFormColorController control={control} error={!!formState.errors.color} />
        <CategoryFormIconController control={control} error={!!formState.errors.icon} />
        <Button type="submit" loading={loading}>
          Add
        </Button>
      </Stack>
    </form>
  );
};
