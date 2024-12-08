import { Button, Input, Stack } from '@mui/joy';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { TagCreateRequest } from '../../api/types';
import { TAG_CREATE_FORM_ID } from '../../components/categories/constants';

export type TagCreateFormProps = {
  onSubmit: (request: TagCreateRequest) => void;
  loading?: boolean;
};

export const TagCreateForm = ({ onSubmit, loading }: TagCreateFormProps) => {
  const { handleSubmit, control } = useForm<TagCreateRequest>();

  return (
    <form id={TAG_CREATE_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={2}>
        <Controller
          name="name"
          control={control}
          defaultValue={''}
          disabled={loading}
          render={({ field }) => <Input placeholder="Название тега" {...field} />}
        />
        <Button type="submit" loading={loading}>
          Добавить
        </Button>
      </Stack>
    </form>
  );
};
