import classes from "./ChangeStateButtons.module.css";

function ChangeStateButtons(props) {
    const increaseState = (increaseBy = 1) => {
        if (props.state<props.maxVal) {
            const increasedState = props.state + increaseBy;
            props.setState(increasedState);
      }
  };
    const decreaseState = (decreaseBy = 1) => {
        if (props.state > props.minVal) {
            const decreasedState = props.state - decreaseBy;
            props.setState(decreasedState);
        }
  };

  return (
    <>
      <label htmlFor={props.stateId}>{props.labelText}</label>
      <div id={props.stateId} className={classes.controlsContainer}>
        <button className={classes.controlButton} onClick={() => decreaseState()}>
          -
        </button>
        <div className={classes.displayState}>{props.state}</div>
        <button className={classes.controlButton} onClick={() => increaseState()}>
          +
        </button>
      </div>
    </>
  );
}

export default ChangeStateButtons;
