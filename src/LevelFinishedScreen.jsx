import { useState } from "react";
import * as classes from "./LevelFinishedScreen.module.css";
import ChangeStateButtons from "./ChangeStateButtons";

function LevelFinishedScreen(props) {
  const [randomScreen, setRandomScreen] = useState(true);

  const toggleRandomScreen = () => {
    setRandomScreen((random) => !random);
  };


  const toggleUncovered = () => {
    const reverseUncovered = !props.passedProps.states.beginUncovered;
    props.passedProps.setStates.setBeginUncovered(reverseUncovered);
  };

  const newRandomizedGame = () => {
    props.passedProps.randomizeAll()
    props.passedProps.newGame()
  }
  

  return (
    <div>
      {randomScreen && (
        <div className={classes.backdrop}>
          <div className={classes.modalBody}>
            <h2> New Level!</h2>
            <div className={classes.buttonContainer}>
              <button onClick={() => newRandomizedGame()}> Random Level</button>
              <button onClick={() => toggleRandomScreen()}>Custom Level</button>
            </div>
          </div>
        </div>
      )}
      {!randomScreen && (
        <div className={classes.backdrop}>
          <div className={classes.modalBody}>
            <h2> Select Level</h2>
            <div className={classes.buttonContainer}>
              <ChangeStateButtons
                stateId="numColors"
                labelText="Number of Bottles"
                state={props.passedProps.states.numBottles}
                setState={props.passedProps.setStates.setNumBottles}
                minVal={props.minMaxValues.numBottlesMin}
                maxVal={props.minMaxValues.numBottlesMax}
              />
              <ChangeStateButtons
                stateId="capacity"
                labelText="Bottle Capacity"
                state={props.passedProps.states.bottleCapacity}
                setState={props.passedProps.setStates.setBottleCapacity}
                minVal={props.minMaxValues.bottleCapacityMin}
                maxVal={props.minMaxValues.bottleCapacityMax}
              />
              <ChangeStateButtons
                stateId="numEmpty"
                labelText="Number of Empty"
                state={props.passedProps.states.numEmptyBottles}
                setState={props.passedProps.setStates.setEmptyBottles}
                minVal={props.minMaxValues.numEmptyBottlesMin}
                maxVal={props.minMaxValues.numEmptyBottlesMax}
              />
              <div>
                <label htmlFor="startCovered">Mysterious Liquids</label>
                <input id="startCovered" type="checkbox" onChange={() => toggleUncovered()} checked={!props.passedProps.states.beginUncovered} />
              </div>
              <div>
                <button onClick={() => props.passedProps.newGame()}> Play this level </button>
                <button onClick={() => props.passedProps.randomizeAll()}> Randomize </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelFinishedScreen;
