import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubcategoryCreateRequest } from '../../features/api/types';
import { CategoryFormColorController } from './CategoryFormColorController';
import {
  BaseCategorySchema,
  CATEGORY_UPDATE_FORM_ID,
} from './constants';

export type SubcategoryCreateFormProps = {
  onSubmit: (request: SubcategoryCreateRequest) => void,
}

export const SubcategoryCreateForm = ({
  onSubmit,
}: SubcategoryCreateFormProps) => {
  const {
    handleSubmit,
    control,
    formState,
  } = useForm<SubcategoryCreateRequest>(
    { resolver: zodResolver(BaseCategorySchema) }
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
    <form
      id={CATEGORY_UPDATE_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <CategoryFormColorController
          control={control}
          error={!!formState.errors.color}
        />
        <Button type="submit">Add</Button>
      </Stack>
    </form >
  );
};
