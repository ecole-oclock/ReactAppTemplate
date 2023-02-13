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
    <div className="page-error page-error-500">
      <Helmet>
        <title>500 - {process.env.APP_NAME} - Une erreur s&apos;est produite</title>
      </Helmet>
      <div className="left-panel">
        <h1>Erreur 500</h1>
        <p>
          Le serveur n’a pas répondu à ta requête.<br />
          Tu peux aller sur une autre page ou réessayer en actualisant.
          <div className="error-actions">
            <DS.Button onClick={() => { navigate(-1); }}>Retour</DS.Button>
            <DS.Button style={{ marginLeft: '1em' }} type="primary" onClick={() => { document.location.reload(); }}>Actualiser</DS.Button>
          </div>
        </p>
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
