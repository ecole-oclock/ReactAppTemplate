import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';

import App from 'src/components/App';
import KeycloakProvider from 'src/commons/KeycloakProvider';
import MessagesProvider from 'src/commons/MessagesProvider';

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
  <RecoilRoot>
    <BrowserRouter basename="/">
      <MessagesProvider>
        <KeycloakProvider>
          <React.StrictMode>
            <Suspense fallback={<h1>Chargement de la page</h1>}>
              <App />
            </Suspense>
          </React.StrictMode>
        </KeycloakProvider>
      </MessagesProvider>
    </BrowserRouter>
  </RecoilRoot>
);

root.render(Application);
