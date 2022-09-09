import { selector } from 'recoil';
import ApiCaller from 'src/commons/ApiCaller';

export default selector({
  key: 'getAllExample',
  get: () => ApiCaller.makeRequest('get', '/example'),
});
