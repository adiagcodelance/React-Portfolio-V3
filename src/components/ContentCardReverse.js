import React from "react";
import "./ContentCardReverse.css";

const ContentCardReverse = (props) => {
  return (
    <div className="content-card-reverse">
      <section className="content-card-reverse-section-block">
        <div className="content-card-reverse-block">
          <div
            className="content-card-reverse-block-title-item"
            id="content-card-block-title-item-01"
          >
            <label>{props.title}</label>
          </div>

          <div
            className="content-card-reverse-block-item"
            id="content-card-reverse-block-item-01"
          >
            <p>{props.content}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentCardReverse;
