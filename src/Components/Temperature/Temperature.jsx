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
import { useEffect, useState } from "react";
import Panel from "../../CustomComponents/Panel/Panel";

const Temperature = () => {
  const current = useSelector((state) => state.current);
  const forecast = useSelector((state) => state.forecast);
  const dateString = getDateTimeString(current?.date * 1000);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [forecastList, setforecastList] = useState([]);

  const getFirstSevenForecastList = new Promise((resolve, reject) => {
    //only return first 7 element
    //formating date into hr e.g.'9am'
    //find min and max temperature for chart y-axis
    if (forecast?.length > 0) {
      let arr = [];
      let min = 100;
      let max = 0;
      for (let i = 0; i < 7; i++) {
        let temp = Math.floor(forecast[i].temp);
        if (temp < min) min = temp;
        if (temp > max) max = temp;
        arr.push({
          time: getHrAmPm(forecast[i].date * 1000),
          temp,
        });
      }

      resolve([min, max, arr]);
    } else {
      reject("forecast does not have any data.");
    }
  });

  useEffect(() => {
    if (forecast !== null) {
      getFirstSevenForecastList
        .then((result) => {
          const [min, max, forecastList] = result;
          setMinTemp(min);
          setMaxTemp(max);
          setforecastList(forecastList);
        })
        .catch((error) => console.log(error));
    }
  }, [forecast]);

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
        <LineChart data={forecastList}>
          <YAxis hide type="number" domain={[minTemp - 4, maxTemp + 4]} />
          <XAxis
            axisLine={false}
            interval="preserveStartEnd"
            dataKey="time"
            stroke="var(--font-color)"
          />
          <Line type="monotone" dataKey="temp" stroke="var(--font-color)">
            <LabelList dataKey="temp" position="top" />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
};

export default Temperature;
