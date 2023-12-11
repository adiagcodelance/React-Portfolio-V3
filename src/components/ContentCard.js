import React from "react";
import "./ContentCard.css";

const ContentCard = (props) => {
  return (
    <div className="content-card">
      <section className="content-card-section-block">
        <div className="content-card-block">
          <div
            className="content-card-block-title-item"
            id="content-card-block-title-item-01"
          >
            <label>{props.title}</label>
          </div>
          <div
            className="content-card-block-item"
            id="content-card-block-item-01"
          >
            <p>{props.content}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentCard;
