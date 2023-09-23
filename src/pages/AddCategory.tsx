import React from 'react';

import {
  CategoryCreateForm
}
  from '../components/categories/CategoryCreateForm';
import { useCreateCategoryMutation } from '../features/api/apiSlice';

export const AddCategory = () => {
  const [createCategory, result] = useCreateCategoryMutation();

  return (
    <>
      <CategoryCreateForm
        onSubmit={createCategory}
      />
    </>
  );
};
