import { useState } from "react";
import CalculatorButton from "../components/CalculatorButton";
import { addHistory } from "../utils/history";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [waitingForNumber, setWaitingForNumber] = useState(false);
  const [error, setError] = useState("");

  const handleNumber = (number) => {
    setError("");

    if (waitingForNumber) {
      setDisplay(number);
      setWaitingForNumber(false);
      return;
    }

    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleDecimal = () => {
    setError("");

    if (waitingForNumber) {
      setDisplay("0.");
      setWaitingForNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculateResult = (nextOperator = "") => {
    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(display);

    if (
      Number.isNaN(firstNumber) ||
      Number.isNaN(secondNumber) ||
      !operator
    ) {
      setError("Invalid calculation");
      return false;
    }

    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;

      case "−":
        result = firstNumber - secondNumber;
        break;

      case "×":
        result = firstNumber * secondNumber;
        break;

      case "÷":
        if (secondNumber === 0) {
          setError("Cannot divide by zero");
          return false;
        }
        result = firstNumber / secondNumber;
        break;

      default:
        setError("Invalid calculation");
        return false;
    }

    result = Number(result.toFixed(10));

    const calculation = `${firstNumber} ${operator} ${secondNumber}`;
    addHistory(calculation, result);

    setDisplay(String(result));
    setPreviousNumber("");
    setOperator(nextOperator);
    setWaitingForNumber(true);
    return true;
  };

  const handleOperator = (selectedOperator) => {
    setError("");

    const currentNumber = parseFloat(display);

    if (Number.isNaN(currentNumber)) {
      setError("Invalid calculation");
      return;
    }

    if (operator && previousNumber !== "" && !waitingForNumber) {
      const completed = calculateResult(selectedOperator);
      if (completed) {
        setOperator(selectedOperator);
      }
      return;
    }

    setPreviousNumber(display);
    setOperator(selectedOperator);
    setWaitingForNumber(true);
  };

  const handleEquals = () => {
    if (!operator || previousNumber === "") return;
    calculateResult();
  };

  const handlePercentage = () => {
    setError("");

    const number = parseFloat(display);

    if (Number.isNaN(number)) {
      setError("Invalid calculation");
      return;
    }

    setDisplay(String(number / 100));
  };

  const handleDelete = () => {
    setError("");

    if (waitingForNumber) return;

    if (display.length <= 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousNumber("");
    setOperator("");
    setWaitingForNumber(false);
    setError("");
  };

  return (
    <div className="flex min-h-[calc(100vh-81px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Simple Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Perform calculations and save your history
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-slate-800 p-5 shadow-xl">
          <div className="mb-5 rounded-2xl bg-slate-900 p-5 text-right">
            <div className="mb-2 min-h-[24px] text-sm text-slate-400">
              {previousNumber && operator
                ? `${previousNumber} ${operator}`
                : ""}
            </div>

            <div className="min-h-[56px] break-all text-4xl font-bold text-white">
              {display}
            </div>

            {error && (
              <div className="mt-2 text-sm font-medium text-red-400">
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            <CalculatorButton
              onClick={handleClear}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              AC
            </CalculatorButton>

            <CalculatorButton
              onClick={handleDelete}
              className="bg-slate-600 text-white hover:bg-slate-500"
            >
              DEL
            </CalculatorButton>

            <CalculatorButton
              onClick={handlePercentage}
              className="bg-slate-600 text-white hover:bg-slate-500"
            >
              %
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleOperator("÷")}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              ÷
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("7")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              7
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("8")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              8
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("9")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              9
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleOperator("×")}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              ×
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("4")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              4
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("5")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              5
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("6")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              6
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleOperator("−")}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              −
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("1")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              1
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("2")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              2
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("3")}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              3
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleOperator("+")}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              +
            </CalculatorButton>

            <CalculatorButton
              onClick={() => handleNumber("0")}
              className="col-span-2 bg-slate-700 text-white hover:bg-slate-600"
            >
              0
            </CalculatorButton>

            <CalculatorButton
              onClick={handleDecimal}
              className="bg-slate-700 text-white hover:bg-slate-600"
            >
              .
            </CalculatorButton>

            <CalculatorButton
              onClick={handleEquals}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              =
            </CalculatorButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;