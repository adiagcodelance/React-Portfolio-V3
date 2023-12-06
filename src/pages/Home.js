import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import HomeContent from "../components/HomeContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";
import SubHeader from "../components/SubHeader";
import ContentCardReverse from "../components/ContentCardReverse";
import CTAButton from "../components/CTAButton";

const Home = () => {
  return (
    <div className="content">
      <title>Home</title>
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
      <PageHeader
        title1={"A Designer And Developer"}
        title2={"Interested In Building Solutions"}
        image={process.env.PUBLIC_URL + "./adi-01.jpg"}
      />
      <SubHeader />
      <CTAButton buttonlabel="Contact Me" />
      <ContentCard
        title="Short"
        content="Aditya's experience includes adopting Visual Identity Systems for companies that range from startups to multi-national corporations. He has designed a wide range of print materials including annual reports, business cards, posters and much more. He has worked on projects ranging from large-scale events to small-scale print jobs."
      />
      <ContentCardReverse
        title="Unique"
        content="Aditya has a strong skill set for writing convincing content for any design work. He works with the client to create a Branded Content piece for the company that works with the Company Profile, Presentation, Website or any design project. Ali brings his own creative flair to each project and is able to make it shine through in his writing."
      />
    </div>
  );
};

export default Home;
