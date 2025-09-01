import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/CalculatorFinance.scss";

export default function CalculatorFinance() {
  const { t } = useTranslation();

  // значения берём сначала из localStorage, если они есть
  const [amount, setAmount] = useState(localStorage.getItem("finance_amount") || "");
  const [rate, setRate] = useState(localStorage.getItem("finance_rate") || "");
  const [years, setYears] = useState(localStorage.getItem("finance_years") || "");
  const [result, setResult] = useState(null);

  // сохраняем значения в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("finance_amount", amount);
  }, [amount]);

  useEffect(() => {
    localStorage.setItem("finance_rate", rate);
  }, [rate]);

  useEffect(() => {
    localStorage.setItem("finance_years", years);
  }, [years]);

  const calculate = () => {
    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate) / 100;
    const time = parseInt(years);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(time) || principal < 100) {
      setResult(t("project2.message"));
      return;
    }

    // формула сложных процентов
    const futureValue = principal * Math.pow(1 + interestRate, time);
    setResult(futureValue.toFixed(2));
  };

  // очистка конкретного поля
  const clearField = (field) => {
    if (field === "amount") {
      setAmount("");
      localStorage.removeItem("finance_amount");
    }
    if (field === "rate") {
      setRate("");
      localStorage.removeItem("finance_rate");
    }
    if (field === "years") {
      setYears("");
      localStorage.removeItem("finance_years");
    }
    setResult(null);
  };

  // очистить всё
  const clearAll = () => {
    setAmount("");
    setRate("");
    setYears("");
    setResult(null);
    localStorage.removeItem("finance_amount");
    localStorage.removeItem("finance_rate");
    localStorage.removeItem("finance_years");
  };

  return (
    <div className="calculator-finance">
      <h2>{t("project2.finance-full")}</h2>

      <div className="form-group">
        <label>{t("project2.amount")}</label>
        <div className="input-with-clear">
          <input
            type="number"
            min="100"
            step="100"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value); // сохраняем всё, что пользователь печатает
            }}
            placeholder={t("project2.enter-amount")}
          />
          { amount && (
            <button className="clear-btn" onClick={() => clearField("amount")}>{t("project2.clear")}</button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>{t("project2.rate")}</label>
        <div className="input-with-clear">
          <input
            type="number"
            min="0.01"
            step="any"
            value={rate}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || Number(value) > 0) {
                setRate(value);
              }
            }}
            placeholder={t("project2.enter-rate")}
          />
          { rate && (
            <button className="clear-btn" onClick={() => clearField("rate")}>{t("project2.clear")}</button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>{t("project2.years")}</label>
        <div className="input-with-clear">
          <input
            type="number"
            min="1"
            step="1"
            value={years}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || Number(value) >= 1) {
                setYears(value);
              }
            }}
            placeholder={t("project2.enter-years")}
          />

          { years && (
            <button className="clear-btn" onClick={() => clearField("years")}>{t("project2.clear")}</button>
          )}
        </div>
      </div>

      <div className="button-group">
        <button onClick={calculate}>{t("project2.calculate")}</button>
        <button className="clear-all-btn" onClick={clearAll}>
          {t("project2.clear-all")}
        </button>
      </div>

      {result !== null && (
        <div className="result">
          <strong>{t("project2.future-value")}</strong> {result}
        </div>
      )}
    </div>
  );
}
