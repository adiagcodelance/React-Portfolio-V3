const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import models and setup database
const { sequelize } = require('./config/database');
const models = require('./models');
const { authenticateToken } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const experienceRoutes = require('./routes/experience');
const projectRoutes = require('./routes/projects');
const certificationRoutes = require('./routes/certifications');
const bulkRoutes = require('./routes/bulk');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy so express-rate-limit can parse X-Forwarded-For behind API Gateway/ALB
app.set('trust proxy', true);

// Rate limiting (relaxed for development)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs (increased for development)
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload configuration for Lambda (using memory storage)
const storage = multer.memoryStorage();

// Alternative: If you want disk storage, use /tmp in Lambda
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = '/tmp/uploads';
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (increased for PDFs)
  },
  fileFilter: (req, file, cb) => {
    // Allow image files and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image files and PDFs are allowed!'), false);
    }
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/bulk', bulkRoutes);

// File upload route - try both 'file' and 'image' field names
app.post('/api/upload', upload.any(), (req, res) => {
  try {
    // Handle multiple field names (files array from upload.any())
    const file = req.files && req.files[0];
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const filename = `file-${uniqueSuffix}${fileExtension}`;
    
    // Save to /tmp directory in Lambda
    const uploadDir = '/tmp/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);
    
    // For now, return a placeholder URL
    // In production, you would upload to S3 and return the S3 URL
    const fileUrl = `/uploads/${filename}`;
    
    res.json({ 
      message: 'File uploaded successfully',
      filename: filename,
      url: fileUrl,
      originalName: file.originalname,
      size: file.size,
      type: file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// Alternative base64 upload endpoint
app.post('/api/upload-base64', authenticateToken, (req, res) => {
  try {
    const { fileName, fileData, fileType } = req.body;
    
    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'fileName and fileData are required' });
    }
    
    // Decode base64
    const buffer = Buffer.from(fileData, 'base64');
    
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(fileName);
    const filename = `file-${uniqueSuffix}${fileExtension}`;
    
    // Save to /tmp directory in Lambda
    const uploadDir = '/tmp/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    // Return file info
    const fileUrl = `/uploads/${filename}`;
    
    res.json({ 
      message: 'File uploaded successfully',
      filename: filename,
      url: fileUrl,
      originalName: fileName,
      size: buffer.length,
      type: fileType || 'application/octet-stream'
    });
  } catch (error) {
    console.error('Base64 upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// Test upload endpoint for debugging
app.post('/api/upload-test', (req, res) => {
  res.json({ 
    message: 'Upload test endpoint working',
    headers: req.headers,
    contentType: req.get('content-type')
  });
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
    console.error('Multer error:', error.code, error.message);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected field' });
    }
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database initialization and server start
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();