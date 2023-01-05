import { MdOutlineVisibility } from "react-icons/md";
import Panel2 from "../../CustomComponents/Panel2/Panel2";
import { useSelector } from "react-redux";

const Visibility = () => {
  const visibility = useSelector((state) => state.current?.visibility);
  return (
    <Panel2 title="Visibility" value={`${visibility / 1000} km`}>
      <MdOutlineVisibility />
    </Panel2>
  );
};

export default Visibility;
