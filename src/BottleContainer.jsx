import { useState, useEffect, useRef } from "react";
import Bottle from "./Bottle";
import * as classes from "./BottleContainer.module.css";

const screenHeight=window.screen.height;

function BottleContainer(props) {
  const [selectedBottles, setSelectedBottle] = useState([-1, -1]);
  const BOTTLE_CAPACITY = props.bottleCapacity;
  const height = (screenHeight*0.14)/(BOTTLE_CAPACITY*1.1)

  function handleClick(key) {
    if (selectedBottles[0] === -1) {
      setSelectedBottle((b) => [key, -1]); // if no bottle selected selects the origin bottle
      return;
    } else if (selectedBottles[0] === key) {
      setSelectedBottle((b) => [-1, -1]); // click an already selected bottle
      return;
    } else {
      // click the second bottle
      if (props.bottleArray[key].length >= BOTTLE_CAPACITY) {
        // target is full
        return;
      } else {
        //sets destination bottle
        setSelectedBottle((b) => [b[0], key]);
        setTimeout(() => setSelectedBottle((b) => [-1, -1]), 500);
      }
    }
  }

  useEffect(() => {
    if (!(selectedBottles[0] === -1 || selectedBottles[1] === -1)) {
      // here the liquids change bottle
      pourLiquidsToTargetBottle();
    }
  }, [selectedBottles]);

  // pours liquids from one bottle to another
  const pourLiquidsToTargetBottle = () => {
    const newState = [...props.bottleArray]; // Make a shallow copy of the state array
    const arrayOrigin = newState[selectedBottles[0]];
    const arrayDestination = newState[selectedBottles[1]];
    // you cannot pour on a different color
    if (arrayOrigin[0] != arrayDestination[0] && arrayDestination[0] != null) {
      return;
    }
    const freeSlots = arrayDestination - BOTTLE_CAPACITY;
    const originElement = arrayOrigin.shift(); // Remove the first element from the first subarray
    const topElement = originElement;
    arrayDestination.unshift(topElement); // Push the removed element into the third subarray
    props.setBottleArray(newState);
  };


  return (
    <div className={classes.container}>
      {props.bottleArray.map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`${classes.bottle} 
          ${index === selectedBottles[0] || index === selectedBottles[1] ? classes.selected : ""}`}
        >
          <Bottle contents={props.bottleArray[index]} height={height} />
        </div>
      ))}
    </div>
  );
}

export default BottleContainer;
