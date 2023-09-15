import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/joy';
import React from 'react';

import { Category } from '../../features/api/types';
import { CategorySelector } from './CategorySelector';

export type CategoryAccordionProps = {
  category: Category,
  selected?: Category,
  onChange?: (category: Category) => void,
  filter?: (category: Category) => boolean,
}

export const CategoryAccordion = (props: CategoryAccordionProps) => {
  return (
    <Accordion
      key={props.category.id}
      onChange={() => props.onChange?.(props.category)}
    >
      <AccordionSummary
        color={
          props.category.id === props.selected?.id ? 'primary' : 'neutral'
        }
      >
        {props.category.name}
      </AccordionSummary>
      <AccordionDetails>
        <CategorySelector
          selected={props.selected}
          onChange={(category) => props.onChange?.(category)}
          filter={
            subcategory => subcategory.parentCategory === props.category.id
          }
        />
      </AccordionDetails>
    </Accordion>
  );
};
