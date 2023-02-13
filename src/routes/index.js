import { MainLayout, ErrorLayout, PanelLayout } from 'src/layouts';
import ExamplePage from 'src/pages/ExamplePage';
import Home from 'src/pages/Home';
import { Unauthorized, Forbidden, NotFound, ServerError } from 'src/pages/errors';

export default [
  {
    element: <MainLayout />,
    path: '/',
    children: [
      {
        element: <PanelLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'example',
            breadcrumb: 'Example Page',
            element: <ExamplePage />,
          },
        ],
      },
    ],
  },
  {
    element: <ErrorLayout />,
    path: 'error',
    children: [
      { path: '401', element: <Unauthorized /> },
      { path: '403', element: <Forbidden /> },
      { path: '404', element: <NotFound /> },
      { path: '500', element: <ServerError /> },
    ],
  },
  {
    element: <ErrorLayout />,
    path: '*',
    children: [
      { path: '*', element: <NotFound /> },
    ],
  },
];
