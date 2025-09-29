#!/bin/bash

# Simple Portfolio CMS AWS Setup Script (SQLite version)
# This creates S3 + CloudFront without RDS for easier deployment

set -e

echo "🚀 Setting up simple AWS infrastructure for Portfolio CMS..."

# Configuration
PROJECT_NAME="portfolio-cms"
REGION="us-east-1"
S3_BUCKET="${PROJECT_NAME}-frontend-$(date +%s)"

echo "📋 Configuration:"
echo "   Region: $REGION"
echo "   S3 Bucket: $S3_BUCKET"
echo ""

# Check AWS credentials
echo "🔐 Checking AWS credentials..."
aws sts get-caller-identity
echo ""

# Create S3 bucket for frontend
echo "📦 Creating S3 bucket for frontend hosting..."
aws s3 mb s3://$S3_BUCKET --region $REGION

# Configure bucket for website hosting
aws s3 website s3://$S3_BUCKET --index-document index.html --error-document error.html

# Make bucket public for website hosting
aws s3api put-bucket-policy --bucket $S3_BUCKET --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$S3_BUCKET'/*"
    }
  ]
}'

echo "✅ S3 bucket created: $S3_BUCKET"
echo "   Website endpoint: http://$S3_BUCKET.s3-website-$REGION.amazonaws.com"
echo ""

# Create CloudFront distribution
echo "☁️ Creating CloudFront distribution..."
CLOUDFRONT_CONFIG=$(cat << EOF
{
  "CallerReference": "portfolio-$(date +%s)",
  "Comment": "Portfolio CMS CloudFront Distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$S3_BUCKET",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "SmoothStreaming": false,
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$S3_BUCKET",
        "DomainName": "$S3_BUCKET.s3-website-$REGION.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF
)

CLOUDFRONT_OUTPUT=$(aws cloudfront create-distribution --distribution-config "$CLOUDFRONT_CONFIG")
CLOUDFRONT_ID=$(echo "$CLOUDFRONT_OUTPUT" | jq -r '.Distribution.Id')
CLOUDFRONT_DOMAIN=$(echo "$CLOUDFRONT_OUTPUT" | jq -r '.Distribution.DomainName')

echo "✅ CloudFront distribution created: $CLOUDFRONT_ID"
echo "   Domain: $CLOUDFRONT_DOMAIN"
echo "   Status: Deploying (takes 10-15 minutes)"
echo ""

# Output summary
echo "🎉 Simple AWS Infrastructure Setup Complete!"
echo ""
echo "📝 GitHub Secrets to add:"
echo "AWS_REGION: $REGION"
echo "S3_BUCKET_NAME: $S3_BUCKET"
echo "CLOUDFRONT_DISTRIBUTION_ID: $CLOUDFRONT_ID"
echo "DATABASE_URL: sqlite:./backend/data.sqlite"
echo "FRONTEND_URL: https://$CLOUDFRONT_DOMAIN"
echo ""
echo "💡 Next steps:"
echo "1. Add these secrets to your GitHub repository"
echo "2. Re-run the GitHub Actions deployment"  
echo "3. Your portfolio will be live at: https://$CLOUDFRONT_DOMAIN"
echo ""

# Save configuration for reference
cat > aws-config-simple.txt << EOF
# Simple AWS Portfolio CMS Configuration
AWS_REGION=$REGION
S3_BUCKET_NAME=$S3_BUCKET
CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_ID
CLOUDFRONT_DOMAIN=$CLOUDFRONT_DOMAIN
DATABASE_URL=sqlite:./backend/data.sqlite
FRONTEND_URL=https://$CLOUDFRONT_DOMAIN
S3_WEBSITE_ENDPOINT=http://$S3_BUCKET.s3-website-$REGION.amazonaws.com
EOF

echo "📄 Configuration saved to aws-config-simple.txt"