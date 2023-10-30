import fileDownload from 'js-file-download';
import urlJoin from 'url-join';

import { store } from '../../store';
import { BASE_URL } from '../api/constants';
import { getAuthHeaders } from '../auth/headers';

export class FileNotReadyError extends Error { }

export const fetchFile = (url: string, filename: string) => {
  const fullUrl = urlJoin(BASE_URL, url);
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