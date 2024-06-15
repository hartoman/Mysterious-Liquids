import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import LevelFinished from "./LevelFinished";
import * as classes from "./GameScreen.module.css";

function GameScreen() {
  const [bottleCapacity, setBottleCapacity] = useState(2);
  const [numBottles, setNumBottles] = useState(2);
  const [numEmptyBottles, setEmptyBottles] = useState(2);
  const [beginUncovered, setBeginUncovered] = useState(true);
  const [bottleArray, setBottleArray] = useState([]);
  const [resetGame, setResetGame] = useState([]);
  const [bottlesComplete, setBottlesComplete] = useState([]);
  const [levelFinished, setLevelFinished] = useState(true);
  const [undoList,setUndoList]=useState([])
  
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

  const initializeBottleArray= ()=> {
    const allBottles = [];
    const totalLiquids = createTotalLiquids();
    setLevelFinished(false);
    setBottlesComplete([]);
    setUndoList([])

    for (let i = 0; i < numBottles; i++) {
      const bottle = [];
      for (let j = 0; j < bottleCapacity; j++) {
        let randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
        let randomLiquid = totalLiquids[randomIndex];
        // make sure that we cannot begin with already sorted bottles   
        if (j === bottleCapacity - 1) {
          while (areAllElementsSame(bottle) && bottle[0].color === randomLiquid.color) {
            randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
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

    const uncoverFirstLiquids=(coveredArray)=> {
      coveredArray.forEach((array) => {
        if (Array.isArray(array) && array.length > 0) {
          array[0].uncovered = true;
        }
      });
    }
  }

  const handleNew= ()=> {
    initializeBottleArray();
  }

  // resets the game to the beginning of the level
  const handleReset=()=> {
    setBottleArray(resetGame);
    setBottlesComplete([])
    setUndoList([])
  }

  // undo last move(s)
  const handleUndo=()=> {
    if (undoList.length > 0) {
      const lastUndo = undoList.pop();
      const undoneBottleArray = structuredClone(bottleArray)
      const lastMovedLiquid = undoneBottleArray[lastUndo[1]].pop()
      undoneBottleArray[lastUndo[0]].unshift(lastMovedLiquid)
      setBottleArray(undoneBottleArray)
        if (bottlesComplete.includes(lastUndo[1])) {
        const newBottlesComplete = structuredClone(bottlesComplete)
        newBottlesComplete.pop()
        setBottlesComplete(newBottlesComplete)
      }
    }


  }

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
            setUndoList={setUndoList}
            undoList={undoList}
          />
          <button onClick={() => handleNew()}>New Level</button>
          <button onClick={() => handleReset()} disabled={undoList.length === 0}>Start Over</button>
          <button onClick={() => handleUndo()} disabled={undoList.length === 0}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
