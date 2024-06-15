import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import LevelFinished from "./LevelFinished";
import * as classes from "./GameScreen.module.css";

function GameScreen() {
  const [bottleCapacity, setBottleCapacity] = useState(4);
  const [numBottles, setNumBottles] = useState(3);
  const [numEmptyBottles, setEmptyBottles] = useState(2);
  const [beginUncovered, setBeginUncovered] = useState(true);
  const [bottleArray, setBottleArray] = useState([]);
  const [resetGame, setResetGame] = useState([]);
  const [bottlesComplete, setBottlesComplete] = useState([]);
  const [levelFinished, setLevelFinished] = useState(false);
  
  //  let resetGame = []

  useEffect(() => {
    initializeBottleArray();
  }, []);

  useEffect(() => {
    if (bottlesComplete.length === numBottles) {
      setLevelFinished(true);
    }
  }, [bottlesComplete]);

  useEffect(() => {
    //  console.log("level complete!!!");
    //setResetGame(structuredClone(bottleArray))
  }, [levelFinished]);

  function initializeBottleArray() {
    const allBottles = [];
    const totalLiquids = createTotalLiquids();
    setLevelFinished(false);
    setBottlesComplete([]);

    for (let i = 0; i < numBottles; i++) {
      const bottle = [];
      for (let j = 0; j < bottleCapacity; j++) {
        let randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
        let randomNum = totalLiquids[randomIndex];
        // make sure that we cannot begin with already sorted bottles
        if (j === bottleCapacity - 1) {
          while (areAllElementsSame(bottle) && bottle[0].color === randomNum) {
            randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
            randomNum = totalLiquids[randomIndex];
          }
        }

        totalLiquids.splice(randomIndex, 1);
        bottle.push(randomNum);
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
    const backup = structuredClone(allBottles)
    setResetGame(backup);

    function randomNumberBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
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

    function uncoverFirstLiquids(coveredArray) {
      coveredArray.forEach((array) => {
        if (Array.isArray(array) && array.length > 0) {
          array[0].uncovered = true;
        }
      });
    }
  }

  function handleNew() {
    initializeBottleArray();
  }

  //TODO FIX, AFTER 1ST MOVE DOESN'T WORK
  function handleReset() {
    setBottleArray(resetGame);
    setBottlesComplete([])
  }

  // TODO
  function handleUndo() {}

  const passedFunctions = {
    newGame: initializeBottleArray,
  };

  return (
    <div>
      {levelFinished && <LevelFinished passedFunctions={passedFunctions} />}

      {!levelFinished && (
        <div>
          <BottleContainer
            bottleArray={bottleArray}
            setBottleArray={setBottleArray}
            bottlesComplete={bottlesComplete}
            setBottlesComplete={setBottlesComplete}
            bottleCapacity={bottleCapacity}
          />
          <button onClick={() => handleNew()}>New Level</button>
          <button onClick={() => handleReset()}>Start Over</button>
          <button onClick={() => handleUndo()} disabled>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
