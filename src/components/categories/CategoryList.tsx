import { Reorder } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import {
  filterCategoriesSelector,
  useGetAllCategoriesQuery,
} from '../../features/api/apiSlice';
import { Category } from '../../features/api/types';
import { CategoryWidget } from './CategoryWidget';
import { REORDER_FORM_ID } from './constants';

export type CategoryListProps = {
  filter?: (category: Category) => boolean,
  reorder?: boolean,
  loading?: boolean,
  onSubmitReorder?: (categories: Category[]) => void,
  onItemClick?: (categoryId: number) => void,
}

export const CategoryList = ({
  filter,
  reorder,
  loading,
  onSubmitReorder,
  onItemClick,
}: CategoryListProps) => {
  const categories = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: filterCategoriesSelector(result.data, filter),
      isLoading: result.isFetching,
    }),
  });

  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);

  const isLoading = loading || categories.isLoading;

  useEffect(() => {
    if (categories.data && !isLoading) {
      setOrderedCategories(categories.data);
    }
  }, [categories.data, isLoading]);

  return (
    <>
      <Reorder.Group
        as="div"
        axis="y"
        values={orderedCategories}
        onReorder={setOrderedCategories}
      >
        {
          orderedCategories.map(category =>
            <CategoryWidget
              key={category.id}
              category={category}
              draggable={reorder}
              isLoading={isLoading}
              onClick={onItemClick}
            />
          )
        }
      </Reorder.Group>
      <form
        id={REORDER_FORM_ID}
        onSubmit={e => {
          e.preventDefault();
          onSubmitReorder?.(orderedCategories);
        }}
      />
    </>
  );
};
