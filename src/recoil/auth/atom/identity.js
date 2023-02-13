import { atom } from 'recoil';

export default atom({
  key: 'identity',
  default: localStorage.getItem('identity'),
});
