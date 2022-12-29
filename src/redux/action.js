export const types = {
  SET_DATA: "SET_DATA",
  SET_CITY: "SET_CITY",
};

export const set_data = (payload) => {
  return { type: types.SET_DATA, payload };
};

export const set_citY = (payload) => {
  return { type: types.SET_CITY, payload };
};
