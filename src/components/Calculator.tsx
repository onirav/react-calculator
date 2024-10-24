import { useState } from "react";
import "../styles/calc.css";
import CalculatorButton from "./CalculatorButton";
import { Control } from "../utils/types";
import { FormatValue } from "../utils/helpers";
import HistoryPanel from "./HistoryPanel";

const Calculator: React.FC = () => {
  const [screenValue, setScreenValue] = useState<string>("0");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [operator, setOperator] = useState<string | null>(null);
  const [previousInput, setPreviousInput] = useState<string>("");
  const [resetScreen, setResetScreen] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const controls: Control[] = [
    { controlId: "reset", controlText: "AC", controlType: "reset" },
    { controlId: "clear", controlText: "C", controlType: "clear" },
    { controlId: "divide", controlText: "/", controlType: "operator" },
    { controlId: "seven", controlText: "7", controlType: "number" },
    { controlId: "eight", controlText: "8", controlType: "number" },
    { controlId: "nine", controlText: "9", controlType: "number" },
    { controlId: "multiply", controlText: "*", controlType: "operator" },
    { controlId: "four", controlText: "4", controlType: "number" },
    { controlId: "five", controlText: "5", controlType: "number" },
    { controlId: "six", controlText: "6", controlType: "number" },
    { controlId: "subtract", controlText: "-", controlType: "operator" },
    { controlId: "one", controlText: "1", controlType: "number" },
    { controlId: "two", controlText: "2", controlType: "number" },
    { controlId: "three", controlText: "3", controlType: "number" },
    { controlId: "plus", controlText: "+", controlType: "operator" },
    { controlId: "zero", controlText: "0", controlType: "number" },
    { controlId: "dot", controlText: ".", controlType: "number" },
    { controlId: "equals", controlText: "=", controlType: "equal" },
  ];

  const handleClick = (control: Control) => {
    switch (control.controlType) {
      case "number":
        handleNumberClick(control.controlText);
        break;
      case "operator":
        handleOperatorClick(control.controlText);
        break;
      case "decimal":
        handleDecimalClick();
        break;
      case "equal":
        handleEqualClick();
        break;
      case "clear":
        handleResetClick("clear");
        break;
      default:
        handleResetClick("reset");
    }
  };

  // Handle number button clicks
  const handleNumberClick = (num: string) => {
    if (resetScreen) {
      setScreenValue(num);
      setResetScreen(false);
    } else {
      setScreenValue((prevValue) =>
        prevValue === "0" ? num : prevValue + num
      );
    }
    setCurrentInput((prev) => prev + num);
  };

  // Handle operator button clicks
  const handleOperatorClick = (op: string) => {
    setOperator(op);
    if (operator && currentInput === "") {
      return;
    }
    if (currentInput !== "") {
      if (previousInput !== "") {
        calculateResult();
      } else {
        setPreviousInput(screenValue);
      }
      setCurrentInput("");
      setResetScreen(true);
    }
  };

  // Handle decimal button click
  const handleDecimalClick = () => {
    if (!currentInput.includes(".")) {
      setScreenValue((prevValue) => prevValue + ".");
      setCurrentInput((prev) => prev + ".");
    }
  };

  // Handle equal button click
  const handleEqualClick = () => {
    if (operator && currentInput !== "") {
      calculateResult();
      setPreviousInput("");
      setOperator(null);
    }
  };

  // Handle clear button click
  const handleResetClick = (type: "reset" | "clear") => {
    if (type === "reset") {
      setScreenValue("0");
      setCurrentInput("");
      setOperator(null);
      setPreviousInput("");
      setResetScreen(false);
      setHistory([]);
    } else {
      setCurrentInput((prev) => prev.slice(0, -1) || "0");
      setScreenValue((prev) => prev.slice(0, -1) || "0");
    }
  };

  // Calculate the result
  const calculateResult = () => {
    const current = parseFloat(currentInput);
    const previous = parseFloat(previousInput);

    let result: number;
    switch (operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "/":
        result = previous / current;
        break;
      case "*":
        result = previous * current;
        break;
      default:
        result = current;
    }

    // Format results
    result = parseFloat(result.toFixed(2));

    const operationString = `${previous} ${operator} ${current} = ${result}`;
    setHistory((prev) => [...prev, operationString]); // Add to history

    setScreenValue(result.toString());
    setPreviousInput(result.toString());
    setCurrentInput(result.toString());
    setResetScreen(true);
  };

  return (
    <div className="container">
      <span className="btn" onClick={() => setDrawerOpen(!drawerOpen)}>
        History
      </span>
      <div className="calculator">
        <div className="screen">{FormatValue(screenValue)}</div>
        <div className="controls">
          {controls.map((control, index) => (
            <CalculatorButton
              key={index}
              controlId={control.controlId}
              controlText={control.controlText}
              onClick={() => handleClick(control)}
            />
          ))}
        </div>
      </div>
      <HistoryPanel
        history={history}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)} // Close function for the panel
      />
    </div>
  );
};

export default Calculator;
