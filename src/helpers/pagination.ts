import { PAGE_SIZE } from '../features/api/constants';

export function getPaginationQuery(pageNumber: number) {
  return `limit=${PAGE_SIZE}&offset=${PAGE_SIZE * (pageNumber - 1)}`;
}
