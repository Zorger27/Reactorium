import React, { useState, useEffect } from "react";
import CalculatorStandart from "@/components/other/CalculatorStandart.jsx";
import CalculatorFinance from "@/components/other/CalculatorFinance.jsx";
import '@/pages/menu/Project2.scss';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";
import MetaTags from "@/components/seo/MetaTags.jsx";

export const Project2 = () => {
  const { t } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL;
  useSpaCleanup();

  const [mode, setMode] = useState("standard"); // "standard" | "finance"

  // Загружаем сохранённый режим при первом рендере
  useEffect(() => {
    const savedMode = localStorage.getItem("calculatorMode");
    if (savedMode === "standard" || savedMode === "finance") {
      setMode(savedMode);
    }
  }, []);

  // Сохраняем режим при каждом изменении
  useEffect(() => {
    localStorage.setItem("calculatorMode", mode);
  }, [mode]);

  return (
    <div className="project2">

      <MetaTags
        mainTitle={t('project2.name')}
        metaTags={[
          { name: "description", content: t('project2.disc') },

          // Open Graph meta tags
          { property: "og:title", content: t('project2.name') },
          { property: "og:description", content: t('project2.disc') },
          { property: "og:image", content: `${siteUrl}/ogimage/project2.jpg` },
          { property: "og:url", content: `${siteUrl}/project2` },
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: `${siteUrl}` },

          // Twitter meta tags
          { property: "twitter:title", content: t('project2.name') },
          { property: "twitter:description", content: t('project2.disc') },
          { property: "twitter:image", content: `${siteUrl}/ogimage/project2.jpg` },
          { name: "twitter:card", content: "summary_large_image" },
        ]}
      />

      <div className="container">
        <h1><Link to="/" className="back-to-menu" title={t('extra.back')}>
          <i className="fa fa-arrow-circle-left"></i></Link>
          {t('project2.name')}

          <div className="mode-switch">
            <button className={mode} onClick={() => setMode(mode === "standard" ? "finance" : "standard")}>
              {mode === "standard" ? t("project2.finance") : t("project2.standard")}
            </button>
          </div>

          <ToggleFooterButton />

        </h1>
        <hr className="custom-line" />

        {mode === "standard" && <CalculatorStandart />}
        {mode === "finance" && <CalculatorFinance />}

      </div>
    </div>
  );
};