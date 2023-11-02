import { Card, CardContent, Chip, Stack, Tooltip, Typography } from '@mui/joy';
import moment from 'moment';
import React from 'react';

import { useGetAccountQuery } from '../../features/api/apiSlice';
import { Message } from '../../features/api/types';

export type MessageProps = {
  children: Message,
}

export const MessageWidget = ({
  children,
}: MessageProps) => {
  const account = useGetAccountQuery();
  const fromSelf = account.data && children.user === account.data?.username;

  return (
    <Stack
      maxWidth="95%"
      alignSelf={fromSelf ? 'flex-end' : 'flex-start'}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={1}
        sx={{ mb: 0.25 }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          overflow="hidden"
          spacing={0.4}
        >
          <Tooltip
            title={children.user}
            size="sm"
            placement="top"
            variant="soft"
            arrow
          >
            <Typography level="body-xs" noWrap>
              {!fromSelf && children.user}
            </Typography>
          </Tooltip>
          {
            !fromSelf && children.isAdmin &&
            <Chip size="sm" color="success">Admin</Chip>
          }
        </Stack>
        <Typography level="body-xs" fontWeight={400} noWrap>
          {moment.unix(children.timestamp).format('DD MMM LT')}
        </Typography>
      </Stack>
      <Card
        size="sm"
        variant={fromSelf ? 'outlined' : 'soft'}
        color={fromSelf ? 'primary' : 'neutral'}
      >
        <CardContent>
          <Typography whiteSpace="pre-wrap" sx={{ wordBreak: 'break-word' }}>
            {children.messageText}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};
