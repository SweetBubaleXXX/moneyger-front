import { useParams } from 'react-router-dom';

import { CategoryViewParams } from '../pages/CategoryView';

export const useCategoryIdParam = () => {
  const { categoryId } = useParams<CategoryViewParams>();
  return categoryId ? +categoryId : undefined;
};
