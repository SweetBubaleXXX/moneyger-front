import fileDownload from 'js-file-download';

import { store } from '../../store';
import { getAuthHeaders } from '../auth/headers';

export const downloadFile = (url: string, filename: string) => {
  const fullUrl = new URL(url, process.env.REACT_APP_API_URL).toString();
  const headers = getAuthHeaders(store.getState().auth);
  fetch(fullUrl, {
    method: 'GET',
    headers: headers,
  })
    .then(res => res.blob())
    .then(blob => fileDownload(blob, filename));
};