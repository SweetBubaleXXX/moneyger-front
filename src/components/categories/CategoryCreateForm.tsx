import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { TRANSACTION_TYPES } from '../../constants';
import { CategoryCreateRequest } from '../../features/api/types';
import { BaseCategorySchema } from './constants';

export const CategoryCreateSchema = BaseCategorySchema.extend({
  transactionType: z.enum(TRANSACTION_TYPES),
});

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

  useEffect(() => {
    const error = formState.errors.name;
    if (error) {
      toast.error('Category Name', {
        description: error.message,
      });
    }
  }, [formState.errors.name]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={2}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) =>
            <Input
              placeholder="Category Name"
              error={!!formState.errors.name}
              {...field}
            />
          }
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
        <Controller
          name="color"
          control={control}
          defaultValue="#0000ee"
          render={({ field }) =>
            <FormControl error={!!formState.errors.color}>
              <FormLabel>Color</FormLabel>
              <Input type="color" variant="plain" {...field} />
            </FormControl>
          }
        />
        <Button type="submit" loading={loading}>Add</Button>
      </Stack>
    </form >
  );
};
