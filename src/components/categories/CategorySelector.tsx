import {
  AccordionGroup,
} from '@mui/joy';
import React from 'react';

import { Category } from '../../features/api/types';
import { useCategories } from '../../hooks/category';
import { CategoryAccordion, CategoryAccordionProps } from './CategoryAccordion';

export type CategorySelectorProps = Omit<CategoryAccordionProps, 'category'> & {
  filter?: (category: Category) => boolean,
}

export const CategorySelector = ({
  selected,
  onChange,
  filter,
}: CategorySelectorProps) => {
  const categories = useCategories(filter);

  return (
    <AccordionGroup>
      {
        categories.data?.sort((a, b) => a.displayOrder - b.displayOrder).map(
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
