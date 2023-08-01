import React from "react";
import { motion } from "framer-motion";

import "./Social.css";
import SocialContent from "../components/SocialContent";
import PageHeader from "../components/PageHeader";

const Social = () => {
  return (
    <html>
      <body>
        <div className="content">
          <PageHeader
            title1={"MY"}
            title2={"SOCIALS"}
            image={process.env.PUBLIC_URL + "./abstdarkgeo.png"}
          />
          <SocialContent />
        </div>
      </body>
    </html>
  );
};

export default Social;
