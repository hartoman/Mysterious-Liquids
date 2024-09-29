import { useEffect, useRef, useState } from "react";
import * as classes from "./Bottle.module.css";

function Bottle(props) {
  const bottleNum = props.bottleNum;
  const bottleRef = useRef(null);  // Create a ref for the bottle div
  const [maxChildHeight, setMaxChildHeight] = useState(0);  // State to hold the max height for children

  useEffect(() => {
    // This will run after the component mounts and whenever its dimensions change
    const updateMaxChildHeight = () => {
      if (bottleRef.current) {
        const bottleHeight = bottleRef.current.clientHeight;  // Get the actual height of the bottle
        setMaxChildHeight(bottleHeight / props.maxCapacity);  // Divide by maxCapacity
      }
    };

    updateMaxChildHeight(); // Call the function to set the initial value

    // Optional: Add a resize event listener if necessary
    window.addEventListener('resize', updateMaxChildHeight);

    return () => {
      window.removeEventListener('resize', updateMaxChildHeight); // Clean up on unmount
    };
  }, [props.maxCapacity]); // Re-run the effect if maxCapacity changes

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
        default:
          className = ''; // Default class name if no color matches
          break;
      }
    }
    return className;
  }

  return (
    <div
      className={`${classes.bottleStyle}
                    ${props.isComplete ? classes.complete : ""}`}
      ref={bottleRef}  // Attach the ref to the bottle div
    >
      {props.contents.map((_, index) => (
        <div
          key={`${bottleNum}-liquid-${index}`}
          style={{ height: `100%`, zIndex: -1, maxHeight: `${maxChildHeight}px`, boxSizing: "border-box" }}
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
