#!/usr/bin/env node

/**
 * This script optimizes and pre-processes images to reduce load time
 * and eliminate the need for the Vercel image optimization service.
 * 
 * Run this script before building the site.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configurations
const IMG_DIR = path.join(__dirname, '..', 'src', 'img');
const SIZES = [48, 96, 120, 240, 480, 800];
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all image files
const processDirectory = (directory) => {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Skip directories named "optimized" to avoid processing already optimized images
      if (path.basename(filePath) !== 'optimized') {
        processDirectory(filePath);
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      // Skip already processed files
      if (file.includes('_optimized_')) return;
      
      console.log(`Processing ${file}...`);
      
      // Generate optimized versions in different sizes
      SIZES.forEach(size => {
        const outputFilename = `${path.parse(file).name}_optimized_${size}${path.parse(file).ext}`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);
        
        sharp(filePath)
          .resize(size)
          .jpeg({ quality: 80, progressive: true })
          .toFile(outputPath)
          .then(() => console.log(`Created ${outputFilename}`))
          .catch(err => console.error(`Error processing ${file} at size ${size}:`, err));
      });
      
      // Also create a WebP version at original size for maximum quality needs
      const webpOutputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.webp`);
      sharp(filePath)
        .webp({ quality: 85 })
        .toFile(webpOutputPath)
        .then(() => console.log(`Created WebP version of ${file}`))
        .catch(err => console.error(`Error creating WebP for ${file}:`, err));
    }
  });
};

// Start processing
console.log('Starting image optimization...');
processDirectory(IMG_DIR);
console.log('Image optimization complete.');
