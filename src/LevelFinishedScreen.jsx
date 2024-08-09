import { useState } from "react";
import * as classes from "./LevelFinishedScreen.module.css";
import ChangeStateButtons from "./ChangeStateButtons";
import InfoScreen from "./InfoScreen";
import * as functions from "./functions.js"

function LevelFinishedScreen(props) {
  const [randomScreen, setRandomScreen] = useState(true);
  const [infoShown, setInfoShown] = useState(false)

  const toggleRandomScreen = () => {
    setRandomScreen((random) => !random);
  };

  const toggleUncovered = () => {
    const newGameVar = structuredClone(props.passedProps.gameVars)
    newGameVar.beginUncovered = !props.passedProps.gameVars.beginUncovered;
    props.passedProps.setGameVars(newGameVar);
  };

  const newRandomizedGame = () => {
    props.passedProps.setGameVars( functions.randomizeAll());
    props.passedProps.newGame();
  };

  return (
    <>
      {randomScreen && !infoShown &&(
        <div className={classes.backdrop}>
          <div className={classes.initialScreenContent}>
            <div style={{display:"grid"}}>
              <button className={classes.infoButton} onClick={()=>setInfoShown(true)}>?</button>
              </div>
            <h1>Mysterious Liquids</h1>
            <div className={classes.modalBody}>
              <h2> New Level!</h2>
              <div className={classes.buttonContainer}>
                <button onClick={() => newRandomizedGame()}> Random Level</button>
                <button onClick={() => toggleRandomScreen()}>Custom Level</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!randomScreen && !infoShown && (
        <div className={classes.backdrop}>
          <div className={classes.modalBody}>
            <h2> Select Level</h2>
            <div className={classes.buttonContainer}>
              <ChangeStateButtons
                stateId="numBottles"
                labelText="Number of Bottles"
                state={props.passedProps.gameVars}
                setState={props.passedProps.setGameVars}
                minVal={functions.minMaxValues.numBottlesMin}
                maxVal={functions.minMaxValues.numBottlesMax}
              />
              <ChangeStateButtons
                stateId="bottleCapacity"
                labelText="Bottle Capacity"
                state={props.passedProps.gameVars}
                setState={props.passedProps.setGameVars}
                minVal={functions.minMaxValues.bottleCapacityMin}
                maxVal={functions.minMaxValues.bottleCapacityMax}
              />
              <ChangeStateButtons
                stateId="numEmptyBottles"
                labelText="Number of Empty"
                state={props.passedProps.gameVars}
                setState={props.passedProps.setGameVars}
                minVal={functions.minMaxValues.numEmptyBottlesMin}
                maxVal={functions.minMaxValues.numEmptyBottlesMax}
              />
              <div>
                <label htmlFor="beginUncovered">Mysterious Liquids</label>
                <input
                  id="beginUncovered"
                  type="checkbox"
                  onChange={() => toggleUncovered()}
                  checked={!props.passedProps.gameVars.beginUncovered}
                />
              </div>
              <div>
                <button onClick={() => props.passedProps.newGame()}> Play this level </button>
                <button onClick={() => props.passedProps.setGameVars(functions.randomizeAll())}> Randomize </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {infoShown && <InfoScreen setInfoShown={setInfoShown} />

      }
    </>
  );
}

export default LevelFinishedScreen;
