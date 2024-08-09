export const minMaxValues = {
  bottleCapacityMin: 2,
  bottleCapacityMax: 6,
  numBottlesMin: 2,
  numBottlesMax: 8,
  numEmptyBottlesMin: 2,
  numEmptyBottlesMax: 4,
};

export const getRandomNumber = (min, max) => {
  if (min === max) {
    return min;
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

export const getRandomBoolean = () => Math.random() < 0.5;

export const randomizeAll = () => {
  return {
    bottleCapacity: getRandomNumber(minMaxValues.bottleCapacityMin, minMaxValues.bottleCapacityMax),
    numBottles: getRandomNumber(minMaxValues.numBottlesMin, minMaxValues.numBottlesMax),
    numEmptyBottles: getRandomNumber(minMaxValues.numEmptyBottlesMin, minMaxValues.numEmptyBottlesMax),
    beginUncovered: getRandomBoolean(),
  };
};

export const createBottleArray = (gameVars) => {
  const allBottles = [];
  const totalLiquids = createTotalLiquids();
  for (let i = 0; i < gameVars.numBottles; i++) {
    const bottle = [];
    for (let j = 0; j < gameVars.bottleCapacity; j++) {
      let randomIndex = getRandomNumber(0, totalLiquids.length - 1);
      let randomLiquid = totalLiquids[randomIndex];
      // make sure that we cannot begin with already sorted bottles
      if (j === gameVars.bottleCapacity - 1) {
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
  for (let i = 0; i < gameVars.numEmptyBottles; i++) {
    const emptyBottle = [];
    allBottles.push(emptyBottle);
  }
  if (!gameVars.beginUncovered) {
    uncoverFirstLiquids(allBottles);
  }
  return allBottles;

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
    for (let i = 0; i < gameVars.bottleCapacity; i++) {
      for (let j = 1; j < gameVars.numBottles + 1; j++) {
        const liquidDrop = {
          uncovered: gameVars.beginUncovered,
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
