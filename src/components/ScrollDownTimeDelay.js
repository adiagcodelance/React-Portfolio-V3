import React, { useEffect, useState } from 'react';

import "./ScrollDownTimeDelay.css"

const ScrollDownTimeDelay = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScroll(true);
    }, 2000); // Adjust the delay (in milliseconds) based on your preference

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {showScroll && (
        <>
          <div className="scroll-indicator" onClick={scrollToBottom}>
            &#8595;
          </div>
          <div className="scroll-text" onClick={scrollToBottom}>
            Scroll down
          </div>
        </>
      )}
    </div>
  );
};

export default ScrollDownTimeDelay;
