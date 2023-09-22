import { Reorder } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import {
  filterCategoriesSelector,
  useGetAllCategoriesQuery,
} from '../../features/api/apiSlice';
import { Category } from '../../features/api/types';
import { CategoryWidget } from './CategoryWidget';

export type CategoryListProps = {
  filter?: (category: Category) => boolean,
  reorder?: boolean,
  onReorder?: (categories: Category[]) => void,
  onItemClick?: (categoryId: number) => void,
}

export const CategoryList = ({
  filter,
  reorder,
  onReorder,
  onItemClick,
}: CategoryListProps) => {
  const categories = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: filterCategoriesSelector(result.data, filter),
      isLoading: result.isFetching,
    }),
  });

  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categories.data) {
      setOrderedCategories(categories.data);
    }
  }, [categories.data]);

  useEffect(() => {
    onReorder?.(orderedCategories);
  }, [onReorder, orderedCategories]);

  return (
    <Reorder.Group
      as="div"
      axis="y"
      values={orderedCategories}
      onReorder={setOrderedCategories}
    >
      {orderedCategories.map(category =>
        <CategoryWidget
          key={category.id}
          category={category}
          draggable={reorder}
          isLoading={categories.isLoading}
          onClick={onItemClick}
        />
      )}
    </Reorder.Group>
  );
};
