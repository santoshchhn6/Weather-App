import { panel } from "../style/style";
import "./Panel.css";

const Panel = (props) => {
  return (
    <div style={panel} {...props}>
      <div className="blur_circle Panel_c1"></div>
      <div className="blur_circle Panel_c2"></div>
      {props.children}
    </div>
  );
};

export default Panel;
