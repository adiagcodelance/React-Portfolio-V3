import React, { useEffect, useState } from "react";
import "./Valentine.css";

const confettiShapes = ['❤️', '💕', '💖', '✨', '🌹', '💗'];
const heartEmojis = ['💕', '💗', '💖', '🩷'];

export default function ValentineCelebration() {
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [flippedCards, setFlippedCards] = useState({ 1: false, 2: false });
  const [showSecretHint, setShowSecretHint] = useState(false);
  const [showBothOption, setShowBothOption] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Create floating hearts
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: i,
        heart: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 5
      });
    }
    setFloatingHearts(hearts);

    // Initial confetti burst
    createConfetti();
  }, []);

  const createConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: Date.now() + i,
        shape: confettiShapes[Math.floor(Math.random() * confettiShapes.length)],
        left: Math.random() * 100,
        size: 15 + Math.random() * 20,
        duration: 3 + Math.random() * 2,
        delay: i * 0.03
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 5000);
  };

  const flipCard = (cardNum) => {
    if (!flippedCards[cardNum]) {
      const newFlipped = { ...flippedCards, [cardNum]: true };
      setFlippedCards(newFlipped);

      if (newFlipped[1] && newFlipped[2]) {
        setTimeout(() => setShowSecretHint(true), 500);
      }
    }
  };

  const revealBothOption = () => {
    setShowBothOption(true);
    setShowSecretHint(false);
  };

  const sendChoice = (choice) => {
    let emoji, text;
    if (choice.includes('Flowers')) {
      emoji = '💐🍫';
      text = "Perfect choice! Get ready for beautiful blooms and sweet treats, my love!";
    } else if (choice.includes('Spa')) {
      emoji = '💆‍♀️✨';
      text = "Wonderful! Time to relax and be pampered like the queen you are!";
    } else {
      emoji = '🎉💝🎉';
      text = "You found the secret! You deserve ALL the love and pampering — dinner AND spa day it is!";
      createConfetti();
    }

    setResult({ emoji, text });
  };

  return (
    <div className="celebration-page">
      <div className="confetti-container">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="confetti"
            style={{
              left: `${c.left}%`,
              fontSize: `${c.size}px`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`
            }}
          >
            {c.shape}
          </div>
        ))}
      </div>

      <div className="floating-hearts">
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            className="float-heart"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`
            }}
          >
            {h.heart}
          </div>
        ))}
      </div>

      <div className="celebration-container">
        <div className="celebration-header">
          <div className="big-heart">💖</div>
          <h1 className="title">She Said Yes!</h1>
        </div>

        <div className="romantic-message">
          <p>My dearest Sameera,</p>
          <p><em>"For you, a thousand times over is never enough. My hopes and dreams for us are forever, and I can't wait for the day that I get to spend this romantic day with you in your arms."</em></p>
          <p>Every moment with you feels like a beautiful dream I never want to wake up from. You make my heart smile in ways I never knew possible. Thank you for choosing to be my Valentine — today and always.</p>
          <p>Here's to us, to love, and to countless more adventures together. 💕</p>
          <p className="signature">Forever Yours ❤️</p>
        </div>

        <div className="gift-section">
          <h2 className="gift-title">🎁 Your Valentine's Surprise Awaits!</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>Tap a card to reveal your surprise options:</p>

          <div className="gift-options">
            <div className={`flip-card ${flippedCards[1] ? 'flipped' : ''}`} onClick={() => flipCard(1)}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="option-label">Option A</div>
                  <div className="option-mystery">🎁</div>
                  <p className="tap-hint">Tap to reveal...</p>
                </div>
                <div className="flip-card-back">
                  <div className="gift-icon">💐🍫</div>
                  <h3 className="gift-name">Flowers & Chocolates</h3>
                  <p className="gift-description">A beautiful bouquet of your favorite flowers paired with decadent chocolates to sweeten your day.</p>
                  <button className="btn-choose" onClick={(e) => { e.stopPropagation(); sendChoice('Option A - Flowers & Chocolates'); }}>I Want This! 💕</button>
                </div>
              </div>
            </div>

            <div className={`flip-card ${flippedCards[2] ? 'flipped' : ''}`} onClick={() => flipCard(2)}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="option-label">Option B</div>
                  <div className="option-mystery">🎁</div>
                  <p className="tap-hint">Tap to reveal...</p>
                </div>
                <div className="flip-card-back">
                  <div className="gift-icon">🧖‍♀️💆</div>
                  <h3 className="gift-name">Spa Day Retreat</h3>
                  <p className="gift-description">A relaxing day of pampering with massages, facials, and pure bliss. You deserve to be treated like a queen!</p>
                  <button className="btn-choose" onClick={(e) => { e.stopPropagation(); sendChoice('Option B - Spa Day Retreat'); }}>I Want This! 💕</button>
                </div>
              </div>
            </div>
          </div>

          {showSecretHint && (
            <p className="secret-hint visible" onClick={revealBothOption}>
              Psst... can't decide? Click here for a secret option 🤫
            </p>
          )}

          {showBothOption && (
            <div className="both-option visible">
              <button className="btn-both" onClick={() => sendChoice('SECRET OPTION - Both Dinner AND Spa Day!')}>
                ✨ Why Not BOTH? ✨
              </button>
            </div>
          )}

          {result && (
            <div className="selection-result visible">
              <span className="emoji">{result.emoji}</span>
              <span>{result.text}</span>
              <p className="sent-confirmation">💝 I can't wait to make this happen!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
