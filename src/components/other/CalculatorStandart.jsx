import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/CalculatorStandart.scss";

export default function CalculatorStandart() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Загружаем сохранённый результат при монтировании
  useEffect(() => {
    const savedResult = localStorage.getItem("calcStandardResult");
    if (savedResult !== null) {
      setResult(savedResult);
      setInput(savedResult); // <- изменение
    }
  }, []);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    localStorage.removeItem("calcStandardResult");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);

      // проверяем деление на 0
      if (!isFinite(evalResult)) {
        setResult("🧐🤯💥⚠️😁");
      } else {
        setResult(evalResult.toString());
        localStorage.setItem("calcStandardResult", evalResult.toString());
        setInput(evalResult.toString());
      }
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="calculator-standart">
      <h2>{t("project2.standard-full")}</h2>

      <div className="display">
        <div className="output">{result}</div>
        <div className="input">{input || "0"}</div>
      </div>

      <div className="buttons">
        <button className="clear" onClick={handleClear}>C</button>
        <button className="backspace" onClick={handleBackspace}>⌫</button>
        <button className="operator" onClick={() => handleClick("/")}>÷</button>
        <button className="operator" onClick={() => handleClick("*")}>×</button>

        <button className="numbers" onClick={() => handleClick("7")}>7</button>
        <button className="numbers" onClick={() => handleClick("8")}>8</button>
        <button className="numbers" onClick={() => handleClick("9")}>9</button>
        <button className="operator" onClick={() => handleClick("-")}>−</button>

        <button className="numbers" onClick={() => handleClick("4")}>4</button>
        <button className="numbers" onClick={() => handleClick("5")}>5</button>
        <button className="numbers" onClick={() => handleClick("6")}>6</button>
        <button className="operator" onClick={() => handleClick("+")}>+</button>

        <button className="numbers" onClick={() => handleClick("1")}>1</button>
        <button className="numbers" onClick={() => handleClick("2")}>2</button>
        <button className="numbers" onClick={() => handleClick("3")}>3</button>
        <button className="equal" onClick={handleCalculate}>=</button>

        <button className="numbers zero" onClick={() => handleClick("0")}>0</button>
        <button className="dot" onClick={() => handleClick(".")}>.</button>
      </div>
    </div>
  );
}
