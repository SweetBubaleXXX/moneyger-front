import { Stack } from '@mui/joy';
import React from 'react';

import { MessageWidget } from '../components/chat/MessageWidget';
import {
  messagesSelector,
  useGetMessagesQuery,
} from '../features/api/chatApiSlice';

export const Chat = () => {
  const messages = useGetMessagesQuery();

  return (
    <>
      <Stack>
        <Stack>
          {
            messages.data && messagesSelector
              .selectAll(messages.data)
              .map(
                message =>
                  <MessageWidget>
                    {message}
                  </MessageWidget>
              )
          }
        </Stack>
      </Stack>
    </>
  );
};
