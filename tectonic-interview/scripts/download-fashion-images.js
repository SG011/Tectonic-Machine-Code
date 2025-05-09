const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesDir = path.join(__dirname, '../public/images');

// Ensure the images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Fashion items with specific search terms for better results
const fashionItems = [
  {
    category: 'dress',
    filename: 'dress.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?dress,fashion'
  },
  {
    category: 'shirt',
    filename: 'shirt.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?shirt,fashion'
  },
  {
    category: 'jeans',
    filename: 'jeans.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?jeans,denim'
  },
  {
    category: 'sweater',
    filename: 'sweater.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?sweater,fashion'
  },
  {
    category: 'jacket',
    filename: 'jacket.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?jacket,fashion'
  },
  {
    category: 'hat',
    filename: 'hat.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?hat,fashion'
  },
  {
    category: 'shoes',
    filename: 'shoes.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?shoes,fashion'
  },
  {
    category: 'accessories',
    filename: 'accessories.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?accessories,fashion'
  }
];

// Fashion looks (outfit combinations)
const fashionLooks = [
  {
    category: 'casual',
    filename: 'casual-look1.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?casual,outfit'
  },
  {
    category: 'casual',
    filename: 'casual-look2.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?casual,style'
  },
  {
    category: 'formal',
    filename: 'formal-look1.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?formal,outfit'
  },
  {
    category: 'formal',
    filename: 'formal-look2.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?formal,style'
  },
  {
    category: 'streetwear',
    filename: 'street-look1.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?streetwear,outfit'
  },
  {
    category: 'streetwear',
    filename: 'street-look2.jpg',
    url: 'https://source.unsplash.com/random/800x1000/?streetwear,style'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      // Handle redirects (Unsplash API redirects to the actual image)
      if (response.statusCode === 302 || response.statusCode === 301) {
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, (redirectResponse) => {
          redirectResponse.pipe(file);
          
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
      } else {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve(filename);
        });
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  const allImages = [...fashionItems, ...fashionLooks];
  
  for (const image of allImages) {
    try {
      await downloadImage(image.url, image.filename);
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to download ${image.filename}`);
    }
  }
  
  console.log('All fashion images downloaded successfully!');
}

downloadAllImages();
