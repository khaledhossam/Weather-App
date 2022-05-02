//  api functions used for getting weather

export default function weather(axios) {
  return {
    getHistoricalWeather(params) {
      return axios.get('/onecall/timemachine', { params });
    },
    getCurrentWeather(params) {
      return axios.get('/weather', { params });
    },
    getBulkWeather(params) {
      return axios.get('/onecall', { params });
    },
  };
}
