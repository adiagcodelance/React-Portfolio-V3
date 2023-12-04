import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import HomeContent from "../components/HomeContent";

import "./Home.css";

const Home = () => {
  return (
    <div className="content">
      <PageHeader
        title1={"ABOUT"}
        title2={"ME"}
        image={process.env.PUBLIC_URL + "./aditya2.jpg"}
      />
    </div>
  );
};

export default Home;
