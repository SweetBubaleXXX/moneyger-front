import {
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import { Mutex } from 'async-mutex';
import { FileJson } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

import { API_PATHS } from '../../features/api/constants';
import {
  JSON_EXPORT_FILENAME,
  MAX_RETRIES,
  POLLING_INTERVAL,
} from '../../features/export/constants';
import { fetchFile } from '../../features/export/fetchFile';

export const ExportJsonSetting = () => {
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const pollingMutex = useMemo(() => new Mutex(), []);

  useEffect(() => {
    let interval: any;
    const poll = () => pollingMutex.runExclusive(
      () => fetchFile(API_PATHS.exportJson, JSON_EXPORT_FILENAME)
    );
    const stopPolling = () => {
      setIsPolling(false);
      return clearInterval(interval);
    };
    if (isPolling && !pollingMutex.isLocked()) {
      poll()
        .then(stopPolling)
        .catch(() => {
          let retries = 0;
          interval = setInterval(() => {
            if (retries > MAX_RETRIES) {
              return stopPolling();
            }
            return !pollingMutex.isLocked() && poll()
              .then(stopPolling)
              .catch(() => { })
              .finally(() => retries++);
          }, POLLING_INTERVAL);
        });
    }
    return () => clearInterval(interval);
  }, [isPolling, pollingMutex]);

  return (
    <ListItem>
      <ListItemButton
        disabled={isPolling}
        onClick={() => setIsPolling(true)}
      >
        <ListItemDecorator>
          {isPolling ? <CircularProgress size="sm" /> : <FileJson />}
        </ListItemDecorator>
        <ListItemContent>
          Export JSON
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
};
