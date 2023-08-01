import React from 'react'
import { motion } from "framer-motion"

import './Loader.css';

const Loader = () => {
    return(
        <html>
            <head>

            </head>
            <body>
            <motion.div animate = {{opacity:1, x: 100, width: 500, transitionEnd:{display: "none",},}}
                transition={{delay: 1}}
                initial={{opacity: 0}}
                >
                  <div className='page-title'>
                    <p>
                    Aditya Agrawal
                    </p>
                </div>
                  </motion.div>
                
            </body>
        </html>
    );
}

export default Loader