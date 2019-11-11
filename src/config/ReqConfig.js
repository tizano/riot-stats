import axios from 'axios';

import { RIOT_API_KEY, EUW_URI } from './RiotConstant';

const headerConfig = {
  baseURL: `https://cors-anywhere.herokuapp.com/${EUW_URI}`,
  timeout: 10000,
  headers: {
    'X-Riot-Token': RIOT_API_KEY,
  },
};


const getData = (url) => {
  return axios.get(url, headerConfig)
    .then(response => response)
    .catch(error => Promise.reject(error));
};

export {
  getData,
};

// https://euw1.api.riotgames.com
// https://na1.api.riotgames.com

// /lol/summoner/v4/summoners/by-name/tizano68
