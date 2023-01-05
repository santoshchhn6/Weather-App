import { BsSunset } from "react-icons/bs";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";
import { getTimeString } from "../../dateTime";

const Sunset = () => {
  const sunset = useSelector((state) => state.current?.sunset);
  const timeStr = getTimeString(new Date(sunset * 1000));
  return (
    <Panel2 title="Sunset" value={timeStr}>
      <BsSunset />
    </Panel2>
  );
};

export default Sunset;
