const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config();

// Import models and setup database
const { sequelize } = require('./config/database');
const models = require('./models');

// Import routes
const authRoutes = require('./routes/auth');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/projects');
const certificationRoutes = require('./routes/certifications');
const bulkRoutes = require('./routes/bulk');

const app = express();

// Trust proxy so express-rate-limit can parse X-Forwarded-For behind API Gateway/ALB
app.set('trust proxy', true);

// Configure AWS S3 for file uploads
const s3 = new AWS.S3();
const UPLOADS_BUCKET = process.env.UPLOADS_BUCKET || 'portfolio-cms-prod-uploads';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// S3 file upload configuration for images
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// S3 file upload configuration for resume (PDF files)
const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for PDF
  },
  fileFilter: (req, file, cb) => {
    // Allow only PDF files for resume
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resume!'), false);
    }
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/bulk', bulkRoutes);

// S3 file upload route
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = req.file.fieldname + '-' + uniqueSuffix + path.extname(req.file.originalname);
    
    const uploadParams = {
      Bucket: UPLOADS_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(uploadParams).promise();
    
    res.json({
      message: 'File uploaded successfully',
      filename: fileName,
      url: result.Location,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Resume upload route (admin only)
app.post('/api/admin/resume', resumeUpload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }
    
    // Use a fixed key for the resume so we can easily replace it
    const fileName = 'resume.pdf';
    
    const uploadParams = {
      Bucket: UPLOADS_BUCKET,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(uploadParams).promise();
    
    res.json({
      message: 'Resume uploaded successfully',
      filename: fileName,
      url: result.Location,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ error: 'Resume upload failed' });
  }
});

// Resume download route (public)
app.get('/api/resume', async (req, res) => {
  try {
    const getObjectParams = {
      Bucket: UPLOADS_BUCKET,
      Key: 'resume.pdf'
    };

    // Check if resume exists
    try {
      await s3.headObject(getObjectParams).promise();
    } catch (headError) {
      if (headError.code === 'NotFound') {
        return res.status(404).json({ error: 'Resume not found' });
      }
      throw headError;
    }

    // Get the resume file
    const result = await s3.getObject(getObjectParams).promise();
    
    // Set appropriate headers for PDF viewing/download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Aditya_Agrawal_Resume.pdf"',
      'Content-Length': result.ContentLength
    });
    
    res.send(result.Body);
  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).json({ error: 'Resume download failed' });
  }
});

// Resume info route (public) - returns resume metadata
app.get('/api/resume/info', async (req, res) => {
  try {
    const getObjectParams = {
      Bucket: UPLOADS_BUCKET,
      Key: 'resume.pdf'
    };

    try {
      const headResult = await s3.headObject(getObjectParams).promise();
      
      res.json({
        exists: true,
        lastModified: headResult.LastModified,
        size: headResult.ContentLength,
        downloadUrl: '/api/resume'
      });
    } catch (headError) {
      if (headError.code === 'NotFound') {
        return res.json({ exists: false });
      }
      throw headError;
    }
  } catch (error) {
    console.error('Resume info error:', error);
    res.status(500).json({ error: 'Failed to get resume info' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database on Lambda cold start
let dbInitialized = false;

async function initializeDatabase() {
  if (!dbInitialized) {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully.');
      
      // Sync database (creates tables if they don't exist)
      await sequelize.sync({ alter: true });
      console.log('Database synchronized.');
      
      dbInitialized = true;
    } catch (error) {
      console.error('Unable to connect to database:', error);
      throw error;
    }
  }
}

// Wrap the Express app for serverless
const handler = serverless(app, {
  request: async (request, event, context) => {
    // Initialize database on each Lambda invocation
    await initializeDatabase();
  }
});

module.exports = { handler };