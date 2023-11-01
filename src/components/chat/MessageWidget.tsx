import { Card, CardContent, Typography } from '@mui/joy';
import React from 'react';

import { Message } from '../../features/api/types';

export type MessageProps = {
  fromSelf?: boolean,
  children: Message,
}

export const MessageWidget = ({
  fromSelf,
  children,
}: MessageProps) => {
  return (
    <Card variant={fromSelf ? 'solid' : 'soft'}>
      <CardContent>
        <Typography>
          {children.messageText}
        </Typography>
      </CardContent>
    </Card>
  );
};
