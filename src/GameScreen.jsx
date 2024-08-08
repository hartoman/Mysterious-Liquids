import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import LevelFinishedScreen from "./LevelFinishedScreen";
import * as classes from "./GameScreen.module.css";

const minMaxValues = {
  bottleCapacityMin: 2,
  bottleCapacityMax: 6,
  numBottlesMin: 2,
  numBottlesMax: 8,
  numEmptyBottlesMin: 2,
  numEmptyBottlesMax: 4,
};

function GameScreen() {
  const getRandomNumber = (min, max) => {
    if (min === max) {
      return min;
    } else {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };

  const getRandomBoolean = () => Math.random() < 0.5;

  const randomizeAll = () => {
    return {
      bottleCapacity:getRandomNumber(minMaxValues.bottleCapacityMin, minMaxValues.bottleCapacityMax),
      numBottles:getRandomNumber(minMaxValues.numBottlesMin, minMaxValues.numBottlesMax),
      numEmptyBottles:getRandomNumber(minMaxValues.numEmptyBottlesMin, minMaxValues.numEmptyBottlesMax),
      beginUncovered:getRandomBoolean()
    }    
  };

  const [gameVars, setGameVars] = useState(randomizeAll())
  const [bottleArray, setBottleArray] = useState([]);
  const [resetGame, setResetGame] = useState([]);
  const [bottlesComplete, setBottlesComplete] = useState([]);
  const [levelFinished, setLevelFinished] = useState(true);
  const [undoList, setUndoList] = useState([]);


  useEffect(() => {
    if (bottlesComplete.length === gameVars.numBottles && gameVars.numBottles !== 0) {
      setLevelFinished(true);
    }
  }, [bottlesComplete]);

  useEffect(() => {
    if (!levelFinished) {
      initializeBottleArray();
    } 
  }, [levelFinished]);

  const initializeBottleArray = () => {
    const allBottles = [];
    const totalLiquids = createTotalLiquids();

    setBottlesComplete([]);
    setUndoList([]);

    for (let i = 0; i < gameVars.numBottles; i++) {
      const bottle = [];
      for (let j = 0; j < gameVars.bottleCapacity; j++) {
        let randomIndex = getRandomNumber(0, totalLiquids.length - 1);
        let randomLiquid = totalLiquids[randomIndex];
        // make sure that we cannot begin with already sorted bottles
        if (j === gameVars.bottleCapacity - 1) {
          while (areAllElementsSame(bottle) && bottle[0].color === randomLiquid.color) {
            randomIndex = getRandomNumber(0, totalLiquids.length - 1);
            randomLiquid = totalLiquids[randomIndex];
          }
        }

        totalLiquids.splice(randomIndex, 1);
        bottle.push(randomLiquid);
      }
      allBottles.push(bottle);
    }

    // adds empty bottles
    for (let i = 0; i < gameVars.numEmptyBottles; i++) {
      const emptyBottle = [];
      allBottles.push(emptyBottle);
    }
    if (!gameVars.beginUncovered) {
      uncoverFirstLiquids(allBottles);
    }

    setBottleArray(allBottles);
    const backup = structuredClone(allBottles);
    setResetGame(backup);

    function areAllElementsSame(arr) {
      if (arr.length === 0) {
        return true;
      }
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].color !== arr[0].color) {
          return false;
        }
      }
      return true;
    }
    function createTotalLiquids() {
      const arr = [];
      for (let i = 0; i < gameVars.bottleCapacity; i++) {
        for (let j = 1; j < gameVars.numBottles + 1; j++) {
          const liquidDrop = {
            uncovered: gameVars.beginUncovered,
            color: j,
          };
          arr.push(liquidDrop);
        }
      }
      return arr;
    }
  };

  const uncoverFirstLiquids = (coveredArray) => {
    coveredArray.forEach((array) => {
      if (Array.isArray(array) && array.length > 0) {
        array[0].uncovered = true;
      }
    });
  };

  const handleNew = () => {
    initializeBottleArray();
    setLevelFinished(false);
  };

  // resets the game to the beginning of the level
  const handleReset = () => {
    setBottleArray(resetGame);
    setBottlesComplete([]);
    setUndoList([]);
  };

  // undo last move(s)
  const handleUndo = () => {
    if (undoList.length > 0) {
      const undoneBottleArray = structuredClone(bottleArray);

      const lastUndo = undoList[undoList.length-1];
      const numberLiquidsToUndo = lastUndo[2];
   
      for (let i = 0; i < numberLiquidsToUndo; i++){
        undoList.pop();
        const lastMovedLiquid = undoneBottleArray[lastUndo[1]].pop();
        undoneBottleArray[lastUndo[0]].unshift(lastMovedLiquid);
      }
      uncoverFirstLiquids(undoneBottleArray);

      if (bottlesComplete.includes(lastUndo[1])) {
        const newBottlesComplete = structuredClone(bottlesComplete);
        newBottlesComplete.pop();
        setBottlesComplete(newBottlesComplete);
      }
      setBottleArray(undoneBottleArray);
    }
  };


  const newGame = () => {
    setLevelFinished(true);
  };

  const passedProps = {
    newGame: handleNew,
    randomizeAll: randomizeAll,
    gameVars: gameVars,
    setGameVars:setGameVars
  };

  return (
    <>
      {levelFinished && <LevelFinishedScreen passedProps={passedProps} minMaxValues={minMaxValues} />}

      {!levelFinished && (
        <>
          <BottleContainer
            bottleArray={bottleArray}
            setBottleArray={setBottleArray}
            bottlesComplete={bottlesComplete}
            setBottlesComplete={setBottlesComplete}
            bottleCapacity={gameVars.bottleCapacity}
            setUndoList={setUndoList}
            undoList={undoList}
          />
          <button onClick={() => newGame()}>New Level</button>
          <button onClick={() => handleReset()} disabled={undoList.length === 0}>
            Start Over
          </button>
          <button onClick={() => handleUndo()} disabled={true}>
            Undo
          </button>
        </>
      )}
    </>
  );
}

export default GameScreen;
