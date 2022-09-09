import Layout from 'src/components/Layout';
import ExamplePage from 'src/pages/ExamplePage';
import Home from 'src/pages/Home';

export default [
  { path: '/', breadcrumb: 'Home', element: <Home /> },
  {
    element: <Layout />,
    children: [
      {
        path: '/example',
        breadcrumb: 'Example Page',
        element: <ExamplePage />,
      },
    ],
  },
];
