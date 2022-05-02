// the app axios instance that will be injected globally with all the options set one time

import axios from 'axios';
import apiFun from '../api';

const appAxios = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

const $api = { ...apiFun(appAxios) };

export default $api;
