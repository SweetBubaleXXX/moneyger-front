import React from 'react';
import {
  AccordionGroup,
} from '@mui/joy';
import { useGetAllCategoriesQuery } from '../../features/api/apiSlice';
import { CategoryAccordion, CategoryAccordionProps } from './CategoryAccordion';

export type CategorySelectorProps = Omit<CategoryAccordionProps, 'category'>

export const CategorySelector = (props: CategorySelectorProps) => {
  const { primaryCategories } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      primaryCategories: result.data?.filter(category =>
        props.filter?.(category) ?? true),
    }),
  });

  return (
    <AccordionGroup>
      {
        primaryCategories?.sort((a, b) => b.displayOrder - a.displayOrder).map(
          category => 
            <CategoryAccordion
              key={category.id}
              category={category}
              selected={props.selected}
              onChange={props.onChange}
              filter={props.filter}/>
        )
      }
    </AccordionGroup>
  );
};
