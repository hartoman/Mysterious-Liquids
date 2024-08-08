import classes from "./ChangeStateButtons.module.css";

function ChangeStateButtons(props) {
  const increaseState = (increaseBy = 1) => {
    if (props.state[props.stateId] < props.maxVal) {
      const newGameVar = structuredClone(props.state);
      newGameVar[props.stateId] = props.state[props.stateId] + increaseBy;
      props.setState(newGameVar);
    }
  };
  const decreaseState = (decreaseBy = 1) => {
    if (props.state[props.stateId] > props.minVal) {
      const newGameVar = structuredClone(props.state);
      newGameVar[props.stateId] = props.state[props.stateId] - decreaseBy;
      props.setState(newGameVar);
    }
  };

  return (
    <>
      <label htmlFor={props.stateId}>{props.labelText}</label>
      <div id={props.stateId} className={classes.controlsContainer}>
        <button className={classes.controlButton} onClick={() => decreaseState()}>
          -
        </button>
        <div className={classes.displayState}>{props.state[props.stateId]}</div>
        <button className={classes.controlButton} onClick={() => increaseState()}>
          +
        </button>
      </div>
    </>
  );
}

export default ChangeStateButtons;
