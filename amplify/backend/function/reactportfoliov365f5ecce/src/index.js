const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    // Parse input from the event object
    const { email, subject, message } = JSON.parse(event.body);

    // Nodemailer setup (use your own credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aditya25agrawal@gmail.com",
        pass: "ubvbzrgkisurqtxe",
      },
    });

    // Compose the email
    const mailOptions = {
      from: "aditya25agrawal@gmail.com",
      to: "aditya25agrawal@gmail.com", // Replace with the recipient's email address
      subject: "New Form Submission: " + email,
      text: `Email: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully", info }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};
