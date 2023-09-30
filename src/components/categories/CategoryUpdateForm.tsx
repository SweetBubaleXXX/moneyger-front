import { zodResolver } from '@hookform/resolvers/zod';
import {
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { BaseCategorySchema } from '../../features/api/schemas';
import { Category, CategoryUpdateRequest } from '../../features/api/types';
import { toastCategoryNameError } from '../../helpers/forms';
import { CategoryFormColorController } from './CategoryFormColorController';
import { CategoryFormNameController } from './CategoryFormNameController';
import { CATEGORY_UPDATE_FORM_ID } from './constants';

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

  useEffect(
    () => toastCategoryNameError(formState.errors.name),
    [formState.errors.name]
  );

  return (
    <form
      id={CATEGORY_UPDATE_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      onChange={() => onEdit?.(true)}
    >
      <Stack spacing={3} padding={2}>
        <CategoryFormNameController
          disabled={isDisabled}
          control={control}
          defaultValue={category?.name}
          error={!!formState.errors.name}
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
