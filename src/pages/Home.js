import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import HomeContent from "../components/HomeContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";

const Home = () => {
  return (
    <div className="content">
      <title>Home</title>
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
      <PageHeader
        title1={"About"}
        title2={"Me"}
        image={process.env.PUBLIC_URL + "./adi-01.jpg"}
      />
      <ContentCard />
    </div>
  );
};

export default Home;
