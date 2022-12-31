import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { set_city, set_current_data, set_forecast_data } from "./redux/action";
import cities from "./city_list.json";
import Temperature from "./Components/Temperature/Temperature";

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  // const [data, setData] = useState(0);
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const [url2, setUrl2] = useState(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  );

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        dispatch(set_current_data(data));
      })
      .catch(console.error);
    fetch(url2)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        dispatch(set_forecast_data(data));
      })
      .catch(console.error);
  }, [url, url2]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      const { latitude, longitude } = location.coords;

      setLat(latitude);
      setLon(longitude);

      // console.log({ location });
      getCityName(latitude, longitude)
        .then((v) => dispatch(set_city(v)))
        .catch((e) => console.log.e);
    });
  }, []);

  const getCityName = (lat, lon) => {
    return new Promise((resolve, reject) => {
      const city = cities.filter(
        (c) =>
          c.coord.lat.toFixed(2) === lat.toFixed(2) &&
          c.coord.lon.toFixed(2) === lon.toFixed(2)
      );
      const city_name = city[0].name;
      if (typeof city_name === "undefined") reject("City not found");

      resolve(city_name);
    });
  };

  // console.log("lat:" + lat);
  // console.log("lon:" + lon);
  console.log({ state });

  return (
    <div className="App">
      <Temperature />
    </div>
  );
}

export default App;
