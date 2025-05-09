const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesDir = path.join(__dirname, '../public/images');

// Ensure the images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Fashion image URLs (using placeholder services)
const fashionImages = [
  {
    url: 'https://picsum.photos/seed/fashion1/800/1000',
    filename: 'fashion-look1-1.jpg'
  },
  {
    url: 'https://picsum.photos/seed/fashion2/800/1000',
    filename: 'fashion-look1-2.jpg'
  },
  {
    url: 'https://picsum.photos/seed/fashion3/800/1000',
    filename: 'fashion-look2-1.jpg'
  },
  {
    url: 'https://picsum.photos/seed/fashion4/800/1000',
    filename: 'fashion-look2-2.jpg'
  },
  {
    url: 'https://picsum.photos/seed/fashion5/800/1000',
    filename: 'fashion-look3-1.jpg'
  },
  {
    url: 'https://picsum.photos/seed/fashion6/800/1000',
    filename: 'fashion-look3-2.jpg'
  }
];

// Product image URLs
const productImages = [
  {
    url: 'https://picsum.photos/seed/product1/400/500',
    filename: 'product1.jpg'
  },
  {
    url: 'https://picsum.photos/seed/product2/400/500',
    filename: 'product2.jpg'
  },
  {
    url: 'https://picsum.photos/seed/product3/400/500',
    filename: 'product3.jpg'
  },
  {
    url: 'https://picsum.photos/seed/product4/400/500',
    filename: 'product4.jpg'
  },
  {
    url: 'https://picsum.photos/seed/product5/400/500',
    filename: 'product5.jpg'
  },
  {
    url: 'https://picsum.photos/seed/product6/400/500',
    filename: 'product6.jpg'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  const allImages = [...fashionImages, ...productImages];
  
  for (const image of allImages) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Failed to download ${image.filename}`);
    }
  }
  
  console.log('All images downloaded successfully!');
}

downloadAllImages();
