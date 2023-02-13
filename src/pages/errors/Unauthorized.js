/* eslint-disable global-require */
/*
 * Package Import
 */
import * as DS from '@o-clock-dev/mooncake';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.scss';
/*
 * Local Import
 */

/*
 * Component
 */
function Unauthorized() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.error) {
      navigate('/');
    }
  }, []);

  return (
    <div className="page-error page-error-401">
      <Helmet>
        <title>401 - {process.env.APP_NAME} - Accès non autorisé</title>
      </Helmet>
      <div className="left-panel">
        <h1>Erreur 401</h1>
        <div>
          Tu n’es pas autorisé à accéder à l’application.<br />
          Si tes accès ne fonctionnent pas, n’hésites pas à nous contacter : <br />
          <a href="mailto:support@oclock.io">support@oclock.io</a>
          <div className="error-actions">
            <DS.Button type="primary" onClick={() => { navigate(-1); }}>Retour</DS.Button>
          </div>
        </div>
      </div>
      <div className="right-panel" />
    </div>
  );
}

Unauthorized.propTypes = {
};

/*
 * Export
 */
export default Unauthorized;
