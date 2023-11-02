import { IconButton, Stack, Textarea } from '@mui/joy';
import { SendHorizontal } from 'lucide-react';
import React, { useState } from 'react';

import { useSendMessageMutation } from '../../features/api/chatApiSlice';

export const ChatInput = () => {
  const [sendMessage, result] = useSendMessageMutation();
  const [message, setMessage] = useState<string>('');
  const trimmedMessage = message.trim();

  const onSubmit = () => {
    if (!trimmedMessage) { return; }
    sendMessage({ message: trimmedMessage });
    setMessage('');
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
    >
      <Stack width="100%">
        <Textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write a message..."
          maxRows={3}
        />
      </Stack>
      <IconButton
        variant="solid"
        color="primary"
        disabled={result.isLoading || !trimmedMessage}
        onClick={onSubmit}
      >
        <SendHorizontal />
      </IconButton>
    </Stack>
  );
};
