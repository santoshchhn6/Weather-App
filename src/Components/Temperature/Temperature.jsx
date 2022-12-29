import Panel from "../../CustomComponents/Panel";
import "./Temperature.css";
import { FaMapMarker } from "react-icons/fa";
import { useSelector } from "react-redux";
const Temperature = () => {
  const data = useSelector((state) => state);
  return (
    <Panel className="Temperature">
      <div className="TemperatureCityTime">
        <span>
          <FaMapMarker className="map_icon" />
          {data.city}
        </span>
        <span>{data.date}</span>
      </div>
      <div className="temp_info">
        <div className="temp">
          <span>{data.temp}</span>
          <span>&deg;</span>
        </div>
        <div className="weather">
          <img
            src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt="icon"
          />
          <span>{data.description}</span>
        </div>
      </div>
    </Panel>
  );
};

export default Temperature;
