import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import Router from './pages/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Provider store={store}>
        <CssVarsProvider>
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
          <Router />
        </CssVarsProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
