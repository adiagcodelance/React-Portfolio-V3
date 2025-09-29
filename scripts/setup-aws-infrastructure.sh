#!/bin/bash

# Portfolio CMS AWS Infrastructure Setup Script
# This script creates all AWS resources needed for the portfolio deployment

set -e

echo "🚀 Setting up AWS infrastructure for Portfolio CMS..."

# Configuration
PROJECT_NAME="portfolio-cms"
REGION="us-east-1"
S3_BUCKET="${PROJECT_NAME}-frontend-$(date +%s)"
DB_NAME="portfoliocms"
DB_USERNAME="portfoliouser"
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)

echo "📋 Configuration:"
echo "   Region: $REGION"
echo "   S3 Bucket: $S3_BUCKET"
echo "   Database: $DB_NAME"
echo "   DB User: $DB_USERNAME"
echo ""

# Check AWS credentials
echo "🔐 Checking AWS credentials..."
aws sts get-caller-identity
echo ""

# Create S3 bucket for frontend
echo "📦 Creating S3 bucket for frontend hosting..."
aws s3 mb s3://$S3_BUCKET --region $REGION
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
aws s3 website s3://$S3_BUCKET --index-document index.html --error-document error.html
echo "✅ S3 bucket created: $S3_BUCKET"
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
echo ""

# Create RDS PostgreSQL database
echo "🗄️ Creating RDS PostgreSQL database..."
aws rds create-db-instance \
  --db-instance-identifier "$PROJECT_NAME-db" \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 13.13 \
  --master-username "$DB_USERNAME" \
  --master-user-password "$DB_PASSWORD" \
  --db-name "$DB_NAME" \
  --allocated-storage 20 \
  --storage-type gp2 \
  --vpc-security-group-ids $(aws ec2 describe-security-groups --filters "Name=group-name,Values=default" --query "SecurityGroups[0].GroupId" --output text) \
  --backup-retention-period 7 \
  --multi-az false \
  --publicly-accessible true \
  --storage-encrypted false \
  --deletion-protection false

echo "✅ RDS instance creation initiated (this takes 5-10 minutes)"
echo "   Instance ID: $PROJECT_NAME-db"
echo ""

# Wait for database to be available
echo "⏳ Waiting for database to become available..."
aws rds wait db-instance-available --db-instance-identifier "$PROJECT_NAME-db"

# Get database endpoint
DB_ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier "$PROJECT_NAME-db" --query "DBInstances[0].Endpoint.Address" --output text)
DATABASE_URL="postgresql://$DB_USERNAME:$DB_PASSWORD@$DB_ENDPOINT:5432/$DB_NAME"

echo "✅ Database is ready!"
echo "   Endpoint: $DB_ENDPOINT"
echo ""

# Create IAM role for Lambda
echo "🔐 Creating IAM role for Lambda functions..."
aws iam create-role --role-name PortfolioCMSLambdaRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

aws iam attach-role-policy --role-name PortfolioCMSLambdaRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam attach-role-policy --role-name PortfolioCMSLambdaRole --policy-arn arn:aws:iam::aws:policy/AmazonRDSDataFullAccess

echo "✅ Lambda IAM role created"
echo ""

# Output summary
echo "🎉 AWS Infrastructure Setup Complete!"
echo ""
echo "📝 GitHub Secrets to add:"
echo "AWS_REGION: $REGION"
echo "S3_BUCKET_NAME: $S3_BUCKET"
echo "CLOUDFRONT_DISTRIBUTION_ID: $CLOUDFRONT_ID"
echo "DATABASE_URL: $DATABASE_URL"
echo "FRONTEND_URL: https://$CLOUDFRONT_DOMAIN"
echo ""
echo "💡 Next steps:"
echo "1. Add these secrets to your GitHub repository"
echo "2. Re-run the GitHub Actions deployment"
echo "3. Your portfolio will be live at: https://$CLOUDFRONT_DOMAIN"
echo ""

# Save configuration for reference
cat > aws-config.txt << EOF
# AWS Portfolio CMS Configuration
AWS_REGION=$REGION
S3_BUCKET_NAME=$S3_BUCKET
CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_ID
CLOUDFRONT_DOMAIN=$CLOUDFRONT_DOMAIN
DATABASE_URL=$DATABASE_URL
FRONTEND_URL=https://$CLOUDFRONT_DOMAIN
DB_ENDPOINT=$DB_ENDPOINT
DB_NAME=$DB_NAME
DB_USERNAME=$DB_USERNAME
DB_PASSWORD=$DB_PASSWORD
EOF

echo "📄 Configuration saved to aws-config.txt"