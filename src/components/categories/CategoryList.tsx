import { Box } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { Reorder } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Category } from '../../features/api/types';
import { useCategories } from '../../hooks/category';
import { CategoryWidget } from './CategoryWidget';
import { REORDER_FORM_ID } from './constants';

export type CategoryListProps = {
  filter?: (category: Category) => boolean,
  reorder?: boolean,
  loading?: boolean,
  onSubmitReorder?: (categories: Category[]) => void,
  onItemClick?: (categoryId: number) => void,
  sx?: SxProps,
}

export const CategoryList = ({
  filter,
  reorder,
  loading,
  onSubmitReorder,
  onItemClick,
  sx,
}: CategoryListProps) => {
  const categories = useCategories(filter);

  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);

  const isLoading = loading || categories.isLoading;

  useEffect(() => {
    if (categories.data && !isLoading) {
      setOrderedCategories(categories.data);
    }
  }, [categories.data, isLoading]);

  return (
    <Box
      maxWidth={450}
      px={2}
      mx="auto"
      sx={sx}
    >
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
    </Box>
  );
};
