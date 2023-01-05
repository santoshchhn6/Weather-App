import { useSelector } from "react-redux";
import Panel from "../../CustomComponents/Panel/Panel";
import { getDayName } from "../../dateTime";
import "./WeeklyForecast.css";

const WeeklyForecast = () => {
  const forecast = useSelector((state) => state.weekly_forecast);
  return (
    <Panel className="WeeklyForecast">
      <span>This Week</span>
      <div className="WeeklyForecastDays">
        {forecast?.map((e) => (
          <Panel key={e?.date} className="WeeklyForecastDay">
            <span>{getDayName(new Date(e?.date * 1000))}</span>
            <div>
              <span>{Math.round(e?.temp)}&deg;</span>
              <img
                src={`http://openweathermap.org/img/wn/${e?.icon}@2x.png`}
                alt=""
              />
            </div>
          </Panel>
        ))}
      </div>
    </Panel>
  );
};

export default WeeklyForecast;
