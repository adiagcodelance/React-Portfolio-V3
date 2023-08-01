import React from "react";
import { motion } from "framer-motion";

import "./ProjectContent.css";

const ProjectContent = () => {
  return (
    <div className="project-container">
      <div className="project-column-one">
        <motion.div
          animate={{ opacity: 1, width: 500 }}
          transition={{ delay: 0.5 }}
          initial={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1, width: 500 }}
          transition={{ delay: 1 }}
          initial={{ opacity: 0 }}
        >
          <label className="project-sub-header">Projects on display</label>
        </motion.div>
        <div className="project-card-body">
          <p>
            Welcome to the project page, here are the projects I have worked
            displayed to showcase skills and current projects. This page acts as
            my resume and a log to help me keep track of my projects completed
            and on-going. This page acts as an example of one of my on-going
            projects mentioned in the list.
          </p>
        </div>
      </div>

      <div className="projects">
        <div className="project-table">
          <motion.div
            animate={{ opacity: 1, width: 500 }}
            transition={{ delay: 1.5 }}
            initial={{ opacity: 0 }}
          >
            <label className="project-sub-header">Projects</label>
            <table>
              <thead>
                <tr>
                  <th className="project-table-header">Academic</th>
                  <th className="project-table-header">Professional</th>
                  <th className="project-table-header">Personal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Academic project cells */}
                  <td className="project-item">Project 1</td>
                  <td className="project-item">Project A</td>
                </tr>
                <tr>
                  {/* Description cells for academic projects */}
                  <td className="project-item">Description of Project 1</td>
                  <td className="project-item">Description of Project A</td>
                </tr>
                <tr>
                  {/* Add more rows for other projects if needed */}
                  <td className="project-item">Project 2</td>
                  <td className="project-item">Project B</td>
                </tr>
                <tr>
                  {/* Description cells for professional projects */}
                  <td className="project-item">Description of Project 2</td>
                  <td className="project-item">Description of Project B</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
