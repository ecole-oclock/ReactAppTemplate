import { selector } from 'recoil';
import keycloak from 'src/commons/Keycloak';

export default selector({
  key: 'identitySelector',
  get: () => JSON.parse(localStorage.getItem('identity')) || {},
  set: (methods, profile) => {
    if (profile === null) {
      localStorage.removeItem('identity');
      keycloak.logout();
    }
    else {
      localStorage.setItem('identity', JSON.stringify(profile || {}));
    }
  },
});
