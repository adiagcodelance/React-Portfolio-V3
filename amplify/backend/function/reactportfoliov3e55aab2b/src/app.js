/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import the cors module

const app = express();
const PORT = 3000; // Replace with your desired port number

// Middleware
app.use(bodyParser.json());

const allowedOrigins = {
  origin: "https://aditya-folio.com",
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(
  cors({
    origin: allowedOrigins,
  })
);

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
