// components/PageHeader.js
import React from "react";
import { motion } from "framer-motion";

import "./PageHeader.css";

const PageHeader = ({ title1, title2, image }) => {
  return (
    <div className="page-header">
      <div className="pg-1">
        <motion.div
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.5 }}
          initial={{ opacity: 0 }}
        >
          <div className="page-title">
            <label className="header">{title1}</label>
            <label className="header-1">{title2}</label>
          </div>
        </motion.div>
      </div>
      <div className="pg-2">
        <motion.div
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.2 }}
          initial={{ opacity: 0 }}
        >
          <img className="home-image-2" src={image} alt="workspace"></img>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHeader;
