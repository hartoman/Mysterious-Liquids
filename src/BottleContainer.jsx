import { useState,useEffect,useRef } from "react";
import Bottle from "./Bottle";
import * as classes from "./BottleContainer.module.css";

function BottleContainer() {
  const [BOTTLE_CAPACITY, NUM_BOTTLES, NUM_EMPTY_BOTTLES] = [5,4,1];
  const [height, setHeight] = useState(0);
  const ref = useRef(null)
  const [bottleArray, setBottleArray] = useState(initializeBottleArray());
  const [selectedBottles, setSelectedBottle] = useState([-1, -1]);

  function initializeBottleArray() {
    const allBottles = [];
    const totalLiquids = createTotalLiquids();

    for (let i = 0; i < NUM_BOTTLES; i++) {
      const bottle = [];
      for (let j = 0; j < BOTTLE_CAPACITY; j++) {
        const randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
        const randomNum = totalLiquids[randomIndex];
        totalLiquids.splice(randomIndex, 1);
        bottle.push(randomNum);
      }
      allBottles.push(bottle);
    }
    // adds empty bottles
    for (let i = 0; i < NUM_EMPTY_BOTTLES; i++) {
      const emptyBottle = [];
      allBottles.push(emptyBottle);
    }
    return allBottles;

    function randomNumberBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createTotalLiquids() {
      const arr = [];
      for (let i = 0; i < BOTTLE_CAPACITY; i++) {
        for (let j = 1; j < NUM_BOTTLES + 1; j++) {
          arr.push(j);
        }
      }
      return arr;
    }
  }

  function handleClick(key) {
    if (selectedBottles[0] === -1) {
      setSelectedBottle((b) => [key, -1]); // if no bottle selected selects the origin bottle
      return;
    } else if (selectedBottles[0] === key) {
      setSelectedBottle((b) => [-1, -1]); // click an already selected bottle
      return;
    } else {
      // click the second bottle
      if (bottleArray[key].length >= BOTTLE_CAPACITY) {
      // target is full
        return;
      } else {  //sets destination bottle

        setSelectedBottle((b) => [b[0], key]);
        
       setTimeout(() => setSelectedBottle((b) => [-1, -1]), 500);
      }
    }
  }

  useEffect(() => { 
    if (!(selectedBottles[0]===-1||selectedBottles[1]===-1)) {
      // here the liquids change bottle
      pourLiquidsToTargetBottle()
    }
  }, [selectedBottles])
  
  // pours liquids from one bottle to another
  const pourLiquidsToTargetBottle = () => {
    const newState = [...bottleArray]; // Make a shallow copy of the state array
    const indexOrigin = selectedBottles[0]
    const originElement = newState[indexOrigin].shift(); // Remove the first element from the first subarray
    const topElement = originElement
    const indexDestination = selectedBottles[1]
    newState[indexDestination].unshift(topElement); // Push the removed element into the third subarray
    setBottleArray(newState);
  };

  // sets the height of each drop of liquid in the bottles
  useEffect(() => {
    setHeight(ref.current.clientHeight/(BOTTLE_CAPACITY+1))
  })

  return (
    <div className={classes.container} ref={ref}>
      {bottleArray.map((liquids, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`${classes.bottle} 
          ${index === selectedBottles[0] || index === selectedBottles[1] ? classes.selected : ""}`}
        >
          <Bottle contents={bottleArray[index]} height={height} />
        </div>
      ))}
    </div>
  );
}

export default BottleContainer;
