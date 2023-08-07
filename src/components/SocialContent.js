import React from "react";
import { motion } from "framer-motion";

import "./SocialContent.css";

const SocialContent = () => {
  return (
    <div className="social-container">
      <div className="social-column-one">
        <motion.div
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.5 }}
          initial={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1 }}
          initial={{ opacity: 0 }}
        >
          <label className="social-sub-header">Connect with me</label>
        </motion.div>
        <div className="social-card-body">
          <p>
            Here is how to connect with me, I aim to grow my networking skills
            and would love to make more connections to build a network with
            everyone in industry.
          </p>
        </div>
      </div>

      <div className="socials">
        <div className="social-table">
          <motion.div
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 1.5 }}
            initial={{ opacity: 0 }}
          >
            <label className="social-sub-header">Socials</label>
            <table>
              <tr>
                <td>
                  <a href="https://www.linkedin.com/in/aditya-agrawal96-91824b18b">
                    <img
                      className="social-item"
                      src={process.env.PUBLIC_URL + "./Type=Default (1).png"}
                      alt="linkedin"
                    ></img>
                  </a>
                </td>
                <td>
                  <a href="mailto:aditya25agrawal@gmail.com">
                    <img
                      className="social-item"
                      src={process.env.PUBLIC_URL + "./Type=Default (2).png"}
                      alt="gmail"
                    ></img>
                  </a>
                </td>
                <td>
                  <a href="https://bmc.link/aditya25agc">
                    <img
                      className="social-item"
                      src={process.env.PUBLIC_URL + "./Type=Default.png"}
                      alt="css"
                    ></img>
                  </a>
                </td>
                <td>
                  <img
                    className="social-item"
                    src={process.env.PUBLIC_URL + "./twitter.png"}
                    alt="twitter"
                  ></img>
                </td>
                <td>
                  <a href="https://www.instagram.com/adiag_id/?hl=en">
                    <img
                      className="social-item"
                      src={process.env.PUBLIC_URL + "./Type=Flat (3).png"}
                      alt="instagram"
                    ></img>
                  </a>
                </td>
                <td>
                  <a href="https://www.facebook.com/profile.php?id=100069944657553">
                    <img
                      className="social-item"
                      src={process.env.PUBLIC_URL + "./Type=Flat (4).png"}
                      alt="facebook"
                    ></img>
                  </a>
                </td>
              </tr>
            </table>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SocialContent;
