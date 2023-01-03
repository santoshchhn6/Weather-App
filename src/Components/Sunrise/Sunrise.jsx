import { GiSunrise } from "react-icons/gi";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";
import { getTimeString } from "../../dateTime";

const Sunrise = () => {
  const sunrise = useSelector((state) => state.current?.sunrise);
  const timeStr = getTimeString(new Date(sunrise * 1000));
  return (
    <Panel2 title="Sunrise" value={timeStr}>
      <GiSunrise />
    </Panel2>
  );
};

export default Sunrise;
