import React from "react";
import "./CTAButton.css";

const CTAButton = (props) => {
  return (
    <div className="ctabutton">
      <div className="ctabutton-block">
        <div className="ctabutton-block-item" id="ctabutton-block-item-01">
          <button className="ctabutton-item">{props.buttonlabel}</button>
        </div>
      </div>
    </div>
  );
};

export default CTAButton;
