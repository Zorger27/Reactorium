import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '@/pages/menu/Home.scss';
import {Helmet} from "@dr.pogodin/react-helmet";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";

const Home = () => {
  const { t } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL;

  useSpaCleanup();

  return (
    <div className="home">
      <Helmet>
        <title>{t('home.name')}</title>
        <meta name="description" content={t('home.disc')} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={t('home.name')} />
        <meta property="og:description" content={t('home.disc')} />
        <meta property="og:image" content={`${siteUrl}/ogimage/home.jpg`} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteUrl} />

        {/* Twitter meta tags */}
        <meta property="twitter:title" content={t('home.name')} />
        <meta property="twitter:description" content={t('home.disc')} />
        <meta property="twitter:image" content={`${siteUrl}/ogimage/home.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="container">
        <h1>
          {t('home.title')}
          <ToggleFooterButton />
        </h1>
        <p className="flex-center">{t('home.description')}</p>
        <hr className="custom-line" />
        <div className="projects-grid">
          <Link to="/project1" className="project-card-link">
            <div className="project-card">
              <h3>{t('project1.name')}</h3>
              <p>{t('project1.disc')}</p>
              <span className="arrow">➡️</span>
            </div>
          </Link>
          <Link to="/project2" className="project-card-link">
            <div className="project-card">
              <h3>{t('project2.name')}</h3>
              <p>{t('project2.disc')}</p>
              <span className="arrow">➡️</span>
            </div>
          </Link>
          <Link to="/project3" className="project-card-link">
            <div className="project-card">
              <h3>{t('project3.name')}</h3>
              <p>{t('project3.disc')}</p>
              <span className="arrow">➡️</span>
            </div>
          </Link>
          <Link to="/project4" className="project-card-link">
            <div className="project-card">
              <h3>{t('project4.name')}</h3>
              <p>{t('project4.disc')}</p>
              <span className="arrow">➡️</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;