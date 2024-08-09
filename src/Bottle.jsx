import * as classes from "./Bottle.module.css";

function Bottle(props) {
  const bottleNum = props.bottleNum;

  function getClassName(index) {
    let className;
    if (!props.contents[index]?.uncovered) {
      className = classes.hidden;
    } else {
      const color = props.contents[index]?.color;
      switch (color) {
        case 1:
          className = classes.yellow;
          break;
        case 2:
          className = classes.green;
          break;
        case 3:
          className = classes.blue;
          break;
        case 4:
          className = classes.red;
          break;
        case 5:
          className = classes.purple;
          break;
        case 6:
          className = classes.turquoise;
          break;
        case 7:
          className = classes.white;
          break;
        case 8:
          className = classes.orange;
          break;
      }
    }
    return className;
  }

  return (
    <div
      className={`${classes.bottleStyle}
                      ${props.isComplete ? classes.complete : ""}`}
    >
      {props.contents.map((_, index) => (
        <div
          key={`${bottleNum}-liquid-${index}`}
          style={{ height: `${props.height}px`, zIndex: -1, maxHeight: `${props.height}px` }}
          className={`
            ${getClassName(index)}
              ${props.isAnimating ? classes.finishing : ""}
              `}
        ></div>
      ))}
    </div>
  );
}

export default Bottle;
