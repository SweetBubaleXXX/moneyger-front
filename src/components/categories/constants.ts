import { z } from 'zod';

export const BaseCategorySchema = z.object({
  name: z.string().max(64).nonempty(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  icon: z.string().max(64).default(''),
});

export const CATEGORY_UPDATE_FORM_ID = 'category-update-form';

export const REORDER_FORM_ID = 'reorder-form';
