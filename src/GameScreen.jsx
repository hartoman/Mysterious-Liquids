import { useState, useEffect, useRef } from "react";
import BottleContainer from "./BottleContainer";
import * as classes from "./GameScreen.module.css";

function GameScreen() {
    const [BOTTLE_CAPACITY, NUM_BOTTLES, NUM_EMPTY_BOTTLES] = [4, 4, 2];
    const [bottleArray, setBottleArray] = useState(initializeBottleArray());


    function initializeBottleArray() {
        const allBottles = [];
        const totalLiquids = createTotalLiquids();
    
        for (let i = 0; i < NUM_BOTTLES; i++) {
          const bottle = [];
          for (let j = 0; j < BOTTLE_CAPACITY; j++) {
            
            let randomIndex = randomNumberBetween(0, totalLiquids.length - 1);
            let randomNum = totalLiquids[randomIndex];
              // make sure that we cannot begin with already sorted bottles
            if (j === BOTTLE_CAPACITY - 1) {
              while (areAllElementsSame(bottle)&&bottle[0]===randomNum) {
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
        return allBottles;
    
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
        console.log(bottleArray)
        setBottleArray(b=>[...bottleArray,[0,0,0,4]])
        console.log(bottleArray)
    }

    function handleReset() {
        
    }
    function handleUndo() {
        
    }
  return (
    <div>
      <BottleContainer bottleArray={bottleArray} setBottleArray={ setBottleArray} bottleCapacity={BOTTLE_CAPACITY } />
      <button onClick={()=>handleNew()}>New Level</button>
      <button onClick={()=>handleReset()}>Reset</button>
      <button onClick={()=>handleUndo()}>Undo</button>
    </div>
  );
}

export default GameScreen;
