import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import LevelFinished from "./LevelFinished";
import * as classes from "./GameScreen.module.css";

function GameScreen() {
  const [BOTTLE_CAPACITY, NUM_BOTTLES, NUM_EMPTY_BOTTLES] = [4, 6, 2];
  const [bottleArray, setBottleArray] = useState([]);
  const [bottlesComplete, setBottlesComplete] = useState([]);
  const [levelFinished, setLevelFinished] = useState(false);
  //  const [resetGame, setResetGame] = useState([]);

  
  useEffect(() => {
    initializeBottleArray();
  }, []);

  useEffect(() => {
    if (bottlesComplete.length === NUM_BOTTLES) {
      setLevelFinished(true);
    }
  }, [bottlesComplete]);

  useEffect(() => {
    //  console.log("level complete!!!");
    
  }, [levelFinished]);



  function initializeBottleArray() {
    const allBottles = [];
    const totalLiquids = createTotalLiquids();
    setLevelFinished(false);
    setBottlesComplete([]);

    for (let i = 0; i < NUM_BOTTLES; i++) {
      const bottle = [];
      for (let j = 0; j < BOTTLE_CAPACITY; j++) {
        let randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
        let randomNum = totalLiquids[randomIndex];
        // make sure that we cannot begin with already sorted bottles
        if (j === BOTTLE_CAPACITY - 1) {
          while (areAllElementsSame(bottle) && bottle[0] === randomNum) {
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
    for (let i = 0; i < NUM_EMPTY_BOTTLES; i++) {
      const emptyBottle = [];
      allBottles.push(emptyBottle);
    }
    setBottleArray(allBottles);
    // setResetGame(allBottles)

    function randomNumberBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function areAllElementsSame(arr) {
      if (arr.length === 0) {
        return true;
      }
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[0]) {
          return false;
        }
      }
      return true;
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


  function handleNew() {
    initializeBottleArray();
  }

  //TODO FIX, AFTER 1ST MOVE DOESN'T WORK
  function handleReset() {

    //   setBottleArray(resetGame);
  }
  // TODO
  function handleUndo() { }

  const passedFunctions = {
    newGame : initializeBottleArray
  }

  return (
    <div>
      {levelFinished && <LevelFinished passedFunctions={passedFunctions} />}

      {!levelFinished &&
      <div>
      <BottleContainer
        bottleArray={bottleArray}
        setBottleArray={setBottleArray}
        bottlesComplete ={bottlesComplete}
        setBottlesComplete={setBottlesComplete}
        bottleCapacity={BOTTLE_CAPACITY}
      />
      <button onClick={() => handleNew()}>New Level</button>
      <button onClick={() => handleReset()}>
        Reset
      </button>
      <button onClick={() => handleUndo()} disabled>
        Undo
      </button>
      </div>}
    </div>
  );
}

export default GameScreen;
