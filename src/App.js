import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  set_current_data,
  set_hourly_forecast_data,
  set_weekly_forecast_data,
} from "./redux/action";
import Temperature from "./Components/Temperature/Temperature";

import WeeklyForecast from "./Components/WeeklyForecast/WeeklyForecast";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import Search from "./Components/Search/Search";

function App() {
  // const [interval] = useState(6000);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state?.searchTerm);

  useEffect(() => {
    console.log("Setting Geo Location...");

    const getLatLon = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (location) {
        const { latitude, longitude } = location.coords;
        let lat = latitude.toFixed(2);
        let lon = longitude.toFixed(2);
        resolve([lat, lon]);
      });
    });

    getLatLon.then((loc) => {
      const [lt, ln] = loc;
      setLat(lt);
      setLon(ln);
    });
  }, []);

  useEffect(() => {
    console.log("Setting Search...");
    if (searchTerm !== "") {
      console.log("Search:" + searchTerm);
      let url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&appid=${process.env.REACT_APP_API_KEY}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          console.log({ data });
          // console.log(data[0]);
          if (typeof data[0] === "undefined") {
            alert("No Match Found");
          }

          setLat(data[0]?.lat.toFixed(2));
          setLon(data[0]?.lon.toFixed(2));

          // dispatch(set_coords_data(coords));
        })
        .catch(console.error);
    }
  }, [searchTerm]);

  useEffect(() => {
    console.log("Fetching Data...");

    const setData = () => {
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
          // console.log("============Current=================");
          // console.log({ data });
          dispatch(set_current_data(data));
        })
        .catch(console.error);
      fetch(forecastUrl)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then((data) => {
          // console.log("============Forecast=================");
          // console.log({ data });
          dispatch(set_hourly_forecast_data(data));
          // console.log("============Weekly Forecast=================");
          const weeklyData = extractWeekyForecastData(data);
          dispatch(set_weekly_forecast_data(weeklyData));
        })
        .catch(console.error);
    };

    if (lat !== null || lon !== null) {
      setData();
    }
  }, [lat, lon, searchTerm, dispatch]);

  const extractWeekyForecastData = (data) => {
    let weeklyForecast = [];
    let date = null;
    let time = data.list[0].dt_txt.split(" ")[1];

    data.list.forEach((e) => {
      let [current_date, current_time] = e?.dt_txt.split(" ");

      if (date !== current_date && time === current_time) {
        weeklyForecast.push({
          date: e?.dt,
          temp: e?.main.temp,
          icon: e?.weather[0].icon,
        });
        date = current_date;
      }
    });
    return weeklyForecast;
  };

  // console.log({ state });
  return (
    <div className="App">
      <div>
        <Search />
        <Temperature />
        <WeatherInfo />
      </div>
      <WeeklyForecast />
    </div>
  );
}

export default App;
