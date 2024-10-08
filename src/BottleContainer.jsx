import { useState, useEffect, useRef, useCallback } from "react";
import Bottle from "./Bottle";
import * as classes from "./BottleContainer.module.css";


function BottleContainer(props) {

  const [selectedBottles, setSelectedBottle] = useState([-1, -1]);
  const [isAnimating, setIsAnimating] = useState(-1);
  const BOTTLE_CAPACITY = props.bottleCapacity;
  let revertBottle;
  let finishingAnimation;

  useEffect(() => {
    props.initializeBottleArray()
},[])

  const handleClick = useCallback((key) => {
    
    if (isAnimating !== -1) {
      return
    }
    const isAlreadyComplete = props.bottlesComplete.includes(key);
    if (isAlreadyComplete) {
      console.log("bottle is already complete");
      return;
    }
    if (props.bottleArray[key].length === 0 && selectedBottles[0] === -1) {
      console.log("bottle is empty");
      return;
    }
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
        revertBottle = setTimeout(() => setSelectedBottle((b) => [-1, -1])
          , 500);
      }
    }
  },[props.bottleArray,selectedBottles,isAnimating,BOTTLE_CAPACITY])

  useEffect(() => {
    if (!(selectedBottles[0] === -1 || selectedBottles[1] === -1)) {
      // here the liquids change bottle
      pourLiquidsToTargetBottle();
      if (!props.undoList){
        updateUndoList()
      }
             
    }
  }, [selectedBottles]);

  useEffect(() => {
    if (props.bottleArray.length>0 && selectedBottles[1]!==-1) {
      checkIfBottleComplete();
    }
  }, [props.bottleArray,selectedBottles]);

   // Cleanup function to clear timeout if the component unmounts or if a new selection is made
   useEffect(() => {
    return () => {
      clearTimeout(revertBottle);
      clearTimeout(finishingAnimation);      
    }
}, []);

  let numTilesSameColorOfOrigin=1;
  // pours liquids from one bottle to another
  const pourLiquidsToTargetBottle = () => {
    const newState = structuredClone(props.bottleArray); // Make a deep copy
    const arrayOrigin = newState[selectedBottles[0]];
    const arrayDestination = newState[selectedBottles[1]];
  
    // you cannot pour on a different color
    if (arrayOrigin[0]!= null  && arrayDestination[0]!= null && arrayOrigin[0].color != arrayDestination[0].color  ) {
      return;
    }

    const freeSlotsInDestination = BOTTLE_CAPACITY - arrayDestination.length;
    numTilesSameColorOfOrigin = 1;
    for (let i = 1; i < arrayOrigin.length; i++) {
      if (arrayOrigin[i].color === arrayOrigin[0].color && arrayOrigin[i].uncovered) {
        numTilesSameColorOfOrigin++;
      } else {
        break;
      }
    }
    const numTilesToMove = Math.min(freeSlotsInDestination, numTilesSameColorOfOrigin);
    for (let i = 0; i < numTilesToMove; i++) {
      const originElement = arrayOrigin.shift(); // Remove the first element from the first subarray
      const topElement = originElement;
      arrayDestination.unshift(topElement); // Push the removed element into the third subarray
    }

    const index = selectedBottles[0]
    if (newState[index].length) {
      if (!newState[index][0].uncovered) {
        newState[index][0].uncovered = true;
      }
    }
    props.setBottleArray(newState);
  };

  const updateUndoList = () => {
    props.setUndoList(true)
}

  const checkIfBottleComplete = () => {
    const arrayDestination = props.bottleArray[selectedBottles[1]];
    const allSame = arrayDestination.every((element, _, arrayDestination) => element.color === arrayDestination[0].color);
    const allUncovered = arrayDestination.every((element, _, arrayDestination) => element.uncovered);
    const index = props.bottleArray.indexOf(arrayDestination);
    if (arrayDestination.length === BOTTLE_CAPACITY && allSame && allUncovered) {
      console.log("bottle complete!");
      setIsAnimating(index);
      // give the cool animation time to display
      finishingAnimation = setTimeout(() => {
        const bottleIndex = props.bottleArray.indexOf(arrayDestination);
        props.setBottlesComplete(prevBottlesComplete => [...prevBottlesComplete, bottleIndex]);
        setIsAnimating(-1)
      }, 750);
    }
  };

  return (
    <div>
    <div className={classes.container}>
      {props.bottleArray.map((_, index) => (
        <div
          key={`bottle-${index}`}

          onClick={() => handleClick(index)}
          className={`${classes.bottle} 
          ${index === selectedBottles[0] || index === selectedBottles[1] ? classes.selected : ""}

          `}
        >
          <Bottle
            bottleNum={`bottle-${index}`}
            contents={props.bottleArray[index]}
            maxCapacity={BOTTLE_CAPACITY}
            isComplete={props.bottlesComplete.includes(index) ? true : false}
            isAnimating={isAnimating === index ? true : false}
          />
        </div>
      ))}
      </div>
      </div>
  );
}

export default BottleContainer;
