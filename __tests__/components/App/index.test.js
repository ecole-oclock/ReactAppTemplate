import { screen } from '@testing-library/react';

import getKeycloakInstance from 'src/commons/Keycloak';
import { renderWithMainWrapper } from '__tests__/utils';
import App from 'src/components/App';

test('renders learn React and Typescript link', async () => {
  const keycloakInstance = getKeycloakInstance();
  keycloakInstance.__mockSetRole(['any-right-you-need']);

  renderWithMainWrapper(<App />, {
    keycloakInstance,
  });
  const linkElement = await screen.findByText(/Hello Home/i);

  expect(linkElement).toBeInTheDocument();
});
