import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { set_citY, set_data } from "./redux/action";
import cities from "./city_list.json";

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  // const [data, setData] = useState(0);
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
  );

  const dispatch = useDispatch();

  const data = useSelector((state) => state);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      const { latitude, longitude } = location.coords;

      setLat(latitude);
      setLon(longitude);

      // console.log({ location });
      dispatch(set_citY(getCityName(latitude, longitude)));
    });
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => dispatch(set_data(data)))
      .catch(console.error);
  }, [url]);

  const getCityName = (lat, lon) => {
    const city = cities.filter(
      (c) =>
        c.coord.lat.toFixed(2) === lat.toFixed(2) &&
        c.coord.lon.toFixed(2) === lon.toFixed(2)
    );
    // console.log({ city });
    return city[0].name;
  };

  // console.log("lat:" + lat);
  // console.log("lon:" + lon);
  console.log({ data });

  return <div className="App">working </div>;
}

export default App;
