import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Option, Select } from '@mui/joy';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TRANSACTION_TYPES } from '../../constants';
import { CategoryCreateRequest } from '../../features/api/types';

export const CategoryCreateSchema = z.object({
  name: z.string().max(64),
  transactionType: z.enum(TRANSACTION_TYPES),
  icon: z.string().max(64),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});

export type CategoryCreateFormProps = {
  onSubmit: (request: CategoryCreateRequest) => void,
}

export const CategoryCreateForm = ({
  onSubmit,
}: CategoryCreateFormProps) => {
  const {
    handleSubmit,
    control,
    formState,
  } = useForm<CategoryCreateRequest>(
    { resolver: zodResolver(CategoryCreateSchema) }
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
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
            <Select
              {...field}
              onChange={(_, value) => field.onChange(value)}
            >
              <Option value="OUT">OUTCOME</Option>
              <Option value="IN">INCOME</Option>
            </Select>
          }
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) =>
            <Input type="color" {...field} />
          }
        />
        <Button type="submit">Add</Button>
      </form >
    </>
  );
};
