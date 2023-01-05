import { CgCompressV } from "react-icons/cg";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";

const Pressure = () => {
  const pressure = useSelector((state) => state.current?.pressure);
  return (
    <Panel2 title="Pressure" value={`${pressure} mb`}>
      <CgCompressV />
    </Panel2>
  );
};

export default Pressure;
