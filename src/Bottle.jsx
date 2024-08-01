import { useState } from "react";
import * as classes from "./Bottle.module.css";

function Bottle(props) {

  const bottleNum = props.bottleNum;
  return (
    <div
      className={`${classes.bottleStyle}
                      ${props.isComplete ? classes.complete : ""}`}
    >
      {props.contents.map((_, index) => (
        <div
          key={`${bottleNum}-liquid-${index}`}
          style={{ height: `${props.height}px`, zIndex: -1 , maxHeight:`${props.height}px`}}
          className={`
            ${
              props.contents[index].uncovered === false
                ? classes.hidden
                : props.contents[index].color === 1
                ? classes.yellow
                : props.contents[index].color === 2
                ? classes.green
                : props.contents[index].color === 3
                ? classes.blue
                : props.contents[index].color === 4
                ? classes.red
                : props.contents[index].color === 5
                ? classes.purple
                : props.contents[index].color === 6
                ? classes.turquoise
                : props.contents[index].color === 7
                ? classes.white
                : props.contents[index].color === 8
                ? classes.orange
                : ""
            }
              ${props.isAnimating ? classes.finishing : ""}
              `}
        ></div>
      ))}
    </div>
  );
}

export default Bottle;
