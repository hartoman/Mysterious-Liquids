import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import * as classes from "./GameScreen.module.css";

function GameScreen() {



    function handleNew() {
        
    }
    function handleReset() {
        
    }
    function handleUndo() {
        
    }
  return (
    <div>
      <BottleContainer />
      <button onClick={()=>handleNew()}>New Level</button>
      <button onClick={()=>handleReset()}>Reset</button>
      <button onClick={()=>handleUndo()}>Undo</button>
    </div>
  );
}

export default GameScreen;
