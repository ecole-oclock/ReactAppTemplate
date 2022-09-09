/*
* Package Import
*/
import FormData from 'form-data';
import axios from 'axios';
import EventEmitter from 'events';

const { API_BASEURL } = process.env;

export default class ApiCaller {
  static baseURL = `${API_BASEURL}/api`;

  static token = null;

  static eventEmitter = new EventEmitter();

  static setToken(token) {
    this.token = token;
  }

  static makeRequest(method, endpoint, data = {}, headersParam = {}, timeout = 10_000) {
    let headers = {
      'cache-control': 'no-cache, private',
      Authorization: `Bearer ${this.token || null}`,
      ...headersParam,
    };
    if (data instanceof FormData) {
      headers = {
        'Content-Length': data.getLengthSync(), // Sinon ça marche pas !
        ...headers,
        ...data.getHeaders(),
      };
    }
    const urlConfig = {
      headers,
      method,
      url: ApiCaller.baseURL + endpoint,
      withCredentials: true,
      timeout,
    };

    if (method.toUpperCase() === 'GET') {
      urlConfig.params = data;
    }
    else {
      urlConfig.data = data;
    }
    return axios(urlConfig)
      .catch((error) => {
        const error_ = !error ? new Error('La session n\'est plus valide, vous devez vous reconnecter') : error;
        throw error_;
      })
      .then((response) => response?.data)
      .catch((error) => {
        if (error.response.status) {
          ApiCaller.eventEmitter.emit(`error_${error.response.status}`, error);
        }

        if (!error.response || !error.response.status) {
          throw error;
        }

        if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
        throw error;
      });
  }
}
