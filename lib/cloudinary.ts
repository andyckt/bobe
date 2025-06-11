import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getOptimizedImageUrl = (publicId: string, width = 800) => {
  return cloudinary.url(publicId, {
    width,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto',
  });
};

export default cloudinary; 