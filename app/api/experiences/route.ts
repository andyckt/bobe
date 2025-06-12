import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Define the Experience type for the API response
interface Experience {
  _id: string;
  username: string;
  userAvatar: string;
  image: string;
  title: string;
  description: string;
  merchant: string;
  likes: number;
  aspectRatio: "3:4" | "16:9";
  createdAt: Date;
  hashtags?: string[];
  isGetdrunk?: boolean;
}

// Define the Post type
interface Post {
  _id: ObjectId;
  title: string;
  userId: ObjectId;
  username: string;
  createdAt: Date;
  likes: number;
  hashtags: string[];
  taggedAccounts: Array<{
    username: string;
    accountType: string;
  }>;
  media: Array<{
    mediaId: ObjectId;
    position: number;
    isPrimary: boolean;
  }>;
}

// Define the User type
interface User {
  _id: ObjectId;
  username: string;
  displayName: string;
  profileImage: string | {
    micro: string;
    media: string;
    original: string;
  };
}

// Define the Media type
interface Media {
  _id: ObjectId;
  url?: string;
  width?: number;
  height?: number;
  variants?: {
    medium?: {
      url: string;
      width: number;
      height: number;
      cloudinaryId: string;
    };
    thumbnail?: {
      url: string;
      width: number;
      height: number;
      cloudinaryId: string;
    };
    large?: {
      url: string;
      width: number;
      height: number;
      cloudinaryId: string;
    };
  };
  urls?: {
    medium?: string;
  };
  cloudinaryUrl?: string;
  cloudinaryId?: string;
  [key: string]: any; // Add index signature to allow string indexing
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get posts with the getdrunk hashtag
    const posts = await db
      .collection('posts')
      .find({ 
        hashtags: "getdrunk" 
      })
      .project({
        _id: 1,
        title: 1,
        userId: 1,
        username: 1,
        createdAt: 1,
        likes: 1,
        hashtags: 1,
        taggedAccounts: 1,
        media: 1
        // description is intentionally excluded
      })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(20) // Limit to 20 posts
      .toArray() as Post[];

    if (!posts || posts.length === 0) {
      console.log('No getdrunk posts found in database');
      return NextResponse.json({ 
        success: true, 
        data: [] 
      });
    }

    // Collect all unique userIds to fetch user info
    const userIds = [...new Set(posts.map(post => post.userId))].filter(Boolean);
    
    // Fetch user information for all posts
    const users = await db
      .collection('users')
      .find({ 
        _id: { $in: userIds } 
      })
      .toArray() as User[];

    // Create a lookup map for users
    const userMap: Record<string, User> = {};
    users.forEach(user => {
      userMap[user._id.toString()] = user;
    });

    // Collect all media IDs to fetch image info
    const mediaIds: ObjectId[] = [];
    posts.forEach(post => {
      if (post.media && post.media.length > 0) {
        // Get the primary media or first one
        const primaryMedia = post.media.find(m => m.isPrimary) || post.media[0];
        if (primaryMedia) {
          mediaIds.push(primaryMedia.mediaId);
        }
      }
    });

    // Fetch media information
    const mediaItems = await db
      .collection('media')
      .find({ 
        _id: { $in: mediaIds } 
      })
      .toArray() as Media[];

    // Create a lookup map for media
    const mediaMap: Record<string, Media> = {};
    mediaItems.forEach(media => {
      mediaMap[media._id.toString()] = media;
    });

    // Transform data for frontend
    const transformedExperiences = posts.map((post) => {
      // Get user info or fallback
      const userInfo = post.userId ? userMap[post.userId.toString()] : null;
      const username = userInfo ? userInfo.username : post.username;
      const displayName = userInfo ? userInfo.displayName : post.username;
      
      // Handle profile image which can be either a string or an object with URLs
      let userAvatar = "";
      if (userInfo && userInfo.profileImage) {
        if (typeof userInfo.profileImage === 'string') {
          userAvatar = userInfo.profileImage;
        } else if (typeof userInfo.profileImage === 'object') {
          // Prefer the media size (300x300) for avatars
          userAvatar = userInfo.profileImage.media || 
                       userInfo.profileImage.original || 
                       userInfo.profileImage.micro || 
                       "";
        }
      }
      
      // If no avatar found, use a placeholder
      if (!userAvatar) {
        userAvatar = `https://i.pravatar.cc/150?u=${post.username}`;
      }
      
      // Get primary media or first one
      let mediaInfo = null;
      let imageUrl = "";
      let aspectRatio = "3:4"; // Default
      
      if (post.media && post.media.length > 0) {
        const primaryMedia = post.media.find(m => m.isPrimary) || post.media[0];
        if (primaryMedia) {
          mediaInfo = mediaMap[primaryMedia.mediaId.toString()];
          
          if (mediaInfo) {
            // Use the medium variant URL from the variants object
            if (mediaInfo.variants && mediaInfo.variants.medium && mediaInfo.variants.medium.url) {
              imageUrl = mediaInfo.variants.medium.url;
            } 
            // Fallback to large variant
            else if (mediaInfo.variants && mediaInfo.variants.large && mediaInfo.variants.large.url) {
              imageUrl = mediaInfo.variants.large.url;
            }
            // Fallback to thumbnail
            else if (mediaInfo.variants && mediaInfo.variants.thumbnail && mediaInfo.variants.thumbnail.url) {
              imageUrl = mediaInfo.variants.thumbnail.url;
            }
            // Fallback to any URL field
            else if (mediaInfo.url) {
              imageUrl = mediaInfo.url;
            }
            
            // Determine aspect ratio
            if (mediaInfo.width && mediaInfo.height) {
              aspectRatio = mediaInfo.width > mediaInfo.height ? "16:9" : "3:4";
            } else if (mediaInfo.variants && mediaInfo.variants.medium) {
              const variant = mediaInfo.variants.medium;
              if (variant.width && variant.height) {
                aspectRatio = variant.width > variant.height ? "16:9" : "3:4";
              }
            }
          } else {
            console.log('Media not found for mediaId:', primaryMedia.mediaId.toString());
          }
        }
      }
      
      // Get merchant info
      let merchant = "";
      if (post.taggedAccounts && post.taggedAccounts.length > 0) {
        // Try to find accounts with various types that could represent merchants
        const merchantAccount = post.taggedAccounts.find(acc => 
          ['restaurant', 'hotel', 'venue', 'bar', 'club', 'business'].includes(acc.accountType?.toLowerCase?.() || '')
        );
        
        // If we found a merchant account, use its username
        if (merchantAccount) {
          merchant = merchantAccount.username;
        } else {
          // If no specific merchant account found, use the first tagged account as fallback
          merchant = post.taggedAccounts[0].username;
        }
      } else {
        // Fallback: try to extract merchant from title or other fields
        const titleWords = post.title.split(' ');
        if (titleWords.length > 0 && titleWords[0].length > 3) {
          // Use first word of title as last resort if it's long enough
          merchant = titleWords[0];
        }
      }

      return {
        _id: post._id.toString(),
        username: displayName, // Use display name instead of username
        userAvatar: userAvatar,
        image: imageUrl,
        title: post.title,
        merchant: merchant,
        likes: post.likes || 0,
        aspectRatio: aspectRatio,
        hashtags: post.hashtags
      };
    }).filter(exp => exp.image); // Only include posts with images

    return NextResponse.json({ 
      success: true, 
      data: transformedExperiences 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
} 