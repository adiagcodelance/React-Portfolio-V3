import React, { useState } from "react";
import axios from "axios";
import fbform from "../components/Feedbackform.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-feedback",
        formData
      );
      if (response && response.data && response.data.message) {
        console.log(response.data.message); // Display success message
        setFormData({ name: "", email: "", feedback: "" }); // Clear form fields after successful submission
      } else {
        console.error("Error sending feedback:", response); // Display error message if the response data is not as expected
      }
    } catch (error) {
      console.error("Error sending feedback:", error); // Display error message from the server, if any
    }
  };

  return (
    <div className="fb-form-main">
      <div className="form-header">
        <h1>Feedback Form</h1>
      </div>
      <form className="fb-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <br />

        <label htmlFor="feedback">Feedback:</label>
        <br />
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          rows="4"
          cols="50"
          required
        ></textarea>
        <br />
        <div className="submit-button">
          <input id="submit" type="submit" value="Submit Feedback" />
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
