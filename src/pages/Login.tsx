import { Card, Sheet, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import React from 'react';

import { LoginForm } from '../components/forms/LoginForm';
import { RegistrationForm } from '../components/forms/RegistrationForm';

export const Login = () => {
  return (
    <>
      <Sheet sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      >
        <Card variant="outlined" sx={{ width: 300 }}>
          <Tabs>
            <TabList tabFlex={1}>
              <Tab>Login</Tab>
              <Tab>Registration</Tab>
            </TabList>
            <TabPanel value={0}>
              <LoginForm />
            </TabPanel>
            <TabPanel value={1}>
              <RegistrationForm />
            </TabPanel>
          </Tabs>
        </Card>
      </Sheet>
    </>
  );
};
