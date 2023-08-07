// components/MainContent.js
import React from "react";
import { motion } from "framer-motion";

import "./HomeContent.css";

const HomeContent = () => {
  return (
    <div className="main-container">
      <div className="column-one">
        <motion.div
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1 }}
          initial={{ opacity: 0 }}
        >
          <label className="sub-header">Welcome to learning about me</label>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1.5 }}
          initial={{ opacity: 0 }}
        >
          <div className="card-body">
            <p>
              Welcome to my portfolio webpage! my name is Aditya Agrawal, a Computer
              Scientist with an interest in web development/design. I thrive in
              creative projects and love challenges in fast-paced environments.
              This website showcases my journey through four iterations, each
              teaching me something new. I'm always filled with ideas to improve
              and recently added an iteration counter to mark the changes made
              since I started this portfolio project.
            </p>

            <p>
              Born and raised in Dubai, UAE, I'm adept at adapting to
              multicultural environments. I Love popular TV shows, especially
              sci-fi and fantasy genres. Passionate about weight training and
              power lifting and the occasional gamer; drawn to captivating stories and
              stunning graphics in games like Horizon Dawn, Last of Us, and
              Assassins Creed.
            </p>
          </div>

          <label className="sub-header">Currently</label>
          <div className="card-body">
            <p>
              I work as a Data Analyst/IT Assistant at Sunly in Charlottetown, PEI, a
              solar company providing Solar solutions to residential and
              commercial properties. My role involves handling various tasks
              like report creation, data uploads, mass updates/deletions
              using Salesforce, IT assistance, Form, button, and process
              creation in Salesforce, and workflow automation's using Zapier and
              Salesforce flows. Additionally, I am responsible for website
              maintenance and development involving supporting and expanding on existing design by
              injecting code blocks using the Squarespace design UI. I am currently working on developing my algorithm and problem solving skills, learning
              new and interesting features in web design such javascript graphic design to further enhance websites, and becomiogn Salesforce Admisistrator Certified.
            </p>
          </div>
        </motion.div>
      </div>
      <div className="stack-container">
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  className="item"
                  src={process.env.PUBLIC_URL + "./coa_transparent.png"}
                  alt="css"
                ></img>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="stack-table">
          <motion.div
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 1.5 }}
            initial={{ opacity: 0 }}
          >
            <thead>
              <tr>
                <td>
                  <label className="sub-header">Tech Stack</label>
                </td>
              </tr>
            </thead>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./vs.png"}
                      alt="vs"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./firebase.png"}
                      alt="firebase"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./mysql.png"}
                      alt="mysql"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./npm.png"}
                      alt="css"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./postman.png"}
                      alt="postman"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./reactjs.png"}
                      alt="reactjs"
                    ></img>
                  </td>
                </tr>
                <tr>
                  <td className="stack-name-item">VS Code</td>
                  <td className="stack-name-item">Firebase</td>
                  <td className="stack-name-item">MySQL</td>
                  <td className="stack-name-item">NPM</td>
                  <td className="stack-name-item">Postman</td>
                  <td className="stack-name-item">React</td>
                </tr>

                <tr>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./python.png"}
                      alt="python"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./bootstrap5.png"}
                      alt="bootstrap5"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./java.png"}
                      alt="java"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./html5.png"}
                      alt="css"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./css.png"}
                      alt="html5"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./js.png"}
                      alt="js"
                    ></img>
                  </td>
                </tr>

                <tr>
                  <td className="stack-name-item">Python</td>
                  <td className="stack-name-item">Bootstrap</td>
                  <td className="stack-name-item">Java</td>
                  <td className="stack-name-item">HTML5</td>
                  <td className="stack-name-item">CSS3</td>
                  <td className="stack-name-item">Javascript</td>
                </tr>

                <tr>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./figma.png"}
                      alt="css"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./c++.png"}
                      alt="c++"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./c.png"}
                      alt="c"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./nodejs.png"}
                      alt="nodejs"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./django.png"}
                      alt="css"
                    ></img>
                  </td>
                  <td>
                    <img
                      className="stack-item"
                      src={process.env.PUBLIC_URL + "./spring.png"}
                      alt="spring"
                    ></img>
                  </td>
                </tr>

                <tr>
                  <td className="stack-name-item">Figma</td>
                  <td className="stack-name-item">C++</td>
                  <td className="stack-name-item">C#</td>
                  <td className="stack-name-item">NodeJS</td>
                  <td className="stack-name-item">Django</td>
                  <td className="stack-name-item">SpringBoot</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
