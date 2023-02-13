import React from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from '@o-clock-dev/mooncake';
import localeFR from 'src/utils/localeFR';
import { HelmetProvider } from 'react-helmet-async';
import '@o-clock-dev/mooncake/dist/style.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query';

import App from 'src/components/App';
import KeycloakProvider from 'src/commons/KeycloakProvider';
import MessagesProvider from 'src/commons/MessagesProvider';

import ErrorBoundary from 'src/components/ErrorBoundary';
import getKeycloakInstance from 'src/commons/Keycloak';
import queryClient from 'src/queryClient';

import packageJSON from '../package.json';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: packageJSON.version,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  normalizeDepth: 10, // Or however deep you want your state context to be.
});

const container = document.querySelector('#root');
const root = createRoot(container);

const Application = (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <RecoilRoot>
            <ConfigProvider locale={localeFR}>
              <MessagesProvider>
                <KeycloakProvider keycloakInstance={getKeycloakInstance()}>
                  <App />
                  <ReactQueryDevtools initialIsOpen={false} />
                </KeycloakProvider>
              </MessagesProvider>
            </ConfigProvider>
          </RecoilRoot>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

root.render(Application);
