import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Stack,
} from '@mui/joy';
import React from 'react';
import { useForm } from 'react-hook-form';

import { BaseCategorySchema } from '../../features/api/schemas';
import { SubcategoryCreateRequest } from '../../features/api/types';
import { useCategoryNameErrorSnackbar } from '../../hooks/snackbar';
import { CATEGORY_UPDATE_FORM_ID } from '../categories/constants';
import {
  CategoryFormColorController,
} from './CategoryFormColorController';
import { CategoryFormIconController } from './CategoryFormIconController';
import {
  CategoryFormNameController,
} from './CategoryFormNameController';

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

  useCategoryNameErrorSnackbar(formState.errors.name);

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
        <CategoryFormIconController
          control={control}
          error={!!formState.errors.icon}
        />
        <Button type="submit">Add</Button>
      </Stack>
    </form >
  );
};
