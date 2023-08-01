import React from "react";
import { motion } from "framer-motion";

import "./Review.css";
import PageHeader from "../components/PageHeader";
import ReviewForm from "../components/ReviewForm";

const Review = () => {
  return (
    <html>
      <body>
        <div className="content">
          {/*<a href="https://www.freepik.com/free-vector/wave-modern-abstract-gradient-background_31180062.htm#page=2&query=abstract%20background&position=48&from_view=search&track=ais">Image by logturnal</a> on Freepik */}

          <PageHeader
            title1={"MY"}
            title2={"REVIEWS"}
            image={process.env.PUBLIC_URL + "./workzen.png"}
          />
          <ReviewForm />
        </div>
      </body>
    </html>
  );
};

export default Review;
