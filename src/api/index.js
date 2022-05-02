// the main object that contain all the api modules

import weather from './weather';

export default function (axios) {
  return {
    weather: weather(axios),
  };
}
