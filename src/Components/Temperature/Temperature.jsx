import Panel from "../../CustomComponents/Panel";
import "./Temperature.css";
import { FaMapMarker } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getDateTimeString, getHrAmPm } from "../../dateTime";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  AreaChart,
  Area,
} from "recharts";
import { useState } from "react";

const Temperature = () => {
  const current = useSelector((state) => state.current);
  const forecast = useSelector((state) => state.forecast);
  const dateString = getDateTimeString(current?.date * 1000);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  // const tempForecast = forecast?.filter((e, i) => {
  //   //only return first 7 element
  //   //formating date into hr e.g.'9am'
  //   if (i < 8) {
  //     return { time: getHrAmPm(e.date * 1000), temp: Math.round(e.temp) };
  //   }
  // });

  const tempForecast = () => {
    //only return first 7 element
    //formating date into hr e.g.'9am'
    //find min and max temperature for chart y-axis
    if (forecast?.length > 0) {
      let arr = [];

      for (let i = 0; i < 7; i++) {
        arr.push({
          time: getHrAmPm(forecast[i].date * 1000),
          temp: Math.floor(forecast[i].temp),
        });
      }

      return arr;
    }
    return null;
  };

  console.log(tempForecast());
  return (
    <Panel className="Temperature">
      <div className="TemperatureCityTime">
        <span>
          <FaMapMarker className="map_icon" />
          {current?.city}
        </span>
        <span>{dateString}</span>
      </div>
      <div className="temp_info">
        <div className="temp">
          <span>{current?.temp}</span>
          <span>&deg;</span>
        </div>
        <div className="weather">
          <img
            src={`http://openweathermap.org/img/wn/${current?.icon}@4x.png`}
            alt="icon"
          />
          <span>{current?.description}</span>
        </div>
      </div>
      <ResponsiveContainer className="chart" width="100%" aspect={4 / 0.8}>
        <LineChart data={tempForecast()}>
          <YAxis hide type="number" domain={[24, 30]} />
          <XAxis
            axisLine={false}
            interval="preserveStartEnd"
            dataKey="time"
            stroke="white"
          />
          <Line type="monotone" dataKey="temp" stroke="white">
            <LabelList dataKey="temp" position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
};

export default Temperature;
