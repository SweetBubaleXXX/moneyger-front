import { Box, Stack } from '@mui/joy';
import React from 'react';

import { ChatInput } from '../components/chat/ChatInput';
import { MessageWidget } from '../components/chat/MessageWidget';
import { ChatTopbar } from '../components/toolbars/ChatTopbar';
import {
  messagesSelector,
  useGetMessagesQuery,
} from '../features/api/chatApiSlice';

export const Chat = () => {
  const messages = useGetMessagesQuery();

  return (
    <>
      <ChatTopbar onReload={messages.refetch} />
      <Stack
        direction="column"
        height="calc(100vh - 46px)"
        width="100%"
        alignItems={{ sm: 'center' }}
      >
        <Box
          display="flex"
          flexDirection="column-reverse"
          flex={1}
          minWidth={theme => ({ sm: theme.breakpoints.values.sm })}
          maxWidth="sm"
          px={3}
          py={2}
          sx={{
            overflowY: 'scroll',
          }}
        >
          <Stack spacing={2} justifyContent="flex-end">
            {
              messages.data && messagesSelector
                .selectAll(messages.data)
                .map(
                  (message, index) =>
                    <MessageWidget key={index}>
                      {message}
                    </MessageWidget>
                )
            }
          </Stack>
        </Box>
        <Stack
          px={2}
          pb={3}
          minWidth={theme => ({ sm: theme.breakpoints.values.sm })}
        >
          <ChatInput />
        </Stack>
      </Stack>
    </>
  );
};
