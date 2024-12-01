import { PAGE_SIZE } from './constants';

export const getPaginationQuery = (pageNumber: number) => {
  return `limit=${PAGE_SIZE}&offset=${PAGE_SIZE * (pageNumber - 1)}`;
};
