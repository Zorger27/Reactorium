import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/CalculatorStandart.scss";

export default function CalculatorStandart() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="calculator-standart">
      <h2>{t("project2.standard-full")}</h2>

      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="output">{result}</div>
      </div>

      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={() => handleClick("/")}>÷</button>
        <button onClick={() => handleClick("*")}>×</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("-")}>−</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button className="equal" onClick={handleCalculate}>=</button>

        <button className="zero" onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
      </div>
    </div>
  );
}
