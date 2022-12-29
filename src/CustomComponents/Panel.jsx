import "./Panel.css";
const panel = {
  overflow: "hidden",
  position: "relative",
  width: "600px",
  border: "1px solid rgba(255, 255, 255, 0.089)",
  borderRadius: "15px",
  padding: "20px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
};
const Panel = (props) => {
  return (
    <div style={panel} {...props}>
      <div className="blur c1"></div>
      <div className="blur c2"></div>
      {/* <div className="blur c3"></div> */}
      {props.children}
    </div>
  );
};

export default Panel;
