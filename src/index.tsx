import './index.css';

import { CssBaseline, GlobalStyles } from '@mui/joy';
import {
  CssVarsProvider,
  extendTheme,
  StyledEngineProvider,
} from '@mui/joy/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { DefaultToaster } from './components/Toast';
import { ErrorPage } from './pages/ErrorPage';
import { Router } from './pages/Router';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

const theme = extendTheme({
  components: {
    JoySkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#c0d7d9',
          100: '#a5cfcb',
          200: '#6acabc',
          300: '#3eb3a1',
          400: '#1ba6a1',
          500: '#0aa391',
          600: '#14807d',
          700: '#268078',
          800: '#2f6868',
          900: '#2f4547',
          plainHoverBg: 'var(--joy-palette-primary-900)',
          softBg: 'var(--joy-palette-primary-900)',
        },
        neutral: {
          50: '#fefefe',
          100: '#f6f6f6',
          200: '#dce4e6',
          300: '#d5d9de',
          400: '#a5a9ad',
          500: '#676d73',
          600: '#5e6469',
          700: '#32383e',
          800: '#181b1c',
          900: '#0c0d0d',
        },
      },
    },
    light: {
      palette: {
        primary: {
          50: '#d5e7e8',
          100: '#aed4d0',
          200: '#6acabc',
          300: '#3eb3a1',
          400: '#1ba6a1',
          500: '#0aa391',
          600: '#14807d',
          700: '#268078',
          800: '#2f6868',
          900: '#2f4547',
          plainHoverBg: 'var(--joy-palette-primary-50)',
        },
        neutral: {
          50: '#fefefe',
          100: '#f6f6f6',
          200: '#dce4e6',
          300: '#d5d9de',
          400: '#a5a9ad',
          500: '#676d73',
          600: '#5e6469',
          700: '#32383e',
          800: '#181b1c',
          900: '#0c0d0d',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <CssVarsProvider theme={theme} defaultMode="system">
            <CssBaseline />
            <GlobalStyles
              styles={{
                '& .lucide': {
                  color: 'var(--Icon-color)',
                  margin: 'var(--Icon-margin)',
                  fontSize: 'var(--Icon-fontSize, 20px)',
                  width: '1em',
                  height: '1em',
                },
              }}
            />
            {DefaultToaster}
            <Router />
          </CssVarsProvider>
        </StyledEngineProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
