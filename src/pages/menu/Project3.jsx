import React from 'react';
import '@/pages/menu/Project3.scss';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import {Helmet} from "@dr.pogodin/react-helmet";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";

export const Project3 = () => {
  const { t } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL;

  useSpaCleanup();

  return (
    <div className="project3">
      <Helmet>
        <title>{t('project3.name')}</title>
        <meta name="description" content={t('project3.disc')} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={t('project3.name')} />
        <meta property="og:description" content={t('project3.disc')} />
        <meta property="og:image" content={`${siteUrl}/ogimage/project3.jpg`} />
        <meta property="og:url" content={`${siteUrl}/project3`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteUrl} />

        {/* Twitter meta tags */}
        <meta property="twitter:title" content={t('project3.name')} />
        <meta property="twitter:description" content={t('project3.disc')} />
        <meta property="twitter:image" content={`${siteUrl}/ogimage/project3.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="container">
        <h1><Link to="/" className="back-to-menu" title={t('extra.back')}>
          <i className="fa fa-arrow-circle-left"></i></Link>
          {t('project3.name')}
          <ToggleFooterButton />
        </h1>
        <hr className="custom-line" />
      </div>
    </div>
  );
};