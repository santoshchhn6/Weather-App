import { types } from "./action";

const initialState = {
  temp: null,
  humidity: null,
  pressure: null,
  visibility: null,
  desciption: null,
  sunrise: null,
  sunset: null,
  date: null,
  icon: null,
  wind: {
    deg: null,
    speed: null,
  },
  city: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_DATA: {
      console.log({ payload });
      return {
        ...state,
        temp: Math.round(payload.main.temp),
        humidity: payload.main.humidity,
        pressure: payload.main.pressure,
        sunrise: payload.sys.sunrise,
        sunset: payload.sys.sunset,
        visibility: payload.visibility,
        description: payload.weather[0].description,
        date: payload.dt,
        icon: payload.weather[0].icon,
        wind: { ...state.wind, ...payload.wind },
      };
    }
    case types.SET_CITY: {
      return { ...state, city: payload };
    }
    default:
      return state;
  }
};

export default reducer;
