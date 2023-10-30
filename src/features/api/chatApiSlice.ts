import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import camelcaseKeys from 'camelcase-keys';
import urlJoin from 'url-join';

import { RootState } from '../../store';
import { BASE_URL, WS_PATHS } from './constants';
import { Message } from './types';

const messagesAdapter = createEntityAdapter<Message>({
  selectId: message => `${message.timestamp}_${message.user}`,
  sortComparer: (a, b) => a.timestamp - b.timestamp,
});

export const chatApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getMessages: builder.query<EntityState<Message>, void>({
      query: () => WS_PATHS.chat,
      transformResponse: (response: Message[]) => messagesAdapter.addMany(
        messagesAdapter.getInitialState(),
        camelcaseKeys(response),
      ),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) {
        let chatUrl: URL;
        if (BASE_URL.startsWith('http')) {
          chatUrl = new URL(WS_PATHS.chat, BASE_URL);
        } else {
          chatUrl = new URL(
            urlJoin(BASE_URL, WS_PATHS.chat),
            document.location.href,
          );
        }
        chatUrl.protocol = chatUrl.protocol.replace('http', 'ws');
        const state = getState() as RootState;
        if (state.auth.accessToken) {
          chatUrl.searchParams.set('token', state.auth.accessToken);
        }
        const ws = new WebSocket(chatUrl);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type !== 'chat.message') { return; }
            updateCachedData((draft) => {
              messagesAdapter.upsertOne(draft, data);
            });
          };
          ws.addEventListener('message', listener);
        } catch { }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});
