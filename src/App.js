import Button from "./components/Button";
import "./style.css";
import audioFile from "./asset/sound.mp3";
import { useState } from "react";
function App() {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isPrank, setIsPrank] = useState(false);
  const operators = ["+", "-", "/", "%", "*"];

  const handleOnClick = (val) => {
    //Reset to initial state
    setIsPrank(false);
    //checking if first input is  not in operator array
    if (operators.includes(val) && !strToDisplay.length) {
      return;
    }
    //Checking if last char is operator then not being able to add another operator without some number
    if (operators.includes(val)) {
      setLastOperator(val);
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1) + val);
      } else {
        setStrToDisplay(strToDisplay + val);
      }
      return;
    }

    // To reset the calc
    if (val === "AC") {
      setStrToDisplay("");
      setLastOperator("");
      return;
    }

    // To delete the last value
    if (val === "C") {
      setStrToDisplay(strToDisplay.slice(0, -1));
      return;
    }

    // To evalute the string after checking last char of string if its umber or not
    if (val === "=") {
      const lastChar = strToDisplay.slice(-1);
      if (operators.includes(lastChar)) {
        return;
      }
      setStrToDisplay(eval(strToDisplay).toString());
      total(strToDisplay);
      return;
    }
    // To check if . is valid or not
    if (val === ".") {
      //checking if there is some value in string or not
      if (!strToDisplay.length) {
        return;
      }
      //checking if alredy last char is last
      const lastChar = strToDisplay.slice(-1);
      if (lastChar === ".") {
        return;
      }
      //checking if last char is . and value is any operator
      if (lastChar === "." && operators.includes(val)) {
        return;
      }
      //checking if there is no operator in string and no previous .
      if (!lastOperator) {
        if (strToDisplay.includes(".")) {
          return;
        }
      }
      const indexLastOperator = strToDisplay.lastIndexOf(lastOperator);
      const afterOperator = strToDisplay.slice(indexLastOperator);
      // checking if there is some operator in string and already .exists
      if (lastOperator) {
        if (afterOperator.includes(".")) {
          return;
        }
      }
    }
    setStrToDisplay(strToDisplay + val);
  };
  const randomNum = () => {
    const num = Math.round(Math.random() * 10);
    return num <= 3 ? num : 0;
  };
  const total = (displayValue) => {
    const prankVal = randomNum();
    if (prankVal) {
      setIsPrank(true);
      const audio = new Audio(audioFile);
      audio.play();
      const newValue = eval(displayValue) + prankVal;
      setStrToDisplay(newValue.toString());
    } else {
      setStrToDisplay(eval(displayValue).toString());
    }
  };
  const buttons = [
    { cls: "btn btn-ac", label: "AC" },
    { cls: "btn btn-c", label: "C" },
    { cls: "btn btn-per", label: "%" },
    { cls: "btn btn-divide", label: "/" },
    { cls: "btn btn-7", label: "7" },
    { cls: "btn btn-8", label: "8" },
    { cls: "btn btn-9", label: "9" },
    { cls: "btn btn-*", label: "*" },
    { cls: "btn btn-4", label: "4" },
    { cls: "btn btn-5", label: "5" },
    { cls: "btn btn-6", label: "6" },
    { cls: "btn btn-minus", label: "-" },
    { cls: "btn btn-1", label: "1" },
    { cls: "btn btn-2", label: "2" },
    { cls: "btn btn-3", label: "3" },
    { cls: "btn btn-plus", label: "+" },
    { cls: "btn btn-0", label: "0" },
    { cls: "btn btn-dot", label: "." },
    { cls: "btn btn-equals", label: "=" },
  ];
  return (
    <div className="wrapper">
      <div className="calculator">
        <div className={isPrank ? "display prank" : "display"}>
          {strToDisplay}
        </div>
        {buttons.map((item, index) => {
          return (
            <Button cls={item.cls} label={item.label} handler={handleOnClick} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
