import { useState } from "react";
import * as classes from "./Bottle.module.css";

function Bottle(props) {
  const [contents, setContents] = useState(props.contents);
  const HEIGHT = props.height;

  return (
    <div className={classes.bottleStyle}>
      {contents.map((s, index) => (
        <div
          key={index}
          style={{height:`${HEIGHT}px`}}
          className={
            contents[index] === 0
              ? classes.empty
              : contents[index] === 1
              ? classes.yellow
              : contents[index] === 2
              ? classes.green
              : contents[index] === 3
              ? classes.blue
              : contents[index] === 4
              ? classes.red
              : contents[index] === 5
              ? classes.purple
              : contents[index] === 6
              ? classes.turquoise
              : ""
          }
        ></div>
      ))}
    </div>
  );
}

export default Bottle;
