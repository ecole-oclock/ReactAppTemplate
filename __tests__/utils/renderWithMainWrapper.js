/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from '@o-clock-dev/mooncake';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import KeycloakProvider from 'src/commons/KeycloakProvider';
import MessagesProvider from 'src/commons/MessagesProvider';
import localeFR from 'src/utils/localeFR';
import defaultKeycloakInstance from 'src/commons/Keycloak';

export default (Component, config = {
  queryStaleTime: 1000 * 60,
  baseURL: '/',
  keycloakInstance: defaultKeycloakInstance(),
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      staleTime: config.queryStaleTime,
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => { },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <KeycloakProvider keycloakInstance={config.keycloakInstance}>
          <HelmetProvider>
            <ConfigProvider locale={localeFR}>
              <BrowserRouter basename={config.baseURL}>
                <MessagesProvider>
                  {Component}
                </MessagesProvider>
              </BrowserRouter>
            </ConfigProvider>
          </HelmetProvider>
        </KeycloakProvider>
      </RecoilRoot>
    </QueryClientProvider>,
  );
};
