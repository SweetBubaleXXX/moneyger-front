import {
  Button,
  Input,
  ListItem,
  ListItemContent,
} from '@mui/joy';
import { UploadCloud } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useImportJsonMutation } from '../../features/api/apiSlice';
import { createFileReader } from '../../features/export/fileReader';
import { useSuccessSnackbar } from '../../hooks/snackbar';

export const ImportJsonSetting = () => {
  const [importData, result] = useImportJsonMutation();

  const onError = (message?: string) => toast.error('Import failed', {
    description: message,
  });

  const fileReader = createFileReader(
    importData,
    () => onError('Failed to parse file content'),
  );

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && fileReader.readAsText(file);
    e.target.value = '';
  };

  useEffect(() => {
    if (result.isError) {
      onError();
    }
  }, [result.isError]);

  useSuccessSnackbar('Successfully imported', result);

  return (
    <ListItem endAction={
      <Button
        component="label"
        variant="outlined"
        color="neutral"
        startDecorator={<UploadCloud />}
        fullWidth
      >
        Upload File
        <Input
          type="file"
          slotProps={{
            input: { accept: 'application/json' },
          }}
          onChange={onFileSelected}
          sx={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: '1px',
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: '1px',
          }}
        />
      </Button>}>
      <ListItemContent>
        Import JSON
      </ListItemContent>
    </ListItem>
  );
};
