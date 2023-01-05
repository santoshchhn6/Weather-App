import "./Wind.css";
import { BsWind } from "react-icons/bs";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";

const Wind = () => {
  const wind = useSelector((state) => state.current?.wind);
  return (
    <Panel2 title="Wind" value={`${Math.round(wind?.speed)} km/h`}>
      <BsWind />
    </Panel2>
  );
};

export default Wind;
