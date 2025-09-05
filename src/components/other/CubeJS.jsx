import React, {useMemo, useCallback, useState} from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/CubeJS.scss";

export default function CubeJS() {
  const { t } = useTranslation();

  const [scale, setScale] = useState(1);
  // const [rotationX] = useState(1);
  // const [rotationY] = useState(1);

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

  return (
    <div className="inner-container">
      <div className="cube-scale">
        <label htmlFor="scale">{t('project1.scale')}</label>
        <input type="range" min="0.5" max="2" step="0.1" value={scale}
               onChange={(e) => setScale(parseFloat(e.target.value))}
        />
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