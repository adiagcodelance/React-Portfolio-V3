// components/PageHeader.js
import React from "react";
import { motion } from "framer-motion";

import "./PageHeader.css";

const PageHeader = ({ title1, title2, image }) => {
  return (
    <div className="page-header">
      <section className="header-section" id="header-01">
        <div className="header-title-block">
          <div className="header-image-block" id="header-image-block-01">
            <img
              className="header-image-block-item"
              id="header-image-block-item-01"
              src={image}
            ></img>
          </div>
          <div
            className="header-title-block-item"
            id="header-title-block-item-01"
          >
            <label className="header-title-item">{title1}</label>
          </div>
          <div
            className="header-title-block-item"
            id="header-title-block-item-02"
          >
            <label className="header-title-item">{title2}</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageHeader;
