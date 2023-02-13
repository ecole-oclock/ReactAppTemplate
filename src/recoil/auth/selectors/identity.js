import { selector } from 'recoil';
import jwtDecode from 'jwt-decode';
import identityAtom from '@recoil/auth/atom/identity';
import ApiCaller from 'src/commons/ApiCaller';

export default selector({
  key: 'identitySelector',
  get: ({ get }) => {
    try {
      const jwToken = get(identityAtom);
      return jwtDecode(jwToken);
    }
    catch (error) {
      return {};
    }
  },
  set: ({ set }, jwToken) => {
    if (jwToken === null) {
      localStorage.removeItem('identity');
      ApiCaller.setToken(null);
    }
    else {
      ApiCaller.setToken(jwToken);
      localStorage.setItem('identity', JSON.stringify(jwToken || {}));
    }
    set(identityAtom, jwToken || {});
  },
});
