import "./Wind.css";
import { ImCompass2 } from "react-icons/im";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";

const Wind = () => {
  const wind = useSelector((state) => state.current?.wind);
  return (
    <Panel2 title="Wind" value={`${Math.round(wind?.speed)} km/h`}>
      <ImCompass2 />
    </Panel2>
  );
};

export default Wind;
