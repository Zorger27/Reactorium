import React, {useMemo, useCallback, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/CubeJS.scss";

export default function CubeJS() {
  const { t } = useTranslation();

  // const [scale, setScale] = useState(1);
  // const [rotationX] = useState(1);
  // const [rotationY] = useState(1);

  // читаем сохранённый scale из localStorage или ставим 1
  const [scale, setScale] = useState(() => {
    const saved = localStorage.getItem("cube-scale");
    return saved ? parseFloat(saved) : 1;
  });

  // сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("cube-scale", scale.toString());
  }, [scale]);

  // вычисляем размеры
  const calculatedCubeSize = useMemo(() => `${150 * scale}px`, [scale]);
  const calculatedTranslateZ = useMemo(() => `${scale}px`, [scale]);
  const calculatedTranslateZBack = useMemo(() => `${150 * scale}px`, [scale]);
  const calculatedTranslateZSide = useMemo(() => `${75 * scale}px`, [scale]);

  // обработка прокрутки мыши
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setScale((prev) => {
      let next = prev - e.deltaY * 0.001; // чувствительность
      if (next < 0.5) next = 0.5;
      if (next > 2) next = 2;
      return next;
    });
  }, []);

  // кнопки управления
  const handleReset = () => setScale(1);
  const handleIncrease = () =>
    setScale((prev) => Math.min(2, parseFloat((prev + 0.1).toFixed(1))));
  const handleDecrease = () =>
    setScale((prev) => Math.max(0.5, parseFloat((prev - 0.1).toFixed(1))));

  return (
    <div className="inner-container">
      <div className="cube-scale">
        <label htmlFor="scale">{t("project1.scale")}</label>
        <div className="controls">
          <button onClick={handleDecrease}>–</button>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
          <button onClick={handleIncrease}>+</button>
          <button onClick={handleReset}>Х</button>
        </div>
        <div className="scale-value">{scale.toFixed(1)}x</div>
      </div>
      <div className="cube-js-container" onWheel={handleWheel}>
        {/*<div className="cube" style={{width: calculatedCubeSize, height: calculatedCubeSize, transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,}}>*/}
        <div className="cube" style={{width: calculatedCubeSize, height: calculatedCubeSize}}>
          <div className="face front" style={{ transform: `translateZ(${calculatedTranslateZ})` }}/>
          <div className="face back" style={{transform: `rotateY(180deg) translateZ(${calculatedTranslateZBack})`,}}/>
          <div className="face left" style={{transform: `rotateY(-90deg) translateZ(${calculatedTranslateZSide}) translateX(-50%)`,}}/>
          <div className="face right" style={{transform: `rotateY(90deg) translateZ(${calculatedTranslateZSide}) translateX(50%)`,}}/>
          <div className="face top" style={{transform: `rotateX(90deg) translateZ(${calculatedTranslateZSide}) translateY(-50%)`,}}/>
          <div className="face bottom" style={{transform: `rotateX(-90deg) translateZ(${calculatedTranslateZSide}) translateY(50%)`,}}/>
        </div>
      </div>
    </div>
  );
}