import fileDownload from 'js-file-download';

import { store } from '../../store';
import { getAuthHeaders } from '../auth/headers';

export class FileNotReadyError extends Error { }

export const downloadFile = (url: string, filename: string) => {
  const fullUrl = new URL(url, process.env.REACT_APP_API_URL).toString();
  const headers = getAuthHeaders(store.getState().auth);
  return fetch(fullUrl, {
    method: 'GET',
    headers: headers,
  })
    .then(res => {
      if (res.status === 202) {
        throw new FileNotReadyError();
      }
      return res.blob();
    })
    .then(blob => fileDownload(blob, filename));
};