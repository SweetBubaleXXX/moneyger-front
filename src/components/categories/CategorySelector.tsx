import {
  AccordionGroup,
} from '@mui/joy';
import React from 'react';

import { useGetAllCategoriesQuery } from '../../features/api/apiSlice';
import { Category } from '../../features/api/types';
import { CategoryAccordion, CategoryAccordionProps } from './CategoryAccordion';

export type CategorySelectorProps = Omit<CategoryAccordionProps, 'category'> & {
  filter?: (category: Category) => boolean,
}

export const CategorySelector = ({
  selected,
  onChange,
  filter,
}: CategorySelectorProps) => {
  const { primaryCategories } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      primaryCategories: result.data?.filter(category =>
        filter?.(category) ?? true),
    }),
  });

  return (
    <AccordionGroup>
      {
        primaryCategories?.sort((a, b) => a.displayOrder - b.displayOrder).map(
          category =>
            <CategoryAccordion
              key={category.id}
              category={category}
              selected={selected}
              onChange={onChange}
            />
        )
      }
    </AccordionGroup>
  );
};
