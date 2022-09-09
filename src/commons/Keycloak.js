// Pas besoin d'importer, c'est récupéré depuis le HTML sur le serveur de O'clock
// import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
// eslint-disable-next-line no-undef
const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  enableLogging: true,
  realm: 'oclock',
  'auth-server-url': process.env.KEYCLOAK_URL,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID,
});
  
export default keycloak;
