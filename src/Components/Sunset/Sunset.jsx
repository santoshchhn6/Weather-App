import { GiSunset } from "react-icons/gi";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";
import { getTimeString } from "../../dateTime";

const Sunset = () => {
  const sunset = useSelector((state) => state.current?.sunset);
  const timeStr = getTimeString(new Date(sunset * 1000));
  return (
    <Panel2 title="Sunrise" value={timeStr}>
      <GiSunset />
    </Panel2>
  );
};

export default Sunset;
