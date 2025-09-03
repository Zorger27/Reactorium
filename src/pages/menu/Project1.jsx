import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Helmet } from '@dr.pogodin/react-helmet';
import '@/pages/menu/Project1.scss';
import {Link} from "react-router-dom";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";
import CubeJS from "@/components/other/CubeJS.jsx";
import CubeCSS from "@/components/other/CubeCSS.jsx";

export const Project1 = () => {
  const { t } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL;
  useSpaCleanup();

  const [mode, setMode] = useState("cube-js"); // "cube-js" | "cube-css"
  const [scale, setScale] = useState(1);

  const handleScaleChange = useCallback((deltaY) => {
    setScale((prev) => {
      let next = prev - deltaY * 0.001;
      if (next < 0.5) next = 0.5;
      if (next > 2) next = 2;
      return next;
    });
  }, []);

  // Загружаем сохранённый режим при первом рендере
  useEffect(() => {
    const savedMode = localStorage.getItem("cubeMode");
    if (savedMode === "cube-js" || savedMode === "cube-css") {
      setMode(savedMode);
    }
  }, []);

  // Сохраняем режим при каждом изменении
  useEffect(() => {
    localStorage.setItem("cubeMode", mode);
  }, [mode]);

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

          <div className="mode-switch">
            <button className={mode} onClick={() => setMode(mode === "cube-js" ? "cube-css" : "cube-js")}>
              {mode === "cube-js" ? t("project1.cube-css") : t("project1.cube-js")}
            </button>
          </div>

          <ToggleFooterButton />

          {mode === "cube-js" && (
            <input type="range" min="0.5" max="2" step="0.1" value={scale}
                   onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          )}

        </h1>
        <hr className="custom-line" />

        {mode === "cube-js" && <CubeJS scale={scale} onScaleChange={handleScaleChange} />}
        {mode === "cube-css" && <CubeCSS />}

      </div>
    </div>
  );
};