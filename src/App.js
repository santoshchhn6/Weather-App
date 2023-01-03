import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { set_current_data, set_forecast_data } from "./redux/action";
import Temperature from "./Components/Temperature/Temperature";
import Wind from "./Components/Wind/Wind";
import Pressure from "./Components/Pressure/Pressure";
import Visibility from "./Components/Visibility/Visibility";
import Humidity from "./Components/Humidity/Humidity";
import Sunrise from "./Components/Sunrise/Sunrise";
import Sunset from "./Components/Sunset/Sunset";

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

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
      <div className="App_wrapper">
        <Temperature />
        <div className="App_weather_info">
          <Wind />
          <Pressure />
        </div>
        <div className="App_weather_info">
          <Visibility />
          <Humidity />
        </div>
        <div className="App_weather_info">
          <Sunrise />
          <Sunset />
        </div>
      </div>
    </div>
  );
}

export default App;
