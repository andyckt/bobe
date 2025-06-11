import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// Define the Experience type
interface Experience {
  _id: string;
  username: string;
  userAvatar: string;
  image: string;
  title: string;
  description: string;
  venue: string;
  likes: number;
  aspectRatio: "3:4" | "16:9";
  createdAt: Date;
  hashtags?: string[];
  isGetdrunk?: boolean;
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get only experiences with the getdrunk hashtag
    const experiences = await db
      .collection('experiences')
      .find({ 
        $or: [
          { hashtags: "getdrunk" },
          { isGetdrunk: true }
        ]
      })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(20) // Limit to 20 experiences
      .toArray();

    if (!experiences || experiences.length === 0) {
      console.log('No getdrunk experiences found in database');
      return NextResponse.json({ 
        success: true, 
        data: [] 
      });
    }

    // Transform data for frontend if needed
    const transformedExperiences = experiences.map((exp: any) => ({
      _id: exp._id.toString(),
      username: exp.username,
      userAvatar: exp.userAvatar,
      image: exp.image,
      title: exp.title,
      venue: exp.venue,
      likes: exp.likes,
      aspectRatio: exp.aspectRatio,
      hashtags: exp.hashtags
    }));

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