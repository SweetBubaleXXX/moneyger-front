import { Button } from '@mui/joy';
import React, { useEffect, useState } from 'react';

import { API_PATHS } from '../../features/api/constants';
import {
  JSON_EXPORT_FILENAME,
  MAX_RETRIES,
  POLLING_INTERVAL,
} from '../../features/export/constants';
import {
  downloadFile,
  FileNotReadyError,
} from '../../features/export/downloadFile';

export const ExportJsonButton = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      const poll = () =>
        downloadFile(API_PATHS.exportJson, JSON_EXPORT_FILENAME);
      poll().then(() => setIsGenerating(false)).catch(() => {
        let retries = 0;
        interval = setInterval(
          // eslint-disable-next-line consistent-return
          () => {
            if (retries > MAX_RETRIES) {
              setIsGenerating(false);
              return clearInterval(interval);
            }
            poll()
              .then(() => setIsGenerating(false))
              .catch(e => {
                if (!(e instanceof FileNotReadyError)) {
                  setIsGenerating(false);
                }
              });
            retries++;
          },
          POLLING_INTERVAL
        );
      });
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <Button
      loading={isGenerating}
      variant="soft"
      color="neutral"
      onClick={() => setIsGenerating(true)}
    >
      Export JSON
    </Button>
  );
};
