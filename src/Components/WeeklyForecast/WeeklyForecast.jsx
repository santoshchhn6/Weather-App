import { useSelector } from "react-redux";
import Panel from "../../CustomComponents/Panel/Panel";
import Panel3 from "../../CustomComponents/Panel3/Panel3";
import { getDayName } from "../../dateTime";
import "./WeeklyForecast.css";

const WeeklyForecast = () => {
  const forecast = useSelector((state) => state.weekly_forecast);
  return (
    <div className="WeeklyForecast">
      <div className="WeeklyForecastDays">
        <Panel3 className="WeeklyForecastTitle">
          <span>This Week</span>
        </Panel3>
        {forecast?.map((e) => (
          <Panel3 key={e?.date} className="WeeklyForecastDay">
            <span>{getDayName(new Date(e?.date * 1000))}</span>
            <div className="WeeklyForecastDayInfo">
              <span>{Math.round(e?.temp)}&deg;</span>
              <img
                src={`http://openweathermap.org/img/wn/${e?.icon}@2x.png`}
                alt=""
              />
            </div>
          </Panel3>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
