export const types = {
  SET_CURRENT_DATA: "SET_CURRENT_DATA",
  SET_FORECAST_DATA: "SET_FORECAST_DATA",
  SET_CITY: "SET_CITY",
};

export const set_current_data = (payload) => {
  return { type: types.SET_CURRENT_DATA, payload };
};

export const set_forecast_data = (payload) => {
  return { type: types.SET_FORECAST_DATA, payload };
};

export const set_city = (payload) => {
  return { type: types.SET_CITY, payload };
};
