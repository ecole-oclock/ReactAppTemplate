/*
 * Package Import
 */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import * as DS from '@o-clock-dev/mooncake';

import './style.scss';

/*
 * Local Import
 */

/*
 * Component
 */
function Forbidden() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.error) {
      navigate('/');
    }
  }, []);
  return (
    <div className="page-error page-error-403">
      <Helmet>
        <title>403 - {process.env.APP_NAME} - Accès non autorisé</title>
      </Helmet>
      <div className="left-panel">
        <h1>Erreur 403</h1>
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

Forbidden.propTypes = {
};

/*
 * Export
 */
export default Forbidden;
