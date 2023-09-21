import { Reorder } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import {
  filterCategoriesSelector,
  useGetAllCategoriesQuery,
} from '../../features/api/apiSlice';
import { Category } from '../../features/api/types';
import { CategoryWidget } from './CategoryWidget';

export type CategoryListProps = {
  filter?: (category: Category) => boolean
}

export const CategoryList = (props: CategoryListProps) => {
  const categories = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: filterCategoriesSelector(result.data, props.filter),
      isLoading: result.isFetching,
    }),
  });
  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (categories.data) {
      setOrderedCategories(categories.data);
    }
  }, [categories.data]);

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
          draggable={true}
          isLoading={categories.isLoading}
        />
      )}
    </Reorder.Group>
  );
};
