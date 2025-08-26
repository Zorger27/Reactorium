import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHeaderLogo, selectHeaderAbout } from '@/store/view/viewSlice.js';
import { Link } from 'react-router-dom';
import '@/components/layout/header.scss';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/util/LanguageSwitcher.jsx'
import ToggleFullScreen from "@/components/util/ToggleFullScreen.jsx";

const Header = () => {
  const headerLogo = useSelector(selectHeaderLogo);
  const headerAbout = useSelector(selectHeaderAbout);
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const burgerRef = useRef(null);

  const toggleMenu = () => setShowMenu(!showMenu);

  // Закрыть меню при клике вне бургер-кнопки
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  return (
    <header className="header">
      <div className="header-img">
        <div className="burger-menu" ref={burgerRef} onClick={toggleMenu}>
          <i className={`fa ${showMenu ? 'fa-times' : 'fa-bars'} burger-menu-icon`} />
        </div>

        <div className="logo">
          <Link to="/">
            <img src={String(headerLogo)}  alt="Логотип" className="logo" title={t('header.headerImage')}/>
          </Link>
        </div>

        <div className="header-about">
          <Link to="/about">
            <img src={String(headerAbout)}  alt="Ссылка на About" className="header-about" title={t('header.headerAbout')}/>
          </Link>
        </div>

        <div className="language">
          <LanguageSwitcher></LanguageSwitcher>
        </div>

        <div className="full-screen">
          <ToggleFullScreen />
        </div>
      </div>

      <div className={`menu ${showMenu ? 'is-active' : ''}`}>
        <Link to="/project1">{t('header.prg01')}</Link>
        <Link to="/project2">{t('header.prg02')}</Link>
        <Link to="/project3">{t('header.prg03')}</Link>
        <Link to="/project4">{t('header.prg04')}</Link>
        <Link to="/about">{t('header.about')}</Link>
      </div>
    </header>
  );
};

export default Header;
