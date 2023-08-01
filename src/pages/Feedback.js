import React from "react";
import { motion } from "framer-motion";

import "./Feedback.css";
import FeedbackForm from "../components/Feedbackform.js";
import PageHeader from "../components/PageHeader";

const Feedback = () => {
  return (
    <html>
      <head></head>
      <body>
        <div className="content">
          <PageHeader
            title1={"YOUR"}
            title2={"FEEDBACK"}
            image={process.env.PUBLIC_URL + "./workspaces_mock.jpg"}
          />
          <FeedbackForm />
        </div>
      </body>
    </html>
  );
};

export default Feedback;
