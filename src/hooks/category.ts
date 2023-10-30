import {
  filterCategoriesSelector,
  selectCategoryById,
  useGetCategoriesQuery,
} from '../features/api/apiSlice';
import { Category } from '../features/api/types';

export const useCategories = (filter?: (category: Category) => boolean) =>
  useGetCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: filterCategoriesSelector(result.data, filter),
      isLoading: result.isFetching,
    }),
  });

export const useCategoryById = (id?: number) =>
  useGetCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, id),
      isLoading: result.isFetching,
    }),
  });
