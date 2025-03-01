#!/usr/bin/env node

/**
 * This script downloads the Inter font files needed for local hosting
 * Run this script before building the site to ensure all font files are available
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// URLs for Inter font files (WOFF2 format for better performance)
const fontFiles = [
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Thin.woff2',
    weight: 100
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-ExtraLight.woff2',
    weight: 200
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Light.woff2',
    weight: 300
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Regular.woff2', 
    weight: 400
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Medium.woff2',
    weight: 500
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-SemiBold.woff2',
    weight: 600
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Bold.woff2',
    weight: 700
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-ExtraBold.woff2',
    weight: 800
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Black.woff2',
    weight: 900
  }
];

// Create the fonts directory in public if it doesn't exist
const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
  console.log('Created fonts directory');
}

// Download each font file
fontFiles.forEach(font => {
  const filePath = path.join(fontsDir, font.filename);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`${font.filename} already exists, skipping`);
    return;
  }
  
  console.log(`Downloading ${font.filename}...`);
  
  const file = fs.createWriteStream(filePath);
  https.get(font.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${font.filename}`);
    });
  }).on('error', err => {
    fs.unlink(filePath);
    console.error(`Error downloading ${font.filename}:`, err.message);
  });
});

console.log('Font download process started. Check the fonts directory for results.');
