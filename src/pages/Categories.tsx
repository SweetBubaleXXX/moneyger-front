import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Skeleton,
  Stack,
  Typography,
} from '@mui/joy';
import { Reorder } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { CategoryWidget } from '../components/categories/CategoryWidget';
import {
  selectCategoriesByParentId,
  useGetAllCategoriesQuery,
} from '../features/api/apiSlice';
import { Category } from '../features/api/types';

export const Categories = () => {
  const { primaryCategories, isLoading } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      primaryCategories: selectCategoriesByParentId(result.data, null),
      isLoading: result.isFetching,
    }),
  });
  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (primaryCategories) {
      setOrderedCategories(primaryCategories);
    }
  }, [primaryCategories]);

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
          isLoading={isLoading}
        />
      )}
    </Reorder.Group>
  );
};
