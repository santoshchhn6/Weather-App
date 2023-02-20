import { MdOutlineWaterDrop } from "react-icons/md";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";

const Humidity = () => {
  const humidity = useSelector((state) => state.current?.humidity);
  return (
    <Panel2 title="Humidity" value={`${humidity}%`}>
      <MdOutlineWaterDrop />
    </Panel2>
  );
};

export default Humidity;
