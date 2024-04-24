// EmailModal.js
import React, { useState } from "react";
import "./EmailModal.css"; // You'll need to create this CSS file

const EmailModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://www.aditya-folio.com/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            subject,
            feedback: message, // Corrected field name to match your textarea id
          }),
        }
      );

      if (response.ok) {
        console.log("Email sent successfully");
        onClose(); // Close the modal on successful submission
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className={`email-modal ${isOpen ? "open" : ""}`}>
      <div className="email-modal-content">
        <form onSubmit={handleSubmit}>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <label htmlFor="feedback">Message:</label>
          <textarea
            id="feedback" // Corrected id to match the field name in the fetch request
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <label htmlFor="stephen">Stephen's Field (Test):</label>
          <textarea
            id="stephen"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div id="button-container-01">
            <button id="send-button-01" type="submit">
              Send
            </button>
          </div>
          {/* Social Media Links */}
          <div className="social-media-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={process.env.PUBLIC_URL + "/iconmonstr-linkedin-5-240.png"}
                alt="LinkedIn"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={
                  process.env.PUBLIC_URL + "/iconmonstr-instagram-15-240.png"
                }
                alt="Instagram"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={process.env.PUBLIC_URL + "/iconmonstr-github-5-240.png"}
                alt="GitHub"
              />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
