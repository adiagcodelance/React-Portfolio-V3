import React from "react";

import "./HighLightCard.css";

const HighLightCard = (props) => {
  return (
    <div className="highlight-card">
      <section className="highlight-card-section-block">
        <div className="highlight-card-block">
          <div
            className="highlight-card-block-title-item"
            id="highlight-card-block-title-item-01"
          >
            <label>{props.title}</label>
          </div>
          <div
            className="highlight-card-block-item"
            id="highlight-card-block-item-01"
          >
            <div
              className="highlight-card-info-block"
              id="highlight-card-info-block-01"
            >
              <label>{props.position}</label>
              <label>{props.company}</label>
              <label>{props.time}</label>
            </div>
            <p>{props.desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HighLightCard;
