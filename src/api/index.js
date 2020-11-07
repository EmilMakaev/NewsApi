import axios from 'axios';
import {action} from 'mobx';

const APIKey = 'f49cd091fe624d11a56a46072db541fb';
const API_URL =
  'http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=';

const responseBody = (res) => {
  return res.data;
};

const requests = {
  get: (url) => {
    return axios
      .get(`${url}${APIKey}`)
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
          throw 'CANCELLED';
        } else {
          throw 'Error';
        }
      })
      .then(action(responseBody));
  },
};

const news = {
  get: () => requests.get(`${API_URL}`),
};

export default {
  news,
};
