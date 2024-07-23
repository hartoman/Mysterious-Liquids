import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import LevelFinishedScreen from "./LevelFinishedScreen";
import * as classes from "./GameScreen.module.css";

const minMaxValues = {
  bottleCapacityMin: 2,
  bottleCapacityMax: 6,
  numBottlesMin: 2,
  numBottlesMax: 8,
  numEmptyBottlesMin: 1,
  numEmptyBottlesMax: 3,
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

  const [bottleCapacity, setBottleCapacity] = useState(
    getRandomNumber(minMaxValues.bottleCapacityMin, minMaxValues.bottleCapacityMax)
  );
  const [numBottles, setNumBottles] = useState(getRandomNumber(minMaxValues.numBottlesMin, minMaxValues.numBottlesMax));
  const [numEmptyBottles, setEmptyBottles] = useState(
    getRandomNumber(minMaxValues.numEmptyBottlesMin, minMaxValues.numEmptyBottlesMax)
  );
  const [beginUncovered, setBeginUncovered] = useState(getRandomBoolean());
  const [bottleArray, setBottleArray] = useState([]);
  const [resetGame, setResetGame] = useState([]);
  const [bottlesComplete, setBottlesComplete] = useState([]);
  const [levelFinished, setLevelFinished] = useState(true);
  const [undoList, setUndoList] = useState([]);

  useEffect(() => {
    //   initializeBottleArray()
  }, [bottleCapacity]);

  useEffect(() => {
    if (bottlesComplete.length === numBottles && numBottles !== 0) {
      setLevelFinished(true);
    }
  }, [bottlesComplete]);

  useEffect(() => {
    //  console.log("level complete!!!");
    //setResetGame(structuredClone(bottleArray))
    initializeBottleArray();
  }, [levelFinished]);

  const initializeBottleArray = () => {
    const allBottles = [];
    const totalLiquids = createTotalLiquids();

    setBottlesComplete([]);
    setUndoList([]);

    for (let i = 0; i < numBottles; i++) {
      const bottle = [];
      for (let j = 0; j < bottleCapacity; j++) {
        let randomIndex = getRandomNumber(0, totalLiquids.length - 1);
        let randomLiquid = totalLiquids[randomIndex];
        // make sure that we cannot begin with already sorted bottles
        if (j === bottleCapacity - 1) {
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
    for (let i = 0; i < numEmptyBottles; i++) {
      const emptyBottle = [];
      allBottles.push(emptyBottle);
    }
    if (!beginUncovered) {
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
      for (let i = 0; i < bottleCapacity; i++) {
        for (let j = 1; j < numBottles + 1; j++) {
          const liquidDrop = {
            uncovered: beginUncovered,
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
      const lastUndo = undoList.pop();
      const undoneBottleArray = structuredClone(bottleArray);
      const lastMovedLiquid = undoneBottleArray[lastUndo[1]].pop();
      undoneBottleArray[lastUndo[0]].unshift(lastMovedLiquid);
      uncoverFirstLiquids(undoneBottleArray);

      if (bottlesComplete.includes(lastUndo[1])) {
        const newBottlesComplete = structuredClone(bottlesComplete);
        newBottlesComplete.pop();
        setBottlesComplete(newBottlesComplete);
      }
      setBottleArray(undoneBottleArray);
    }
  };

  const randomizeAll = () => {
    setEmptyBottles((e) => getRandomNumber(minMaxValues.numEmptyBottlesMin, minMaxValues.numEmptyBottlesMax));
    setBeginUncovered((u) => getRandomBoolean()) /
      setNumBottles((n) => getRandomNumber(minMaxValues.numBottlesMin, minMaxValues.numBottlesMax));
    setBottleCapacity((b) => getRandomNumber(minMaxValues.bottleCapacityMin, minMaxValues.bottleCapacityMax));
  };

  const newRandomGame = () => {
    //  randomizeAll()
    //  initializeBottleArray()
    setLevelFinished(true);
  };

  const passedProps = {
    newGame: handleNew,
    randomizeAll: randomizeAll,
    setStates: {
      setBottleCapacity: setBottleCapacity,
      setNumBottles: setNumBottles,
      setEmptyBottles: setEmptyBottles,
      setBeginUncovered: setBeginUncovered,
    },
    states: {
      bottleCapacity: bottleCapacity,
      numBottles: numBottles,
      numEmptyBottles: numEmptyBottles,
      beginUncovered: beginUncovered,
    },
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
            bottleCapacity={bottleCapacity}
            setUndoList={setUndoList}
            undoList={undoList}
          />
          <button onClick={() => newRandomGame()}>New Level</button>
          <button onClick={() => handleReset()} disabled={undoList.length === 0}>
            Start Over
          </button>
          <button onClick={() => handleUndo()} disabled={undoList.length === 0}>
            Undo
          </button>
        </>
      )}
    </>
  );
}

export default GameScreen;
