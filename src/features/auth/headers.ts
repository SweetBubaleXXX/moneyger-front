import Cookies from 'js-cookie';

import { AuthState } from '../api/types';

export type AuthHeaders = {
  'x-csrftoken'?: string,
  'authorization'?: string,
}

export const getAuthHeaders = (state: AuthState): AuthHeaders => {
  const csrfToken = Cookies.get('csrftoken');
  const token = state.accessToken;
  const authHeader = token && `Bearer ${token}`;
  return {
    'x-csrftoken': csrfToken,
    'authorization': authHeader,
  };
};