// @ts-ignore
import compareUrls from 'compare-urls';
import urlJoin from 'url-join';

import { RootState } from '../../store';
import { BASE_URL, WS_PATHS } from './constants';

export const createGetSocket = () => {
  let ws: WebSocket | undefined;
  return (url: string | URL) =>
    // eslint-disable-next-line consistent-return
    new Promise<WebSocket>(resolve => {
      if (!ws || !compareUrls(url.toString(), ws.url)) {
        ws = new WebSocket(url);
      }
      if (ws.readyState === WebSocket.OPEN) {
        return resolve(ws);
      }
      const onSocketReady = () => {
        if (!ws) { return; }
        ws.removeEventListener('open', onSocketReady);
        resolve(ws);
      };
      ws.addEventListener('open', onSocketReady);
      // eslint-disable-next-line space-before-function-paren
      ws.addEventListener('close', function () {
        if (this.url === ws?.url) {
          ws = undefined;
        }
      });
    });
};

export const getChatWebsocketUrl = (state: RootState) => {
  let chatUrl: URL;
  if (BASE_URL.startsWith('http')) {
    chatUrl = new URL(WS_PATHS.chat, BASE_URL);
  } else {
    chatUrl = new URL(
      urlJoin(BASE_URL, WS_PATHS.chat),
      document.location.origin,
    );
  }
  chatUrl.protocol = chatUrl.protocol.replace('http', 'ws');
  if (state.auth.accessToken) {
    chatUrl.searchParams.set('token', state.auth.accessToken);
  }
  return chatUrl;
};
