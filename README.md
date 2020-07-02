## Problem
Write tests to verify that:
1. Navigation between sites works properly
- login to SharePoint with given credentials
- start a test by clicking "Start" button on Home site. This will redirect you to another site page with test task data
- assert that navigation to Test task site was successful

2. Slideshow (animation) is working
- first element on a test page is "Slideshow". It has 4 images in it, but only 3 of them are shown by default. Write a test to make sure that ALL images will be eventually shown

3. Verify that hover effects for each Tile are animated
- this is second element on a test page that has a grid containing 4 items. Each has its unique animation on hover. Write a test to make sure that animation for each Tile is working

## Install and build
npm install
npm run webdriver-update
npm run build

## Run
Simple F5 in VisualStudio Code
