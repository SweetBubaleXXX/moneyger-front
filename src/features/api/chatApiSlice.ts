import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import camelcaseKeys from 'camelcase-keys';
import urlJoin from 'url-join';

import { RootState } from '../../store';
import { API_PATHS, BASE_URL, WS_PATHS } from './constants';
import { baseQueryWithReauth } from './queries';
import { Message } from './types';

const messagesAdapter = createEntityAdapter<Message>({
  selectId: message => message.messageId,
  sortComparer: (a, b) => a.timestamp - b.timestamp,
});

export const messagesSelector = messagesAdapter.getSelectors();

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getMessages: builder.query<EntityState<Message>, void>({
      query: () => API_PATHS.messages,
      transformResponse: (response: Message[]) => messagesAdapter.addMany(
        messagesAdapter.getInitialState(),
        camelcaseKeys(response),
      ),
      onCacheEntryAdded: async (
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
      ) => {
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
            const messageBody = JSON.parse(event.data);
            const parsedMessage = camelcaseKeys(messageBody);
            if (parsedMessage.type !== 'chat.message') { return; }
            updateCachedData((draft) => {
              messagesAdapter.upsertOne(draft, parsedMessage);
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

export const { useGetMessagesQuery } = chatApi;
