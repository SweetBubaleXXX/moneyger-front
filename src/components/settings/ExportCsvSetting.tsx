import {
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import { Sheet } from 'lucide-react';
import React from 'react';

import { API_PATHS } from '../../api/constants';
import { CSV_EXPORT_FILENAME } from '../../export/constants';
import { fetchFile } from '../../export/fetchFile';

export const ExportCsvSetting = () => {
  return (
    <ListItem>
      <ListItemButton
        onClick={() => fetchFile(API_PATHS.exportCsv, CSV_EXPORT_FILENAME)}
      >
        <ListItemDecorator>
          <Sheet />
        </ListItemDecorator>
        <ListItemContent>
          Export CSV
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
};
