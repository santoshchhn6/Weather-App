import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { set_city, set_current_data, set_forecast_data } from "./redux/action";
import Temperature from "./Components/Temperature/Temperature";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  // const [data, setData] = useState(0);
  // const [currentWeatherUrl, setcurrentWeatherUrl] = useState(
  //   `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  // );
  // const [forecastUrl, setforecastUrl] = useState(
  //   `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  // );
  // const [cityNameUrl, setcityNameUrl] = useState(
  //   `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
  // );

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  useEffect(() => {
    getLatLon.then((loc) => {
      const [lt, ln] = loc;
      setLat(lt);
      setLon(ln);
    });

    if (lat !== null || lon !== null) {
      console.log("lt:" + lat);
      console.log("ln:" + lon);

      let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`;
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`;

      fetch(currentWeatherUrl)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          console.log("============Current=================");
          console.log({ data });
          dispatch(set_current_data(data));
        })
        .catch(console.error);
      fetch(forecastUrl)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          console.log("============Forecast=================");
          console.log({ data });
          dispatch(set_forecast_data(data));
        })
        .catch(console.error);
    }
  }, [lat, lon]);

  const getLatLon = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (location) {
      const { latitude, longitude } = location.coords;
      let lat = latitude.toFixed(2);
      let lon = longitude.toFixed(2);
      resolve([lat, lon]);
    });
  });

  return (
    <div className="App">
      <Temperature />
    </div>
  );
}

export default App;
