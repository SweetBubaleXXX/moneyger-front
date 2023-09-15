import React from 'react';
import { Card, Sheet, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { LoginForm } from '../components/login/LoginForm';
import { RegistrationForm } from '../components/login/RegistrationForm';
import { DefaultToaster } from '../components/Toast';

export default () => {
  return (
    <>
      {DefaultToaster}
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
