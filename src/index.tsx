import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ToastProvider from 'providers/ToastProvider';
import store, { persistor } from 'store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { QueryProvider } from 'providers/query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <QueryProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#01B1EC',
                },
              }}
            >
              <App />
            </ConfigProvider>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </QueryProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
