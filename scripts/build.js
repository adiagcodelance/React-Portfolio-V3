#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Portfolio CMS for production...\n');

try {
  // 1. Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // 2. Build React frontend
  console.log('⚛️  Building React frontend...');
  execSync('npm run build', { stdio: 'inherit' });

  // 3. Copy backend files to build directory
  console.log('🔧 Setting up backend...');
  const buildDir = path.join(__dirname, '..', 'build');
  const backendDir = path.join(buildDir, 'backend');
  
  // Create backend directory in build
  if (!fs.existsSync(backendDir)) {
    fs.mkdirSync(backendDir, { recursive: true });
  }

  // Copy backend files
  execSync(`cp -r backend/* ${backendDir}/`, { stdio: 'inherit' });
  
  // Copy package.json and create production package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const prodPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    main: 'backend/server.js',
    scripts: {
      start: 'node backend/server.js',
      migrate: 'node backend/migrate-data.js'
    },
    dependencies: {
      express: packageJson.dependencies.express,
      sqlite3: packageJson.dependencies.sqlite3,
      sequelize: packageJson.dependencies.sequelize,
      bcryptjs: packageJson.dependencies.bcryptjs,
      jsonwebtoken: packageJson.dependencies.jsonwebtoken,
      cors: packageJson.dependencies.cors,
      multer: packageJson.dependencies.multer,
      helmet: packageJson.dependencies.helmet,
      'express-rate-limit': packageJson.dependencies['express-rate-limit'],
      dotenv: packageJson.dependencies.dotenv,
      'express-validator': packageJson.dependencies['express-validator']
    }
  };

  fs.writeFileSync(
    path.join(buildDir, 'package.json'), 
    JSON.stringify(prodPackageJson, null, 2)
  );

  // Copy environment files
  if (fs.existsSync('.env.production')) {
    fs.copyFileSync('.env.production', path.join(buildDir, '.env'));
  }

  // Create uploads directory
  const uploadsDir = path.join(buildDir, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Create deployment README
  const deployReadme = `# Portfolio CMS - Production Build

## Deployment Instructions

1. Upload this entire \`build\` directory to your server
2. Install production dependencies:
   \`\`\`bash
   npm install --production
   \`\`\`

3. Set up your environment variables in \`.env\`:
   - Change JWT_SECRET to a secure random string
   - Update FRONTEND_URL to your domain
   - Configure database if using PostgreSQL

4. Initialize your data (optional):
   \`\`\`bash
   npm run migrate
   \`\`\`

5. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

## Server Configuration

Your server should:
- Serve static files from the root directory for the React app
- Proxy API requests to /api/* to your Node.js backend
- Handle file uploads to /uploads/*

## Default Admin Credentials
- Username: admin  
- Password: admin123
- **⚠️ CHANGE THESE IMMEDIATELY AFTER FIRST LOGIN**

## Features
✅ Complete CMS for portfolio content
✅ Admin dashboard for content management
✅ Backup/restore functionality
✅ Image upload support
✅ Responsive design
✅ SEO optimized
`;

  fs.writeFileSync(path.join(buildDir, 'DEPLOYMENT.md'), deployReadme);

  console.log('✅ Build completed successfully!');
  console.log('\n📁 Production files are in the /build directory');
  console.log('📖 See build/DEPLOYMENT.md for deployment instructions');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}