import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormLabel,
  Option,
  Select,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { CategoryCreateSchema } from '../../features/api/schemas';
import { CategoryCreateRequest } from '../../features/api/types';
import { toastCategoryNameError } from '../../helpers/forms';
import { CategoryFormColorController } from './CategoryFormColorController';
import { CategoryFormNameController } from './CategoryFormNameController';

export type CategoryCreateFormProps = {
  onSubmit: (request: CategoryCreateRequest) => void,
  loading?: boolean,
}

export const CategoryCreateForm = ({
  onSubmit,
  loading,
}: CategoryCreateFormProps) => {
  const {
    handleSubmit,
    control,
    formState,
  } = useForm<CategoryCreateRequest>(
    { resolver: zodResolver(CategoryCreateSchema) }
  );

  useEffect(
    () => toastCategoryNameError(formState.errors.name),
    [formState.errors.name]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={2}>
        <CategoryFormNameController
          control={control}
          error={!!formState.errors.name}
        />
        <Controller
          name="transactionType"
          control={control}
          defaultValue="OUT"
          render={({ field }) =>
            <FormControl error={!!formState.errors.transactionType}>
              <FormLabel>Type</FormLabel>
              <Select
                {...field}
                onChange={(_, value) => field.onChange(value)}
              >
                <Option value="OUT">OUTCOME</Option>
                <Option value="IN">INCOME</Option>
              </Select>
            </FormControl>
          }
        />
        <CategoryFormColorController
          control={control}
          error={!!formState.errors.color}
        />
        <Button type="submit" loading={loading}>Add</Button>
      </Stack>
    </form >
  );
};
