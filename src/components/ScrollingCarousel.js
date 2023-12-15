// ScrollingCarousel.js

import React, { useEffect } from "react";
import "./ScrollingCarousel.css";

const ScrollingCarousel = (props) => {
  useEffect(() => {
    const container = document.querySelector(".sc-scroll-block");
    const images = document.querySelectorAll(".sc-section-block-image-item");

    const cloneImages = () => {
      images.forEach((image) => {
        const clone = image.cloneNode(true);
        container.appendChild(clone);
      });
    };

    cloneImages();

    const scroll = () => {
      const scrollAmount = container.scrollLeft;
      const containerWidth = container.clientWidth;

      if (scrollAmount >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const startScrolling = () => {
      setInterval(scroll, 30); // Adjust the interval for smoother scrolling
    };

    startScrolling();

    // Clean up the cloned images when the component is unmounted
    return () => {
      images.forEach((image) => {
        image.remove();
      });
    };
  }, []);

  return (
    <div className="sc-container">
      <section className="sc-section-block">
        <div className="sc-title-block">
          <label className="sc-title">{props.title}</label>
        </div>
        <div className="sc-scroll-block">
          <div className="sc-section-block-image">
            <img
              className="sc-section-block-image-item"
              id="sc-image-item-01"
              src={process.env.PUBLIC_URL + "/Sunly_Yellow-01 (2).png"}
              alt="Image 1"
            />
            <img
              className="sc-section-block-image-item"
              id="sc-image-item-02"
              src={process.env.PUBLIC_URL + "/the spice store final.jpg"}
              alt="Image 2"
            />

            <img
              className="sc-section-block-image-item"
              id="sc-image-item-03"
              src={process.env.PUBLIC_URL + "/UPEI.jpg"}
              alt="Image 3"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollingCarousel;
