import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '@/pages/menu/Home.scss';
import {Helmet} from "@dr.pogodin/react-helmet";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";

import Project1 from "@/assets/img/main/cube.webp"
import Project2 from "@/assets/img/main/сalculator1.jpg"
import Project3 from "@/assets/img/main/todo-list.webp"
import Project4 from "@/assets/img/main/memory.webp"

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
        <hr className="custom-line" />
        <div className="projects-grid">
          <div className="inner">
            <Link to="/project1" className="project-card-link">
              <div className="project-card">
                <div className="project-img">
                  <img src={ Project1 } alt="project1" />
                </div>
                <div className="project-text">
                  <h3>{t('project1.name')}</h3>
                  <p>{t('project1.disc')}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="inner">
            <Link to="/project2" className="project-card-link">
              <div className="project-card">
                <div className="project-img">
                  <img src={ Project2 } alt="project2" />
                </div>
                <div className="project-text">
                  <h3>{t('project2.name')}</h3>
                  <p>{t('project2.disc')}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="inner">
            <Link to="/project3" className="project-card-link">
              <div className="project-card">
                <div className="project-img">
                  <img src={ Project3 } alt="project3" />
                </div>
                <div className="project-text">
                  <h3>{t('project3.name')}</h3>
                  <p>{t('project3.disc')}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="inner">
            <Link to="/project4" className="project-card-link">
              <div className="project-card">
                <div className="project-img">
                  <img src={ Project4 } alt="project4" />
                </div>
                <div className="project-text">
                  <h3>{t('project4.name')}</h3>
                  <p>{t('project4.disc')}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;