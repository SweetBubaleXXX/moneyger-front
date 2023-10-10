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

export const ImportJsonSetting = () => {
  const [importData, result] = useImportJsonMutation();

  const onError = (message?: string) => toast.error('Import failed', {
    description: message,
  });

  const fileReader = new FileReader();

  fileReader.onload = e => {
    if (!e.target?.result) { return; }
    let fileContent: string;
    if (e.target.result instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      fileContent = decoder.decode(e.target.result);
    } else {
      fileContent = e.target.result;
    }
    try {
      const parsedContent = JSON.parse(fileContent);
      importData(parsedContent);
    } catch {
      onError('Failed to parse file content');
    }
  };

  useEffect(() => {
    if (result.isError) {
      onError();
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Successfully imported');
    }
  }, [result.isSuccess]);

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
          onChange={e => {
            const file = e.target.files?.[0];
            file && fileReader.readAsText(file);
            e.target.value = '';
          }}
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
