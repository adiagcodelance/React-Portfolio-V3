import React, { useRef, useEffect } from "react";

import "./ReversePreviewBox.css";

const ReversePreviewBox = () => {
  return (
    <div className="reverse-previewbox-container">
      <section className="reverse-previewbox-block">
        <div className="reverse-previewbox-block-box">
          <div className="reverse-previewbox-block-descriptor">
            <label>The Spice Store Company Website</label>
            <p>
              Ongoing project to help build a custom website for The Spice Store
              a retail business in Indian food stuff, their goal is to reach
              more customers while giving existing customer with a new avenue to
              connect with the store.
            </p>
          </div>

          <div className="reverse-previewbox-block-item">
            <img
              className="reverse-previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 1.png"}
            ></img>
            <img
              className="reverse-previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 2.png"}
            ></img>
            <img
              className="reverse-previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 3.png"}
            ></img>
            <img
              className="reverse-previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 4.png"}
            ></img>
            <img
              className="reverse-previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 5.png"}
            ></img>
            <img
              className="reverse-previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home end.png"}
            ></img>
          </div>
          <span className="reverse-scroll-text">Scroll Down</span>
          <span className="reverse-down-arrow">&darr;</span>
        </div>
      </section>
    </div>
  );
};

export default ReversePreviewBox;
