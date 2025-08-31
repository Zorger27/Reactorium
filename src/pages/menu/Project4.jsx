import React, { useState, useEffect } from "react";
import '@/pages/menu/Project4.scss';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import {Helmet} from "@dr.pogodin/react-helmet";
import {useSpaCleanup} from "@/hooks/useSpaCleanup.js";
import ToggleFooterButton from "@/components/util/ToggleFooterButton.jsx";

import Apple from "@/assets/img/memory/Apple.webp"
import Banana from "@/assets/img/memory/Banana.webp"
import Grape from "@/assets/img/memory/Grape.webp"
import Lychee from "@/assets/img/memory/Lychee.webp"
import Pineapple from "@/assets/img/memory/Pineapple.webp"
import Strawberry from "@/assets/img/memory/Strawberry.webp"
import CardBack from "@/assets/img/memory/Card.webp"

const initialCards = [
  { fruit: "apple", image: Apple, flipped: false, matched: false },
  { fruit: "apple", image: Apple, flipped: false, matched: false },
  { fruit: "banana", image: Banana, flipped: false, matched: false },
  { fruit: "banana", image: Banana, flipped: false, matched: false },
  { fruit: "grape", image: Grape, flipped: false, matched: false },
  { fruit: "grape", image: Grape, flipped: false, matched: false },
  { fruit: "lychee", image: Lychee, flipped: false, matched: false },
  { fruit: "lychee", image: Lychee, flipped: false, matched: false },
  { fruit: "pineapple", image: Pineapple, flipped: false, matched: false },
  { fruit: "pineapple", image: Pineapple, flipped: false, matched: false },
  { fruit: "strawberry", image: Strawberry, flipped: false, matched: false },
  { fruit: "strawberry", image: Strawberry, flipped: false, matched: false },
];

export const Project4 = () => {
  const { t } = useTranslation();
  const siteUrl = import.meta.env.VITE_SITE_URL;
  useSpaCleanup();

  // const [cards, setCards] = useState(initialCards);
  const [cards, setCards] = useState([...initialCards]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const shuffleCards = () => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const startNewGame = () => {
    const resetCards = initialCards.map(card => ({
      ...card,
      flipped: false,
      matched: false,
    }));
    setCards(resetCards);
    setShuffledCards(shuffleCards());
    setFlippedCards([]);
    setIsBlocked(false);
  };

  const flipCard = (index) => {
    if (isBlocked) return;

    const newCards = [...shuffledCards];
    const card = newCards[index];

    if (card.flipped || card.matched) return;

    card.flipped = true;
    setShuffledCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsBlocked(true);
      const [firstCard, secondCard] = newFlippedCards;

      if (firstCard.fruit === secondCard.fruit) {
        firstCard.matched = true;
        secondCard.matched = true;
        setFlippedCards([]);
        setIsBlocked(false);
      } else {
        setTimeout(() => {
          firstCard.flipped = false;
          secondCard.flipped = false;
          setShuffledCards([...newCards]);
          setFlippedCards([]);
          setIsBlocked(false);
        }, 500);
      }
    }

    // Check if all matched
    const allMatched = newCards.every(c => c.matched);
    if (allMatched) {
      const playAgain = window.confirm(t("project4.playAgain"));
      if (playAgain) {
        startNewGame();
      }
    }
  };

  return (
    <div className="project4">
      <Helmet>
        <title>{t('project4.name')}</title>
        <meta name="description" content={t('project4.disc')} />

        {/* Open Graph meta tags */}
        <meta property="og:title" content={t('project4.name')} />
        <meta property="og:description" content={t('project4.disc')} />
        <meta property="og:image" content={`${siteUrl}/ogimage/project4.jpg`} />
        <meta property="og:url" content={`${siteUrl}/project4`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteUrl} />

        {/* Twitter meta tags */}
        <meta property="twitter:title" content={t('project4.name')} />
        <meta property="twitter:description" content={t('project4.disc')} />
        <meta property="twitter:image" content={`${siteUrl}/ogimage/project4.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="container">
        <h1><Link to="/" className="back-to-menu" title={t('extra.back')}>
          <i className="fa fa-arrow-circle-left"></i></Link>
          {t('project4.name')}
          <ToggleFooterButton />
        </h1>
        <hr className="custom-line" />

        <div className="start">
          <button onClick={() => setShowRules(!showRules)} className="btn-rules">
            {t("project4.rules-h2")}
            <i style={{ color: "red", marginLeft: "0.2rem" }} className="fas fa-hand-pointer"></i>
          </button>
          <button className="btn-newGame" onClick={startNewGame}>{t("project4.newGame")}</button>
        </div>

        {showRules && (
          <div>
            <p>{t("project4.rules")}</p>
            <h2 style={{ color: "deeppink", margin: "0.5rem" }}>
              {t("project4.luck")}
            </h2>
          </div>
        )}

        <hr className="custom-line" />

        <div className="memory-game">
          {shuffledCards.map((card, index) => (
            <div
              key={index}
              className={`memory-card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
              data-fruit={card.fruit}
              onClick={() => flipCard(index)}
            >
              <img src={card.image} alt={card.fruit} className="front-face" />
              <img src={String(CardBack)} alt="Back face" className="back-face" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};