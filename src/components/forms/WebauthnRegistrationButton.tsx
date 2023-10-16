import { Button, DialogContent, Input, Modal, ModalDialog } from '@mui/joy';
import { Fingerprint } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useGetWebauthnSignupOptionsMutation,
  useWebauthnSignupMutation,
} from '../../features/api/apiSlice';
import { GetWebauthnSignupOptionsRequest } from '../../features/api/types';
import { WebauthnRegistrationForm } from './WebauthnRegistrationForm';

export const WebauthnRegistrationButton = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outlined"
        startDecorator={<Fingerprint />}
        onClick={() => setModalOpen(true)}
      >
        Register with WebAuthn
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <DialogContent>
            <WebauthnRegistrationForm />
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};
