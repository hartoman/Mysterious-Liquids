import { useEffect, useRef, useState, useMemo } from "react";
import * as classes from "./Bottle.module.css";

function Bottle(props) {
  const bottleNum = props.bottleNum;
  const bottleRef = useRef(null); 
  const [maxChildHeight, setMaxChildHeight] = useState(0); 

  useEffect(() => {
    const updateMaxChildHeight = () => {
      if (bottleRef.current) {
        const bottleHeight = bottleRef.current.clientHeight; 
        setMaxChildHeight(Math.floor(bottleHeight / props.maxCapacity)); 
      }
    };

    updateMaxChildHeight(); // Initial call

    window.addEventListener('resize', updateMaxChildHeight);

    return () => {
      window.removeEventListener('resize', updateMaxChildHeight); 
    };
  }, [props.maxCapacity]); 

  const getClassName = useMemo(() => (index) => {
    if (!props.contents[index]?.uncovered) {
      return classes.hidden;
    } else {
      const color = props.contents[index]?.color;
      switch (color) {
        case 1:
          return classes.yellow;
        case 2:
          return classes.green;
        case 3:
          return classes.blue;
        case 4:
          return classes.red;
        case 5:
          return classes.purple;
        case 6:
          return classes.turquoise;
        case 7:
          return classes.white;
        case 8:
          return classes.orange;
        default:
          return ''; 
      }
    }
  }, [props.contents]);  // It's good to memoize the function, but contents is quite dynamic

const getAnimationDelay = useMemo(() => (index) => {
  if (!props.contents[index]?.uncovered) {
    return {};
  }
  const randomDelay = Math.floor(Math.random() * -15);
  return {
    '--random-delay': `${randomDelay}s`
  };
}, [props.contents]);

  return (
    <div
      className={`${classes.bottleStyle} ${props.isComplete ? classes.complete : ""}`}
      ref={bottleRef}  
    >
      {props.contents.map((_, index) => (
        <div
          key={`${bottleNum}-liquid-${index}`}
          style={{ height: `100%`, maxHeight: `${maxChildHeight}px`,
  ...getAnimationDelay(index)}}
          className={`
            ${getClassName(index)}
            ${props.isAnimating ? classes.finishing : "bubbles"}            
          `}
        ></div>
      ))}
    </div>
  );
}

export default Bottle;
