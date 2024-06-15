import { useState, useEffect, useRef } from "react";
import * as classes from "./LevelFinished.module.css";

function LevelFinished(props) {
  const [random, setRandom] = useState(true);

  const toggleRandom = () => {
    setRandom((random) => !random);
  };

  const toggleUncovered = () => {};

  return (
    <div>
      {random && (
        <div className={classes.backdrop}>
          <div className={classes.modalBody}>
            <h2> Level Complete!</h2>
            <div className={classes.buttonContainer}>
              <button onClick={() => props.passedFunctions.newGame()}>Random Level</button>
              <button onClick={() => toggleRandom()}>Custom Level</button>
            </div>
          </div>
        </div>
      )}
      {!random && (
        <div className={classes.backdrop}>
          <div className={classes.modalBody}>
            <h2> Select Level</h2>
            <div className={classes.buttonContainer}>
              <label htmlFor="numColors">Number of Colors</label>
              <div>
                <button>-</button>
                <input id="numColors" type="number" value={2} min="2" />
                <button>+</button>
              </div>

              <label htmlFor="numCapacity">Bottle Capacity</label>
              <div>
                <button>-</button>
                <input id="numCapacity" type="number" value={2} min="2" />
                <button>+</button>
              </div>

              <label htmlFor="numEmpty">Number of Empty</label>

              <div>
                <button>-</button>
                <input id="numEmpty" type="number" value={1} min="1" />
                <button>+</button>
              </div>

              <div>
                <label htmlFor="numEmpty">Mysterious Liquids</label>
                <input id="startCovered" type="checkbox" value={1} min="1" onChange={() => toggleUncovered()} />
              </div>

              <div>
                <button> Play this level </button>
                <button onClick={() => toggleRandom()}> Play Random </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LevelFinished;
