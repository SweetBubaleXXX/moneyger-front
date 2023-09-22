import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CategoryList } from '../components/categories/CategoryList';
import {
  selectCategoryById,
  useGetAllCategoriesQuery,
} from '../features/api/apiSlice';

export type CategoryViewParams = {
  categoryId: string,
}

export const CategoryView = () => {
  const navigate = useNavigate();
  const params = useParams<CategoryViewParams>();
  const categoryId = params.categoryId ? +params.categoryId : undefined;

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, categoryId),
      isLoading: result.isFetching,
    }),
  });

  return (
    <>
      <CategoryList
        filter={category => category.parentCategory === categoryId}
        onItemClick={subcategoryId => navigate(`/categories/${subcategoryId}`)}
      />
    </>
  );
};
