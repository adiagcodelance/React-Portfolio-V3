import React from "react";
import "./TimelineComponent.css";

const TimelineComponent = () => {
  return (
    
    <div class="timeline">
      <div class="event" id="event-01">
        {" "}
        <div class="event-content">
          <h3>2023</h3>
        </div>
      </div>

      <div class="event" id="event-02">
        <div class="event-content">
          <h3>2022</h3>
        </div>
      </div>

      <div class="event" id="event-03">
        <div class="event-content">
          <h3>2021</h3>
        </div>
      </div>

      <div class="event" id="event-04">
        <div class="event-content">
          <h3>2014</h3>
        </div>
      </div>
    
    </div>
  );
};

export default TimelineComponent;
