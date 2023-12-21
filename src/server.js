// server.js (Node.js backend)
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import the cors module

const app = express();
const PORT = 3000; // Replace with your desired port number

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'gmail', 'hotmail', 'yahoo', etc.
  auth: {
    user: "aditya25agrawal@gmail.com",
    pass: "ubvbzrgkisurqtxe",
  },
});

// API endpoint to handle form submissions
app.post("/api/send-email", (req, res) => {
  const { email, subject, message } = req.body;

  // Compose the email
  const mailOptions = {
    from: "aditya25agrawal@gmail.com", // Replace with your email address
    to: "aditya25agrawal@gmail.com", // Replace with the recipient's email address
    subject: "New Form Submission: " + email,
    text: `Email: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message." });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Message sent successfully." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/api/send-email", (req, res) => {
  console.log("Received form submission:", req.body);

  // Rest of your server code...
});
