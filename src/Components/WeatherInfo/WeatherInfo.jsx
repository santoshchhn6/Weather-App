import Humidity from "../Humidity/Humidity";
import Pressure from "../Pressure/Pressure";
import Sunrise from "../Sunrise/Sunrise";
import Sunset from "../Sunset/Sunset";
import Visibility from "../Visibility/Visibility";
import Wind from "../Wind/Wind";
import "./WeatherInfo.css";
const WeatherInfo = () => {
  return (
    <div className="WeatherInfo">
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
  );
};

export default WeatherInfo;
