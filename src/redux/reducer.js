import { types } from "./action";

export const initialState = {
  searchTerm: "",
  coords: { lat: null, lon: null },
  current: {
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
  },
  hourly_forecast: [],
  weekly_forecast: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_DATA: {
      return {
        ...state,
        current: {
          ...state.current,
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
          city: payload.name,
        },
      };
    }
    case types.SET_HOURLY_FORECAST_DATA: {
      return {
        ...state,
        hourly_forecast: payload.list.map((e) => ({
          date: e.dt,
          temp: e.main.temp,
          icon: e.weather[0].icon,
        })),
      };
    }
    case types.SET_WEEKLY_FORECAST_DATA: {
      return {
        ...state,
        weekly_forecast: payload,
      };
    }
    // case types.SET_COORDS: {
    //   return {
    //     ...state,
    //     coords: payload,
    //   };
    // }
    case types.SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
