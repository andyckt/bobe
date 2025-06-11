import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

if (!DB_NAME) {
  console.error('Please define the MONGODB_DB environment variable');
  process.exit(1);
}

async function examineMedia() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(DB_NAME);
    
    // Get a sample post with media
    const post = await db.collection('posts')
      .findOne({ 
        hashtags: "getdrunk",
        media: { $exists: true, $ne: [] }
      });
    
    if (!post) {
      console.log('No post with media found');
      return;
    }
    
    console.log('Found post:', post.title);
    console.log('Media array:', post.media);
    
    // Get the primary media or first one
    const primaryMedia = post.media.find(m => m.isPrimary) || post.media[0];
    if (!primaryMedia) {
      console.log('No media found in post');
      return;
    }
    
    console.log('Primary media:', primaryMedia);
    
    // Get the media document
    const media = await db.collection('media')
      .findOne({ _id: primaryMedia.mediaId });
    
    if (!media) {
      console.log('Media document not found for ID:', primaryMedia.mediaId);
      return;
    }
    
    console.log('\nMedia document found:');
    console.log(JSON.stringify(media, null, 2));
    
    // Try to extract image URL from different fields
    console.log('\nPossible image URL fields:');
    
    const urlFields = [
      'url',
      'cloudinaryUrl',
      'originalUrl',
      'variants.medium',
      'variants.original',
      'variants.thumbnail',
      'urls.medium',
      'urls.original',
      'urls.thumbnail'
    ];
    
    for (const field of urlFields) {
      const parts = field.split('.');
      let value = media;
      
      for (const part of parts) {
        value = value?.[part];
      }
      
      if (value && typeof value === 'string') {
        console.log(`- ${field}: ${value}`);
      }
    }
    
    // Check for any URL-like fields
    console.log('\nSearching for URL-like fields:');
    const findUrlFields = (obj, prefix = '') => {
      for (const key in obj) {
        const value = obj[key];
        const fullPath = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'string' && 
            (value.startsWith('http://') || value.startsWith('https://'))) {
          console.log(`- ${fullPath}: ${value}`);
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          findUrlFields(value, fullPath);
        }
      }
    };
    
    findUrlFields(media);
    
    // Check if there's a path pattern
    if (media.publicId || media.cloudinaryId) {
      console.log('\nPossible Cloudinary pattern:');
      const id = media.publicId || media.cloudinaryId;
      console.log(`- cloudinaryId: ${id}`);
      
      const possibleUrls = [
        `https://res.cloudinary.com/dzmaishhi/image/upload/${id}`,
        `https://res.cloudinary.com/dzmaishhi/image/upload/c_limit,w_800/${id}`,
        `https://res.cloudinary.com/dzmaishhi/image/upload/c_limit,f_auto,fl_progressive,q_80,w_800/v1/${id}`
      ];
      
      console.log('- Possible URLs:');
      possibleUrls.forEach(url => console.log(`  ${url}`));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

examineMedia(); 