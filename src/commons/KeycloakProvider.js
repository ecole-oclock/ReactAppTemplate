/**
 * Package Import
 */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import { useRecoilState } from 'recoil';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

/**
 * Local Import
*/
import Skeleton from 'src/pages/Skeleton';

import ApiCaller from 'src/commons/ApiCaller';
import { withMessages } from 'src/commons/MessagesProvider';
import { identitySelector } from '@recoil/auth';

export const isAuthorized = (keycloak, ORMode = true) => (roles = []) => {
  let _roles = roles;
  if (_roles && !Array.isArray(_roles)) {
    _roles = [_roles];
  }
  if (_roles && _roles.length === 0) {
    return true;
  }

  if (_roles && _roles.length > 0) {
    if (ORMode) {
      return _roles.some((role) => {
        let _role = role;
        let _ressource = null;
        const explodedRole = role.split(':');
        if (explodedRole.length === 2) {
          _role = explodedRole[1];
          _ressource = explodedRole[0];
        }
        return (
          keycloak.hasRealmRole(_role)
          || keycloak.hasResourceRole(_role, _ressource)
        );
      });
    }

    return _roles.reduce((accumulator, role) => {
      let _role = role;
      let _ressource = null;
      const explodedRole = role.split(':');
      if (explodedRole.length === 2) {
        _role = explodedRole[1];
        _ressource = explodedRole[0];
      }
      return (
        accumulator
        && (keycloak.hasRealmRole(_role)
          || keycloak.hasResourceRole(_role, _ressource))
      );
    }, true);
  }
  return true;
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

function KeycloakProvider({ keycloakInstance, children, showError }) {
  const [isReady, setIsReady] = useState(false);
  const [identity, setIdentity] = useRecoilState(identitySelector);

  const [hasBeenLogged, setHasBeenLogged] = useState(false);

  // Gestion de la déconnexion de keycloak
  useEffect(() => {
    if (hasBeenLogged && (!identity || (identity && Object.keys(identity).length === 0))) {
      localStorage.removeItem('kcTokens');
      keycloakInstance.logout();
    }
  }, [keycloakInstance, hasBeenLogged, identity]);

  useEffect(() => {
    if (identity && Object.keys(identity).length > 0) {
      setHasBeenLogged(true);
    }
  }, [identity]);

  const programRefreshToken = useCallback(
    (tokens) => {
      if (tokens.token) {
        const decoded = jwtDecode(tokens.token);
        const delay = decoded.exp * 1000 - new Date().getTime() - 10000;
        setTimeout(() => {
          keycloakInstance
            .updateToken(60)
            .then((refreshed) => {
              if (refreshed) {
                const newTokens = {
                  token: keycloakInstance.token,
                  refreshToken: keycloakInstance.refreshToken,
                  idToken: keycloakInstance.idToken,
                };
                programRefreshToken(newTokens);
              }
            })
            .catch(() => {
              showError(
                'Une erreur est survenue durant le maintien de la session, vous allez être redirigé vers la page de connexion',
              );
              localStorage.removeItem('kcTokens');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
        }, delay);
      }
    },
    [keycloakInstance],
  );

  const keycloakTokens = useMemo(() => {
    const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
    if (tokens && tokens.refreshToken) {
      const decoded = jwtDecode(tokens.refreshToken);
      if (Math.round(new Date().getTime() / 1000) > decoded.exp) {
        localStorage.removeItem('kcTokens');
        return {};
      }
    }
    programRefreshToken(tokens);
    return tokens;
  }, []);

  const logoutUser = useCallback(() => {
    showError(
      'Vous avez été déconnecté de keycloak, vous allez être redirigé dans 5 secondes',
    );
    setTimeout(setIdentity.bind(this, null), 5000);
  });

  useEffect(() => {
    ApiCaller.eventEmitter.on('error_401', logoutUser);
    return () => {
      ApiCaller.eventEmitter.off('error_401', logoutUser);
    };
  }, []);

  const relogWithToken = (token) => {
    if (token) {
      ApiCaller.setToken(token);

      try {
        setIdentity(token);
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
      default:
        break;
    }
  };

  const onTokens = (tokens) => {
    localStorage.setItem('kcTokens', JSON.stringify(tokens));
    relogWithToken(tokens.token);
  };

  const isUserLogged = identity?.sub;

  return (
    <ReactKeycloakProvider
      authClient={keycloakInstance}
      onEvent={eventLogger}
      onTokens={onTokens}
      initOptions={{ ...keycloakTokens }}
    >
      {isReady && isUserLogged && keycloakInstance.authenticated ? (
        children
      ) : (
        <Skeleton />
      )}
    </ReactKeycloakProvider>
  );
}

KeycloakProvider.propTypes = {
  keycloakInstance: PropTypes.shape({
    refreshToken: PropTypes.string,
    authenticated: PropTypes.bool,
    updateToken: PropTypes.func.isRequired,
    token: PropTypes.string,
    idToken: PropTypes.string,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  showError: PropTypes.func,
};

export default withMessages(KeycloakProvider);
