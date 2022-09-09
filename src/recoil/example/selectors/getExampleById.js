import { selector } from 'recoil';
import ApiCaller from 'src/commons/ApiCaller';

export default selector({
  key: 'getExampleById',
  get: () => ApiCaller.makeRequest('get', '/example/1'),
});
