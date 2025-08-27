import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { Helmet } from '@dr.pogodin/react-helmet';
import '@/pages/menu/Project1.scss';
import {Link} from "react-router-dom";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";

export const Project1 = () => {
  const { t } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL;

  useSpaCleanup();

  const [scale, setScale] = useState(1);
  const [rotationX] = useState(0);
  const [rotationY] = useState(0);

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
    <div className="project1">
      <Helmet>
        <title>{t('project1.name')}</title>
        <meta name="description" content={t('project1.disc')} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={t('project1.name')} />
        <meta property="og:description" content={t('project1.disc')} />
        <meta property="og:image" content={`${siteUrl}/ogimage/project1.jpg`} />
        <meta property="og:url" content={`${siteUrl}/project1`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteUrl} />

        {/* Twitter meta tags */}
        <meta property="twitter:title" content={t('project1.name')} />
        <meta property="twitter:description" content={t('project1.disc')} />
        <meta property="twitter:image" content={`${siteUrl}/ogimage/project1.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container">
        <h1><Link to="/" className="back-to-menu" title={t('extra.back')}>
          <i className="fa fa-arrow-circle-left"></i></Link>
          {t('project1.name')}
          <ToggleFooterButton />
          <input type="range" min="0.5" max="2" step="0.1" value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
        </h1>
        <hr className="custom-line" />
        <div className="cube-container" onWheel={handleWheel}>
          <div
            className="cube"
            style={{
              width: calculatedCubeSize,
              height: calculatedCubeSize,
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            }}
          >
            <div
              className="face front"
              style={{ transform: `translateZ(${calculatedTranslateZ})` }}
            />
            <div
              className="face back"
              style={{
                transform: `rotateY(180deg) translateZ(${calculatedTranslateZBack})`,
              }}
            />
            <div
              className="face left"
              style={{
                transform: `rotateY(-90deg) translateZ(${calculatedTranslateZSide}) translateX(-50%)`,
              }}
            />
            <div
              className="face right"
              style={{
                transform: `rotateY(90deg) translateZ(${calculatedTranslateZSide}) translateX(50%)`,
              }}
            />
            <div
              className="face top"
              style={{
                transform: `rotateX(90deg) translateZ(${calculatedTranslateZSide}) translateY(-50%)`,
              }}
            />
            <div
              className="face bottom"
              style={{
                transform: `rotateX(-90deg) translateZ(${calculatedTranslateZSide}) translateY(50%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};