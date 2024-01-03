/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/send-email", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

// ... (Keep the rest of the template code if needed)

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object
module.exports = app;
