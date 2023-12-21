// CTAButton.js
import React, { useState } from "react";
import "./CTAButton.css";
import EmailModal from "./EmailModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CTAButton = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ctabutton">
      <div className="ctabutton-block">
        <div className="ctabutton-block-item" id="ctabutton-block-item-01">
          <button className="ctabutton-item" onClick={openModal}>
            {props.buttonlabel}
          </button>
          <EmailModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default CTAButton;
