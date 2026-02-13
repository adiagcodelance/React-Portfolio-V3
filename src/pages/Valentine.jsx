import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Valentine.css";

const funnyMessages = [
  "Nice try! 😏",
  "Not so fast!",
  "You can't catch me!",
  "Think again! 💕",
  "Are you sure?",
  "Come on, Sameera...",
  "Really?? 🥺",
  "Just say yes!",
  "I'll keep running!",
  "Give up yet? 😄"
];

const hearts = ['💕', '💗', '💖', '💘', '💝', '❤️', '🩷'];

export default function Valentine() {
  const navigate = useNavigate();
  const noBtnRef = useRef(null);
  const [noText, setNoText] = useState("No");
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    // Create floating hearts
    const heartsArray = [];
    for (let i = 0; i < 20; i++) {
      heartsArray.push({
        id: i,
        heart: hearts[Math.floor(Math.random() * hearts.length)],
        left: Math.random() * 100,
        delay: Math.random() * 6,
        size: 15 + Math.random() * 20
      });
    }
    setFloatingHearts(heartsArray);
  }, []);

  const escapeButton = (e) => {
    e.preventDefault();
    const btn = noBtnRef.current;
    if (!btn) return;

    // Keep button in the middle 70% of the screen (15% margin on each side)
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    const minX = screenW * 0.15;
    const maxX = screenW * 0.65; // Leave room for button width
    const minY = screenH * 0.15;
    const maxY = screenH * 0.70; // Leave room for button height

    const newX = minX + Math.random() * (maxX - minX);
    const newY = minY + Math.random() * (maxY - minY);

    btn.style.position = 'fixed';
    btn.style.left = `${Math.round(newX)}px`;
    btn.style.top = `${Math.round(newY)}px`;
    btn.style.zIndex = '99999';

    setNoText(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
  };

  const sayYes = () => {
    document.body.style.transition = 'all 0.5s';
    document.body.style.transform = 'scale(1.02)';

    setTimeout(() => {
      document.body.style.transform = '';
      navigate('/valentine/celebration');
    }, 300);
  };

  return (
    <div className="valentine-page">
      <div className="hearts-bg">
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              fontSize: `${h.size}px`
            }}
          >
            {h.heart}
          </div>
        ))}
      </div>

      <div className="valentine-container">
        <div className="heart-icon">💝</div>
        <h1 className="question">Will you be my Valentine,</h1>
        <h2 className="name">Sameera?</h2>
        <p className="subtitle">Choose wisely, my love...</p>

        <div className="buttons">
          <button className="btn btn-yes" onClick={sayYes}>Yes! 💕</button>
          <button
            ref={noBtnRef}
            className="btn btn-no"
            onMouseEnter={escapeButton}
            onTouchStart={escapeButton}
            onFocus={escapeButton}
          >
            {noText}
          </button>
        </div>
      </div>
    </div>
  );
}
