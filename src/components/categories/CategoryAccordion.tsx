import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/joy';
import React from 'react';

import { Category } from '../../features/api/types';
import { CategoryIcon } from './CategoryIcon';
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
        color={category.id === selected?.id ? 'primary' : 'neutral'}
      >
        <Stack>
          <CategoryIcon color={category.color}>
            {category.icon}
          </CategoryIcon>
        </Stack>
        <Typography noWrap sx={{
          color: 'inherit',
        }}>
          {category.name}
        </Typography>
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
