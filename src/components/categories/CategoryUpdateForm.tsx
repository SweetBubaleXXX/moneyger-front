import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Category, CategoryUpdateRequest } from '../../features/api/types';
import { BaseCategorySchema, CATEGORY_UPDATE_FORM_ID } from './constants';

export type CategoryUpdateFormProps = {
  onSubmit: (request: CategoryUpdateRequest) => void,
  disabled?: boolean,
  category?: Category,
  onEdit?: () => void,
}

export const CategoryUpdateForm = ({
  onSubmit,
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

  const isDisabled = disabled || !category;

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  return (
    <form
      id={CATEGORY_UPDATE_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      onChange={onEdit}
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
        <Controller
          name="color"
          control={control}
          defaultValue={category?.color}
          render={({ field }) =>
            <FormControl error={!!formState.errors.color}>
              <FormLabel>Color</FormLabel>
              <Input
                disabled={isDisabled}
                type="color"
                variant="plain"
                {...field}
              />
            </FormControl>
          }
        />
      </Stack>
    </form >
  );
};
