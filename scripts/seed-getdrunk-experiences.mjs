import { MongoClient } from 'mongodb';
import 'dotenv/config';

// Get MongoDB connection details from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('MongoDB credentials not found in environment variables. Please check your .env file.');
  process.exit(1);
}

// Function to determine aspect ratio based on dimensions
function getAspectRatio(width, height) {
  // If close to 16:9 ratio
  if (Math.abs((width / height) - (16 / 9)) < 0.1) {
    return "16:9";
  }
  // If close to 3:4 ratio
  if (Math.abs((width / height) - (3 / 4)) < 0.1) {
    return "3:4";
  }
  // Default to 3:4 if unsure
  return height > width ? "3:4" : "16:9";
}

async function seedGetdrunkExperiences() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    
    // Check if experiences collection already exists
    const collections = await db.listCollections({ name: 'experiences' }).toArray();
    if (collections.length > 0) {
      console.log('Experiences collection already exists. Dropping it before reseeding...');
      await db.collection('experiences').drop();
    }
    
    // Get posts with "getdrunk" hashtag
    const posts = await db.collection('posts')
      .find({ hashtags: "getdrunk" })
      .toArray();
      
    console.log(`Found ${posts.length} posts with hashtag "getdrunk" to transform into experiences`);
    
    if (posts.length === 0) {
      console.log('No posts with hashtag "getdrunk" found.');
      return;
    }
    
    // Get user data to enrich the experiences
    const userIds = [...new Set(posts.map(post => post.userId))];
    const users = await db.collection('users')
      .find({ _id: { $in: userIds.map(id => id.toString()) } })
      .toArray();
    
    const userMap = new Map();
    users.forEach(user => {
      userMap.set(user._id.toString(), user);
    });
    
    // Fetch media details for posts
    const mediaIds = posts.flatMap(post => post.media?.map(m => m.mediaId) || []);
    const media = await db.collection('media')
      .find({ _id: { $in: mediaIds } })
      .toArray();
    
    const mediaMap = new Map();
    media.forEach(item => {
      mediaMap.set(item._id.toString(), item);
    });
    
    // Transform posts to experiences
    const experiences = posts.map(post => {
      // Find primary media or first media
      const primaryMedia = post.media?.find(m => m.isPrimary) || post.media?.[0];
      const mediaItem = primaryMedia ? mediaMap.get(primaryMedia.mediaId.toString()) : null;
      
      // Get user details
      const user = userMap.get(post.userId.toString()) || { username: post.username, profileImage: '' };
      
      // Get image URL from media
      let imageUrl = '';
      let aspectRatio = '3:4'; // default
      
      if (mediaItem) {
        // Get the medium or large variant URL
        imageUrl = mediaItem.variants?.medium?.url || 
                  mediaItem.variants?.large?.url || 
                  mediaItem.variants?.original?.url || '';
        
        // Determine aspect ratio from media dimensions
        if (mediaItem.width && mediaItem.height) {
          aspectRatio = getAspectRatio(mediaItem.width, mediaItem.height);
        } else if (mediaItem.aspectRatio) {
          aspectRatio = mediaItem.aspectRatio;
        }
      }
      
      // Extract venue from tagged accounts
      const venue = post.taggedAccounts?.[0]?.username || 'Unknown Venue';
      
      return {
        username: user.username || post.username,
        userAvatar: user.profileImage || 'https://i.pravatar.cc/150?random=' + Math.floor(Math.random() * 20),
        image: imageUrl,
        title: post.title || 'Nightlife Experience',
        description: post.description || '',
        venue: venue,
        likes: post.likes || Math.floor(Math.random() * 200) + 50,
        aspectRatio: aspectRatio,
        createdAt: post.createdAt || new Date(),
        hashtags: post.hashtags || ["getdrunk"],
        isGetdrunk: true
      };
    }).filter(exp => exp.image); // Only include experiences with images
    
    if (experiences.length === 0) {
      console.log('No valid experiences could be created from the posts.');
      return;
    }
    
    // Insert transformed data into experiences collection
    const result = await db.collection('experiences').insertMany(experiences);
    console.log(`Successfully seeded ${result.insertedCount} getdrunk experiences`);
    
    // Display a sample experience
    const sampleExperience = await db.collection('experiences').findOne({});
    console.log('\nSample experience:');
    console.log(JSON.stringify(sampleExperience, null, 2));
    
  } catch (error) {
    console.error('Error seeding experiences collection:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedGetdrunkExperiences(); 