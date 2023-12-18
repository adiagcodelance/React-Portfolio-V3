import React, { useRef, useEffect } from "react";

import "./PreviewBox.css";

const PreviewBox = () => {
  return (
    <div className="previewbox-container">
      <section className="previewbox-block">
        <div className="previewbox-block-box">
          <span className="down-arrow">&darr;</span>
          <span className="scroll-text">Scroll Down</span>
          <div className="previewbox-block-item">
            <img
              className="previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 1.png"}
            ></img>
            <img
              className="previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 2.png"}
            ></img>
            <img
              className="previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 3.png"}
            ></img>
            <img
              className="previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 4.png"}
            ></img>
            <img
              className="previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home 5.png"}
            ></img>
            <img
              className="previewbox-image-item"
              src={process.env.PUBLIC_URL + "./SS Home end.png"}
            ></img>
          </div>
          <div className="previewbox-block-descriptor">
            <label>The Spice Store Company Website</label>
            <p>
              Ongoing project to help build a custom website for The Spice Store
              a retail business in Indian food stuff, their goal is to reach
              more customers while giving existing customer with a new avenue to
              connect with the store.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviewBox;
