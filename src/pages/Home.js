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
import HighLightCard from "../components/HighLightCard";
import TimelineComponent from "../components/TimelineComponent";
import Navbar from "../components/Navbar";

const Home = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const buttonToBlockMap = {
      "block-aae767acabe01fa03832": "#block-6a8f23e1a6eae543db48",
      "block-4c0aac5dedf61e0e726c": "#block-110178bc0dc45ef636ab",
      "block-3a53f5af546657ccd72c": "#block-fc0499e775b1ea420449",
      "block-3c323660819d0d40e632": "#block-a479f5850fefb3aa99d1",
      // Add more button-to-block mappings as needed
    };
    // Select all buttons by class and apply styling
    const buttons = document.querySelectorAll(".sqs-block-button"); // Replace with the actual class of your buttons
    buttons.forEach(function (button) {
      const buttonId = button.id;
      const targetBlockSelector = buttonToBlockMap[buttonId];
      const targetBlock = document.querySelector(targetBlockSelector);

      if (targetBlock) {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          targetBlock.scrollIntoView({
            behavior: "smooth",
          });
        });
      }
    });
  });

  return (
    <div className="content">
      <Navbar />
      <section className="landing-seciton">
        <title>Home</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <PageHeader
          title1={"A Designer And Developer"}
          title2={"Interested In Building Solutions"}
          image={process.env.PUBLIC_URL + "./adi-01.jpg"}
        />
        <SubHeader />
        <CTAButton buttonlabel="Contact Me" />
      </section>
      <section className="home" id="home">
        <ContentCard
          title="Profile"
          content="
        
        A Computer Science graduate, Tech enthusiast and an Avid learner who thrives in an environment fostering challenge and growth. 
        With Customer at core, I embody an attitude of “Never give up” and “Make a difference”, in all endeavors.
        I enjoy working with both functional and cross functional teams and have a proven experience in implementing new systems and workflow automations to boost efficiency.
        "
        />
        <ContentCardReverse
          title="About"
          content="From a wide-ranging palette for music, shows, and movies, I like to conduce my craving for creativity through photography, videography, sketching and digital designing. Despite my day being full of professional and family commitments, a dedicated time for my physical wellbeing is a part of my routine.
Find myself adept at fostering connections, I thrive in social events, recognizing networking as a key driver for personal and professional growth and travel has been a big source of learning and inspiration for my personal and cultural development.
"
        />
      </section>
      <section className="experience-section" id="experience-section">
        <div
          className="highlight-card-component"
          id="highlight-card-component-01"
        >
          <HighLightCard
            className="highlight-card-component"
            id="highlight-card-component-01"
            title="Experience"
            position="Junior Data Analyst/ IT Assistant"
            company="Sunly Energy, Stratford, PE, Canada"
            time="May 2023 - Current"
            desc=<ul style={{ listStyle: "disc", paddingLeft: 0 }}>
              <li>
                Managed for tech onboarding/offboarding, hardware/software
                setup, and provided IT support for headquarters and remote
                franchise operations.
              </li>
            </ul>
          />

          <HighLightCard
            title=""
            position="Operations Assistant Manager"
            company="The Spice Store, Charlottetown, PE, Canada"
            time="Nov 2018 - Current"
            desc=<ul style={{ listStyle: "disc", paddingLeft: 0 }}>
              <li>
                Managed salesfloor operations, procurement, logistics, pricing,
                merchandising, and reporting.
              </li>
            </ul>
          />

          <HighLightCard
            title=""
            position="Student Grader, Web Development & Computer Science II"
            company="University of Prince Edward Island, Charlottetown, PE, Canada"
            time="Sep 2021 - Apr 2022"
            desc=<ul style={{ listStyle: "disc", paddingLeft: 0 }}>
              <li>
                Guided students in resolving assignment problems, applying
                concepts learned throughout my academic tenure.
              </li>
            </ul>
          />

          <HighLightCard
            title=""
            position="Customer Experience Associate"
            company="Walmart, Charlottetown, PE, Canada"
            time="Jul 2021 - Oct 2021"
            desc=<ul style={{ listStyle: "disc", paddingLeft: 0 }}>
              <li>
                Conducted sales floor operations and customer service in line
                with Walmart policies and procedures.
              </li>
            </ul>
          />

          <HighLightCard
            title=""
            position="Sales Associate"
            company="National Store L.L.C, Canon, Dubai, UAE"
            time="Jun 2014 - Aug 2014"
            desc=<ul style={{ listStyle: "disc", paddingLeft: 0 }}>
              <li>
                Handled walk-in customer in a high traffic Canon branded store,
                making sales using product knowledge on cameras, printers, and
                solutions.
              </li>
            </ul>
          />
        </div>
        <div className="timeline-component">
          <TimelineComponent />
        </div>
        <div
          className="highlight-card-component"
          id="highlight-card-component-02"
        >
          <HighLightCard
            title="Projects"
            position="Aditya Portfolio Website"
            company="Personal"
            time="Dec 2023"
            desc=""
          />

          <HighLightCard
            title=""
            position="The Spice Store Website"
            company="The Spice Store"
            time="Oct 2023"
            desc=""
          />

          <HighLightCard
            title=""
            position="Telling Stories Website"
            company="University of Prince Edward Island - Software Engineering"
            time="Apr 2023"
            desc=""
          />

          <HighLightCard
            title=""
            position="Assignment Planner App"
            company="University of Prince Edward Island - Android App Development"
            time="Apr 2023"
            desc=""
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
