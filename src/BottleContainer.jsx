import { useState, useEffect, useRef, useCallback } from "react";
import Bottle from "./Bottle";
import * as classes from "./BottleContainer.module.css";


function BottleContainer(props) {

  const [selectedBottles, setSelectedBottle] = useState([-1, -1]);
  const [isAnimating, setIsAnimating] = useState(-1);
  const BOTTLE_CAPACITY = props.bottleCapacity;
  const revertRef = useRef(null);
  const finishRef = useRef(null);

  useEffect(() => {
    props.initializeBottleArray();
  }, []);

  // helper that performs an immutable pour and returns updated array
  const pourLiquids = (fromIndex, toIndex, bottleArray) => {
    const newState = bottleArray.map((b) => [...b]); // shallow clone of subarrays
    const arrayOrigin = newState[fromIndex];
    const arrayDestination = newState[toIndex];

    // you cannot pour on a different color
    if (
      arrayOrigin[0] != null &&
      arrayDestination[0] != null &&
      arrayOrigin[0].color !== arrayDestination[0].color
    ) {
      return bottleArray; // nothing changed
    }

    const freeSlotsInDestination = BOTTLE_CAPACITY - arrayDestination.length;
    let numTilesSameColorOfOrigin = 1;
    for (let i = 1; i < arrayOrigin.length; i++) {
      if (
        arrayOrigin[i].color === arrayOrigin[0].color &&
        arrayOrigin[i].uncovered
      ) {
        numTilesSameColorOfOrigin++;
      } else {
        break;
      }
    }

    const numTilesToMove = Math.min(freeSlotsInDestination, numTilesSameColorOfOrigin);
    const moved = arrayOrigin.slice(0, numTilesToMove);
    newState[fromIndex] = arrayOrigin.slice(numTilesToMove);
    newState[toIndex] = [...moved, ...arrayDestination];

    if (newState[fromIndex].length && !newState[fromIndex][0].uncovered) {
      newState[fromIndex][0].uncovered = true;
    }

    return newState;
  };

  const handleClick = useCallback(
    (key) => {
      if (isAnimating !== -1) {
        return;
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
        setSelectedBottle([key, -1]); // origin selected
        return;
      } else if (selectedBottles[0] === key) {
        setSelectedBottle([-1, -1]); // deselect
        return;
      } else {
        // second bottle clicked
        if (props.bottleArray[key].length >= BOTTLE_CAPACITY) {
          return; // target full
        }

        const origin = selectedBottles[0];
        const dest = key;

        // show selection immediately for animation
        setSelectedBottle([origin, dest]);

        // perform pour synchronously in immutable way
        const updated = pourLiquids(origin, dest, props.bottleArray);
        props.setBottleArray(updated);
        if (!props.undoList) {
          updateUndoList();
        }

        // check completion now that we have the new state
        checkIfBottleCompleteWithState(updated, dest);

        // schedule deselection after a short delay (clear any existing timer first)
        clearTimeout(revertRef.current);
        revertRef.current = setTimeout(() => setSelectedBottle([-1, -1]), 500);
      }
    },
    [props.bottleArray, selectedBottles, isAnimating, BOTTLE_CAPACITY, props.undoList]
  );

  // selection effect removed; pour logic and undo update are handled synchronously in handleClick

  // completion effect removed; completion is checked immediately after pouring in handleClick

   // Cleanup function to clear timeout if the component unmounts or if a new selection is made
   useEffect(() => {
    return () => {
      clearTimeout(revertRef.current);
      clearTimeout(finishRef.current);
    };
  }, []);

  // old pour function removed; new immutable version defined earlier

  const updateUndoList = () => {
    props.setUndoList(true)
}

  // helper used after a pour is performed
  const checkIfBottleCompleteWithState = (state, destIndex) => {
    const arrayDestination = state[destIndex];
    const allSame = arrayDestination.every(
      (element, _, arr) => element.color === arr[0].color
    );
    const allUncovered = arrayDestination.every(
      (element) => element.uncovered
    );
    if (
      arrayDestination.length === BOTTLE_CAPACITY &&
      allSame &&
      allUncovered
    ) {
      console.log("bottle complete!");
      setIsAnimating(destIndex);
      // give the cool animation time to display
      finishRef.current = setTimeout(() => {
        props.setBottlesComplete((prev) => [...prev, destIndex]);
        setIsAnimating(-1);
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
