import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack } from '@mui/joy';
import React from 'react';
import { useForm } from 'react-hook-form';

import { SubcategoryCreateRequest } from '../../api/types';
import { CATEGORY_UPDATE_FORM_ID } from '../../components/categories/constants';
import { useCategoryNameErrorSnackbar } from '../../hooks/snackbar';
import { CategoryFormNameController } from '../CategoryFormNameController';
import { SubcategoryCreateSchema } from '../schemas';

export type SubcategoryCreateFormProps = {
  onSubmit: (request: SubcategoryCreateRequest) => void;
};

export const SubcategoryCreateForm = ({ onSubmit }: SubcategoryCreateFormProps) => {
  const { handleSubmit, control, formState } = useForm<SubcategoryCreateRequest>({
    resolver: zodResolver(SubcategoryCreateSchema),
  });

  useCategoryNameErrorSnackbar(formState.errors.name);

  return (
    <form id={CATEGORY_UPDATE_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={2}>
        <CategoryFormNameController control={control} error={!!formState.errors.name} />
        <Button type="submit">Add</Button>
      </Stack>
    </form>
  );
};
