/* eslint-disable react/prop-types */
/* eslint-disable global-require */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('keycloak-js', () => {
  const keycloakTokensAdmin = require('./keycloakTokensAdmin.json');
  return class Keycloak {
    constructor() {
      this.authenticated = false;
      this.initialized = false;
      this.realm = 'oclock';
      this.realmAccess = { roles: [] };
      this.idToken = keycloakTokensAdmin.idToken;
      this.refreshToken = keycloakTokensAdmin.refreshToken;
      this.token = keycloakTokensAdmin.token;
    }

    init = jest.fn(() => {
      this.initialized = true;
      this.onEvent?.('onReady');
      this.onTokens?.(this.tokens);
      return Promise.resolve();
    });

    updateToken = jest.fn(() => Promise.resolve());

    hasRealmRole = jest.fn(() => false);

    hasResourceRole = jest.fn((roles = []) => {
      if (Array.isArray(roles)) {
        return roles.some((role) => this.realmAccess.roles.includes(role));
      }
      return this.realmAccess.roles.includes(roles);
    });

    login = jest.fn(() => {
      this.authenticated = true;
    });

    logout = jest.fn(() => {
      this.authenticated = false;
    });

    get tokens() {
      return {
        token: this.token,
        refreshToken: this.refreshToken,
        idToken: this.idToken,
      };
    }

    set tokens(tokens) {
      this.token = tokens?.token || null;
      this.refreshToken = tokens?.refreshToken || null;
      this.idToken = tokens?.idToken || null;
      this.onTokens({
        token: this.token,
        refreshToken: this.refreshToken,
        idToken: this.idToken,
      });
    }

    __mockLogout = jest.fn(() => {
      this.realmAccess = {};
      this.logout();
      this.tokens = null;
      this.onEvent('onLogout');
    });

    __mockLogin = jest.fn(() => {
      this.login();
      this.tokens = keycloakTokensAdmin;
      this.onEvent('onAuthSuccess');
    });

    __mockSetRole = jest.fn((roles = []) => {
      this.realmAccess = { roles: [...roles] };
    });
  };
});

jest.mock('@react-keycloak/web', () => {
  const { useEffect } = require('react');
  const { ReactKeycloakProvider, ...originalModule } = jest.requireActual('@react-keycloak/web');

  const module = {
    ...originalModule,
    ReactKeycloakProvider: ({ children, authClient, onTokens, onEvent, ...props }) => {
      authClient.onTokens = onTokens;
      authClient.onEvent = onEvent;
      useEffect(() => {
        authClient.init();
      }, []);

      return (
        <ReactKeycloakProvider
          authClient={authClient}
          onTokens={onTokens}
          onEvent={onEvent}
          {...props}
        >
          {children}
        </ReactKeycloakProvider>
      );
    },
  };

  return module;
});
