/*
 * Package Import
 */
import React, { useState, useEffect, useCallback } from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import jwtDecode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';

/*
 * Local Import
 */
import ApiCaller from 'src/commons/ApiCaller';
import { withMessages } from 'src/commons/MessagesProvider';
import { identitySelector } from '@recoil/auth';
import PropTypes from 'prop-types';
import keycloakInstance from './Keycloak';

export const isAuthorized = (keycloak) => (role) => {
  let detailedRole = role;
  let ressource = null;
  const explodedRole = role.split(':');
  if (explodedRole.length === 2) {
    detailedRole = explodedRole[1];
    ressource = explodedRole[0];
  }
  return (
    keycloak.hasRealmRole(detailedRole)
    || keycloak.hasResourceRole(detailedRole, ressource)
  );
};

export const useAuthorization = (roles = [], ORMode = true) => {
  const { keycloak } = useKeycloak();
  return isAuthorized(keycloak, ORMode)(roles);
};

export const withKeycloak = (WrappedComponent) => function (props) {
  const { keycloak } = useKeycloak();
  return <WrappedComponent keycloak={keycloak} {...props} />;
};

export const withAuthorization = (WrappedComponent) => function (props) {
  const { keycloak } = useKeycloak();
  return (
    <WrappedComponent isAuthorized={isAuthorized(keycloak)} {...props} />
  );
};

function KeycloakProvider({ children, showError }) {
  const [isReady, setIsReady] = useState(false);
  const setIdentity = useSetRecoilState(identitySelector);

  const logoutUser = useCallback(() => {
    showError(
      'Vous avez été déconnecté de keycloak, vous allez être redirigé dans 2 secondes',
    );
    setTimeout(setIdentity.bind(this, null), 2000);
  }, []);

  useEffect(() => {
    ApiCaller.eventEmitter.on('error_403', logoutUser);
    return () => {
      ApiCaller.eventEmitter.off('error_403', logoutUser);
    };
  }, []);

  const relogWithToken = (token) => {
    if (token) {
      ApiCaller.setToken(token);

      try {
        setIdentity(jwtDecode(token));
        setIsReady(true);
      }
      catch (error) {
        showError(error);
      }
    }
  };

  const eventLogger = (event, error) => {
    switch (event) {
      case 'onReady': {
        if (!keycloakInstance.authenticated) {
          keycloakInstance.login();
        }
        break;
      }
      case 'onAuthError': {
        showError(
          decodeURIComponent(
            error?.error_description
              || 'Une erreur inconnue est survenue, contacte le service technique !',
          ).replace(/\+/g, ' '),
        );
        break;
      }
      case 'onInitError': {
        showError("Une erreur est survenue à l'initialisation de Keycloak");
        break;
      }
      default:
        break;
    }
  };

  const onTokens = ({ token }) => {
    if (ApiCaller.token !== token) {
      relogWithToken(token);
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloakInstance}
      onEvent={eventLogger}
      onTokens={onTokens}
    >
      {isReady && keycloakInstance.authenticated ? (
        children
      ) : (
        <h2 style={{ marginBottom: '1em' }}>Communication avec Keycloak</h2>
      )}
    </ReactKeycloakProvider>
  );
}

KeycloakProvider.propTypes = {
  children: PropTypes.any,
  showError: PropTypes.func,
};

export default withMessages(KeycloakProvider);
