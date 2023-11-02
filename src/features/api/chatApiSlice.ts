import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import camelcaseKeys from 'camelcase-keys';

import { createGetSocket, getChatWebsocketUrl } from '../../helpers/chat';
import { RootState } from '../../store';
import { API_PATHS } from './constants';
import { baseQueryWithReauth } from './queries';
import { Message, OutgoingMessage } from './types';

const getSocket = createGetSocket();

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
        let ws: WebSocket | undefined;
        try {
          await cacheDataLoaded;
          const wsUrl = getChatWebsocketUrl(getState() as RootState);
          ws = await getSocket(wsUrl);
          ws.onmessage = event => {
            const messageBody = JSON.parse(event.data);
            const parsedMessage = camelcaseKeys(messageBody);
            if (parsedMessage.type !== 'chat.message') { return; }
            updateCachedData((draft) => {
              messagesAdapter.upsertOne(draft, parsedMessage);
            });
          };
        } catch { }
        await cacheEntryRemoved;
        ws?.close();
      },
    }),
    sendMessage: builder.mutation<void, OutgoingMessage>({
      queryFn: async (message, { getState }) => {
        const wsUrl = getChatWebsocketUrl(getState() as RootState);
        const ws = await getSocket(wsUrl);
        ws.send(JSON.stringify(message));
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
