import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Stack,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { SubcategoryCreateRequest } from '../../features/api/types';
import { toastCategoryNameError } from '../../helpers/forms';
import { CategoryFormColorController } from './CategoryFormColorController';
import { CategoryFormNameController } from './CategoryFormNameController';
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

  useEffect(
    () => toastCategoryNameError(formState.errors.name),
    [formState.errors.name]
  );

  return (
    <form
      id={CATEGORY_UPDATE_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3} padding={2}>
        <CategoryFormNameController
          control={control}
          error={!!formState.errors.name}
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
