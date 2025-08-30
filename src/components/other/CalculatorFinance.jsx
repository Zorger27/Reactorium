import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/CalculatorFinance.scss";

export default function CalculatorFinance() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate) / 100;
    const time = parseInt(years);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(time)) {
      setResult(t("project2.message"));
      return;
    }

    // формула сложных процентов
    const futureValue = principal * Math.pow(1 + interestRate, time);
    setResult(futureValue.toFixed(2));
  };

  return (
    <div className="calculator-finance">
      <h2>{t("project2.finance-full")}</h2>

      <div className="form-group">
        <label>{t("project2.amount")}</label>
        <input type="number" value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={t("project2.enter-amount")}
        />
      </div>

      <div className="form-group">
        <label>{t("project2.rate")}</label>
        <input type="number" value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder={t("project2.enter-rate")}
        />
      </div>

      <div className="form-group">
        <label>{t("project2.years")}</label>
        <input type="number" value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder={t("project2.enter-years")}
        />
      </div>

      <button onClick={calculate}>{t("project2.calculate")}</button>

      {result !== null && (
        <div className="result">
          <strong>{t("project2.future-value")}</strong> {result}
        </div>
      )}
    </div>
  );
}
