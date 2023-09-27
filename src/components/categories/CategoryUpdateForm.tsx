import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Category, CategoryUpdateRequest } from '../../features/api/types';
import { CategoryFormColorController } from './CategoryFormColorController';
import { BaseCategorySchema, CATEGORY_UPDATE_FORM_ID } from './constants';

export type CategoryUpdateFormProps = {
  onSubmit: (request: CategoryUpdateRequest) => void,
  loading?: boolean,
  disabled?: boolean,
  category?: Category,
  onEdit?: (editing: boolean) => void,
}

export const CategoryUpdateForm = ({
  onSubmit,
  loading,
  disabled,
  category,
  onEdit,
}: CategoryUpdateFormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState,
  } = useForm<CategoryUpdateRequest>(
    { resolver: zodResolver(BaseCategorySchema) }
  );

  const isDisabled = disabled || loading || !category;

  const onReset = () => {
    reset();
    onEdit?.(false);
  };

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

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
      onReset={onReset}
      onChange={() => onEdit?.(true)}
    >
      <Stack spacing={3} padding={2}>
        <Controller
          name="name"
          control={control}
          defaultValue={category?.name}
          render={({ field }) =>
            <Input
              disabled={isDisabled}
              error={!!formState.errors.name}
              {...field}
            />
          }
        />
        <CategoryFormColorController
          control={control}
          defaultValue={category?.color}
          error={!!formState.errors.color}
          disabled={isDisabled}
        />
      </Stack>
    </form >
  );
};
