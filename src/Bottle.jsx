import { useState } from "react";
import * as classes from "./Bottle.module.css";

function Bottle(props) {

  return (
    <div className={classes.bottleStyle}>
      {props.contents.map((_, index) => (
        <div
          key={index}
          style={{height:`${props.height}px`}}
          className={
            props.contents[index] === 0
              ? classes.empty
              : props.contents[index] === 1
              ? classes.yellow
              : props.contents[index] === 2
              ? classes.green
              : props.contents[index] === 3
              ? classes.blue
              : props.contents[index] === 4
              ? classes.red
              : props.contents[index] === 5
              ? classes.purple
              : props.contents[index] === 6
              ? classes.turquoise
              : ""
          }
        ></div>
      ))}
    </div>
  );
}

export default Bottle;
