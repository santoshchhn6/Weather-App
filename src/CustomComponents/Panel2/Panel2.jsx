import Panel from "../Panel/Panel";
import { panel } from "../style/style";
import "./Panel2.css";

const Panel2 = (props) => {
  return (
    <div style={panel} className="Panel2 ">
      <div className="blur_circle Panel2_c1"></div>
      <div className="blur_circle Panel2_c2"></div>
      <div className="Panel2_info">
        <span className="Panel2_Title">{props?.title}</span>
        <span>{props?.value}</span>
      </div>
      <div className="Panel2_icon">{props?.children}</div>
    </div>
  );
};

export default Panel2;
