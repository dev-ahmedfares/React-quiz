
import { useReducer, useState } from "react";

function reducer(state,action) {
  switch (action.type) {
    case "inc" :
      return {...state, count:  state.count + state.step}
    case "dec" :
      return {...state, count:  state.count - state.step}
    case "input" :
      return {...state, count:  action.payload}
    case "step":
      return {...state,step: action.payload}
    case "reset":
      return {count:0,step:1}
    default: 
      throw new Error("no valid action")

  }


}


function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialValue = {count: 0, step: 1}
  const [value,dispatch] = useReducer(reducer,initialValue)
  const {count,step} = value


  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({type: "dec"})
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({type: "inc"})
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({type: "input", payload: Number(e.target.value)});
  };

  const defineStep = function (e) {
    dispatch({type: "step", payload: Number(e.target.value)});
  };

  const reset = function () {
    dispatch({type: "reset"});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
