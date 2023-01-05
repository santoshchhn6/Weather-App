import { panel } from "../style/style";
import "./Panel3.css";

const Panel3 = (props) => {
  return (
    <div style={panel} {...props}>
      <div className="blur_circle Panel3_c1"></div>
      <div className="blur_circle Panel3_c2"></div>
      {props.children}
    </div>
  );
};

export default Panel3;
