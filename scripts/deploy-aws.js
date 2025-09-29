#!/usr/bin/env node

const { execSync } = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// AWS Configuration
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'your-portfolio-bucket';
const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const REGION = process.env.AWS_REGION || 'us-east-1';

const s3 = new AWS.S3({ region: REGION });
const cloudfront = new AWS.CloudFront();

console.log('🚀 Starting AWS deployment...\n');

async function deployToAWS() {
  try {
    // 1. Build the React app
    console.log('📦 Building React application...');
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Upload build files to S3
    console.log('☁️  Uploading to S3...');
    await uploadDirectory('./build', BUCKET_NAME);

    // 3. Invalidate CloudFront cache (if configured)
    if (CLOUDFRONT_DISTRIBUTION_ID) {
      console.log('🔄 Invalidating CloudFront cache...');
      await invalidateCloudFront();
    }

    console.log('✅ Frontend deployment completed successfully!');
    console.log(`🌐 Your portfolio is available at: https://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

async function uploadDirectory(directoryPath, bucketName, prefix = '') {
  const files = getAllFiles(directoryPath);
  
  for (const file of files) {
    const relativePath = path.relative(directoryPath, file);
    const s3Key = prefix + relativePath.replace(/\\\\/g, '/');
    
    console.log(`Uploading: ${s3Key}`);
    
    const fileContent = fs.readFileSync(file);
    const contentType = mime.lookup(file) || 'application/octet-stream';
    
    const uploadParams = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: getCacheControl(file),
    };

    await s3.upload(uploadParams).promise();
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Cache static assets for 1 year
  if (['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2'].includes(ext)) {
    return 'public, max-age=31536000, immutable';
  }
  
  // Cache HTML files for 1 hour
  if (ext === '.html') {
    return 'public, max-age=3600';
  }
  
  // Default cache for other files
  return 'public, max-age=86400';
}

async function invalidateCloudFront() {
  const params = {
    DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: ['/*']
      }
    }
  };

  const result = await cloudfront.createInvalidation(params).promise();
  console.log(`CloudFront invalidation created: ${result.Invalidation.Id}`);
}

// Create S3 bucket with website configuration
async function createBucketIfNotExists() {
  try {
    await s3.headBucket({ Bucket: BUCKET_NAME }).promise();
    console.log(`Bucket ${BUCKET_NAME} already exists.`);
  } catch (error) {
    if (error.statusCode === 404) {
      console.log(`Creating bucket: ${BUCKET_NAME}`);
      
      await s3.createBucket({
        Bucket: BUCKET_NAME,
        CreateBucketConfiguration: {
          LocationConstraint: REGION
        }
      }).promise();

      // Configure bucket for static website hosting
      await s3.putBucketWebsite({
        Bucket: BUCKET_NAME,
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: 'index.html' }
        }
      }).promise();

      // Set bucket policy for public read access
      const bucketPolicy = {
        Version: '2012-10-17',
        Statement: [{
          Sid: 'PublicReadGetObject',
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
        }]
      };

      await s3.putBucketPolicy({
        Bucket: BUCKET_NAME,
        Policy: JSON.stringify(bucketPolicy)
      }).promise();

      console.log(`Bucket ${BUCKET_NAME} created and configured for static website hosting.`);
    } else {
      throw error;
    }
  }
}

// Run deployment
if (require.main === module) {
  createBucketIfNotExists().then(() => deployToAWS());
}