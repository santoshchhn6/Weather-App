export const types = {
  SET_CURRENT_DATA: "SET_CURRENT_DATA",
  // SET_COORDS: "SET_COORDS",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_HOURLY_FORECAST_DATA: "SET_HOURLY_FORECAST_DATA",
  SET_WEEKLY_FORECAST_DATA: "SET_WEEKLY_FORECAST_DATA",
};

export const set_current_data = (payload) => {
  return { type: types.SET_CURRENT_DATA, payload };
};

// export const set_coords_data = (payload) => {
//   return { type: types.SET_COORDS, payload };
// };

export const set_search_term = (payload) => {
  return { type: types.SET_SEARCH_TERM, payload };
};

export const set_hourly_forecast_data = (payload) => {
  return { type: types.SET_HOURLY_FORECAST_DATA, payload };
};

export const set_weekly_forecast_data = (payload) => {
  return { type: types.SET_WEEKLY_FORECAST_DATA, payload };
};
