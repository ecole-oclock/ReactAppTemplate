/*
 * Package Import
 */
import React, { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useRecoilValue } from 'recoil';

/*
 * Local Import
 */
import default16 from 'src/assets/favicons/favicon-16x16-default.png';
import default32 from 'src/assets/favicons/favicon-32x32-default.png';
import pages from 'src/routes';
import identityAtom from 'src/recoil/auth/selectors/identity';

import ApiCaller from 'src/commons/ApiCaller';

/*
 * Component
 */
function App() {
  const routes = useRoutes(pages);
  const identity = useRecoilValue(identityAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const onError401 = (error) => {
      navigate('/error/401', { replace: true, state: { error: error?.response?.data || new Error(error.message) } });
    };
    const onError403 = (error) => {
      navigate('/error/403', { replace: true, state: { error: error?.response?.data || new Error(error.message) } });
    };
    const onError404 = (error) => {
      navigate('/error/404', { replace: true, state: { error: error?.response?.data || new Error(error.message) } });
    };

    ApiCaller.eventEmitter.on('error_401', onError401);
    ApiCaller.eventEmitter.on('error_403', onError403);
    ApiCaller.eventEmitter.on('error_404', onError404);

    return () => {
      ApiCaller.eventEmitter.off('error_401', onError401);
      ApiCaller.eventEmitter.off('error_403', onError403);
      ApiCaller.eventEmitter.off('error_404', onError404);
    };
  }, [navigate]);

  if (!identity) return null;

  return (
    <>
      <Helmet>
        <title>{process.env.APP_NAME}</title>
        {/* Favicon */}
        <link rel="icon" type="image/png" href={default16} sizes="16x16" />
        <link rel="icon" type="image/png" href={default32} sizes="32x32" />
      </Helmet>
      {routes}
    </>
  );
}

/*
 * Export
 */
export default App;
