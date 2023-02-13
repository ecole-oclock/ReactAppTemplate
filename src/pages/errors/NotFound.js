/*
 * Package Import
 */
import React from 'react';
import * as DS from '@o-clock-dev/mooncake';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import './style.scss';
/*
 * Local Import
 */

/*
 * Component
 */
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-error page-error-404">
      <Helmet>
        <title>404 - {process.env.APP_NAME} - Ressource introuvable</title>
      </Helmet>
      <div className="left-panel">
        <h1>Erreur 404</h1>
        <div>
          Cette page est n’existe pas ou est introuvable.
          <div className="error-actions">
            <DS.Button type="primary" onClick={() => { navigate(-1); }}>Retour</DS.Button>
          </div>
        </div>
      </div>
      <div className="right-panel" />
    </div>
  );
}

NotFound.propTypes = {
};

/*
 * Export
 */
export default NotFound;
