import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import LevelFinishedScreen from "./LevelFinishedScreen";
import * as classes from "./GameScreen.module.css";
import * as functions from "./functions.js"

function GameScreen() {

  const [gameVars, setGameVars] = useState(functions.randomizeAll())
  const [bottleArray, setBottleArray] = useState([]);
  const [resetGame, setResetGame] = useState([]);
  const [bottlesComplete, setBottlesComplete] = useState([]);
  const [levelFinished, setLevelFinished] = useState(true);
  const [undoList, setUndoList] = useState([]);

  console.log('state updated')

  useEffect(() => {
    if (bottlesComplete.length && bottlesComplete.length === gameVars.numBottles && gameVars.numBottles !== 0) {
      setLevelFinished(true);
    }
  }, [bottlesComplete,gameVars.numBottles]);

  /* TODO THE PROBLEM IS HERE */
  useEffect(() => {
    if (!levelFinished) {
      initializeBottleArray();
    } 
  }, [levelFinished]);

  const initializeBottleArray = () => {

    setBottlesComplete([]);
    setUndoList([]);
    const allBottles = functions.createBottleArray(gameVars)
    setBottleArray(allBottles);
    const backup = structuredClone(allBottles);
    setResetGame(backup);
    setLevelFinished(false);
  };

  // resets the game to the beginning of the level
  const handleReset = () => {
    setBottleArray(resetGame);
    setBottlesComplete([]);
    setUndoList([]);
  };

  const handleNew = () => {
    initializeBottleArray();
  };

  const gotoLevelFinishedScreen = () => {
    setLevelFinished(true);
  };

  const passedProps = {
    newGame: handleNew,
    gameVars: gameVars,
    setGameVars:setGameVars
  };
  
  return (
    <>
      {levelFinished && <LevelFinishedScreen passedProps={passedProps}/>}
      {!levelFinished && (
        <>
          <BottleContainer
            bottleArray={bottleArray}
            setBottleArray={setBottleArray}
            bottlesComplete={bottlesComplete}
            setBottlesComplete={setBottlesComplete}
            bottleCapacity={gameVars?.bottleCapacity}
            setUndoList={setUndoList}
            undoList={undoList}
          />
          <button onClick={() => gotoLevelFinishedScreen()}>New Level</button>
          <button onClick={() => handleReset()} disabled={undoList?.length === 0}>
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

  /*
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
*/