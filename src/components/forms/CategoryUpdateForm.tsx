import { zodResolver } from '@hookform/resolvers/zod';
import {
  Divider,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { BaseCategorySchema } from '../../features/api/schemas';
import { Category, CategoryUpdateRequest } from '../../features/api/types';
import { toastCategoryNameError } from '../../helpers/forms';
import { CATEGORY_UPDATE_FORM_ID } from '../categories/constants';
import {
  CategoryFormColorController,
} from './CategoryFormColorController';
import { CategoryFormIconController } from './CategoryFormIconController';
import {
  CategoryFormNameController,
} from './CategoryFormNameController';

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
      <Stack spacing={2} padding={2}>
        <CategoryFormNameController
          control={control}
          error={!!formState.errors.name}
          disabled={isDisabled}
          defaultValue={category?.name}
        />
        <Divider />
        <CategoryFormColorController
          control={control}
          error={!!formState.errors.color}
          disabled={isDisabled}
          defaultValue={category?.color}
        />
        <CategoryFormIconController
          control={control}
          error={!!formState.errors.icon}
          disabled={isDisabled}
          defaultValue={category?.icon}
          onEdit={() => onEdit?.(true)}
        />
      </Stack>
    </form >
  );
};
