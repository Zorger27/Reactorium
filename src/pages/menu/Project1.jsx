import React from 'react';
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
        </h1>
        <hr className="custom-line" />
      </div>
    </div>
  );
};