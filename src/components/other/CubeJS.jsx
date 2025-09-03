import React, { useMemo, useCallback } from "react";
import "@/components/other/CubeJS.scss";

export default function CubeJS({ scale = 1, onScaleChange }) {

  // вычисляем размеры
  const calculatedCubeSize = useMemo(() => `${150 * scale}px`, [scale]);
  const calculatedTranslateZ = useMemo(() => `${scale}px`, [scale]);
  const calculatedTranslateZBack = useMemo(() => `${150 * scale}px`, [scale]);
  const calculatedTranslateZSide = useMemo(() => `${75 * scale}px`, [scale]);

  // обработка прокрутки мыши
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (onScaleChange) {
      onScaleChange(e.deltaY);
    }
  }, [onScaleChange]);

  return (
    <div className="cube-js-container" onWheel={handleWheel}>
      <div className="cube"
           // style={{width: calculatedCubeSize, height: calculatedCubeSize, transform: `rotateX(180deg) rotateY(45deg)`}}
           style={{width: calculatedCubeSize, height: calculatedCubeSize}}
      >
        <div className="face front"
             style={{ transform: `translateZ(${calculatedTranslateZ})` }}
        />
        <div className="face back"
             style={{transform: `rotateY(180deg) translateZ(${calculatedTranslateZBack})`,}}
        />
        <div className="face left"
             style={{transform: `rotateY(-90deg) translateZ(${calculatedTranslateZSide}) translateX(-50%)`,}}
        />
        <div className="face right"
             style={{transform: `rotateY(90deg) translateZ(${calculatedTranslateZSide}) translateX(50%)`,}}
        />
        <div className="face top"
             style={{transform: `rotateX(90deg) translateZ(${calculatedTranslateZSide}) translateY(-50%)`,}}
        />
        <div className="face bottom"
             style={{transform: `rotateX(-90deg) translateZ(${calculatedTranslateZSide}) translateY(50%)`,}}
        />
      </div>
    </div>
  );
}