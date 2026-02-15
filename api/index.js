// Vercel serverless function wrapper for Express app
const app = require('../backend/server');

// Export as Vercel handler
module.exports = (req, res) => {
  // Express app handles the request
  return app(req, res);
};
