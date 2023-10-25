import { Button } from '@mui/joy';
import React from 'react';

import { API_PATHS } from '../../features/api/constants';
import { CSV_EXPORT_FILENAME } from '../../features/export/constants';
import { downloadFile } from '../../features/export/downloadFile';

export const ExportCsvButton = () => {
  return (
    <Button
      variant="soft"
      color="neutral"
      onClick={() => downloadFile(API_PATHS.exportCsv, CSV_EXPORT_FILENAME)}
    >
      Export CSV
    </Button>
  );
};
