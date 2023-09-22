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
}

export const CategoryAccordion = ({
  category,
  selected,
  onChange,
}: CategoryAccordionProps) => {
  return (
    <Accordion
      key={category.id}
      onChange={() => onChange?.(category)}
    >
      <AccordionSummary
        color={
          category.id === selected?.id ? 'primary' : 'neutral'
        }
      >
        {category.name}
      </AccordionSummary>
      <AccordionDetails>
        <CategorySelector
          selected={selected}
          onChange={(category) => onChange?.(category)}
          filter={
            subcategory => subcategory.parentCategory === category.id
          }
        />
      </AccordionDetails>
    </Accordion>
  );
};
