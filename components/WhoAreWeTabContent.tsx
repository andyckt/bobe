import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ChevronRight, GraduationCap, Globe, Clock, Users, MessageCircle } from "lucide-react"

// Sample data for team members
const teamMembers = [
  {
    id: "andy",
    name: "Andy",
    role: "Founder & Nightlife Explorer",
    bio: "Started Bobe.co after exploring Shanghai's vibrant nightlife scene for 3 years. Passionate about connecting people and creating memorable experiences.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: "mei",
    name: "Mei",
    role: "Local Guide & Content Creator",
    bio: "Shanghai native with insider knowledge of the city's best hidden gems. Helps international students discover authentic nightlife experiences beyond the tourist spots.",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80",
  },
  {
    id: "david",
    name: "David",
    role: "Community Manager",
    bio: "Former exchange student at Fudan University who fell in love with Shanghai. Now builds bridges between local venues and international student communities.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: "sophia",
    name: "Sophia",
    role: "Experience Curator",
    bio: "NYU Shanghai graduate with a passion for cultural exchange. Designs unique nightlife experiences that bring together students from different backgrounds.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

// Sample data for contributing students
const contributingStudents = [
  {
    university: "NYU Shanghai",
    studentCount: 24,
    color: "from-violet-500 to-purple-500",
  },
  {
    university: "Fudan University",
    studentCount: 18,
    color: "from-blue-500 to-indigo-500",
  },
  {
    university: "Shanghai Jiao Tong",
    studentCount: 15,
    color: "from-emerald-500 to-teal-500",
  },
  {
    university: "Tongji University",
    studentCount: 12,
    color: "from-amber-500 to-orange-500",
  },
  {
    university: "East China Normal",
    studentCount: 9,
    color: "from-rose-500 to-pink-500",
  },
  {
    university: "Other Universities",
    studentCount: 27,
    color: "from-gray-500 to-slate-500",
  },
];

function UniversityCard({ university, studentCount, color }: { university: string, studentCount: number, color: string }) {
  return (
    <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg hover:translate-y-[-4px] transition-transform">
      <div className={`p-4 bg-gradient-to-r ${color} text-white`}>
        <div className="flex justify-between items-start">
          <GraduationCap className="h-8 w-8" />
          <span className="text-xl font-bold">{studentCount}</span>
        </div>
        <h3 className="text-lg font-bold mt-3">{university}</h3>
      </div>
      <div className="p-3 bg-white dark:bg-zinc-900 flex justify-between items-center">
        <span className="text-sm">Student Contributors</span>
      </div>
    </Card>
  )
}

export default function WhoAreWeTabContent() {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-center">WHO WE ARE</h2>
      
      {/* Mission statement */}
      <div className="mb-12">
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
            alt="Shanghai nightscape" 
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white max-w-3xl">
            <h2 className="text-3xl font-black mb-3">Discover Shanghai's Nightlife Through Local & International Eyes</h2>
            <p className="text-lg">Bobe.co connects international university students with authentic nightlife experiences in Shanghai. We believe the best way to explore a city's culture is through its nightlife, guided by those who know it best.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg p-6">
            <Globe className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-bold mb-2">International Perspective</h3>
            <p className="text-gray-700 dark:text-gray-300">Our community of international students brings diverse perspectives to Shanghai's nightlife scene, helping you discover places that resonate with your preferences.</p>
          </Card>
          
          <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg p-6">
            <Users className="h-12 w-12 mb-4 text-purple-500" />
            <h3 className="text-xl font-bold mb-2">Community-Driven</h3>
            <p className="text-gray-700 dark:text-gray-300">Every review, recommendation, and experience on Bobe.co comes from real students who've explored Shanghai's bars and clubs firsthand.</p>
          </Card>
          
          <Card className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg p-6">
            <MessageCircle className="h-12 w-12 mb-4 text-pink-500" />
            <h3 className="text-xl font-bold mb-2">Authentic Stories</h3>
            <p className="text-gray-700 dark:text-gray-300">Beyond reviews, we share authentic stories and experiences to help you connect with Shanghai's nightlife culture on a deeper level.</p>
          </Card>
        </div>
        
        <div className="bg-white/50 dark:bg-zinc-900/50 border-4 border-black dark:dark-rounded-gradient-border rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-black mb-4">Our Story</h3>
          <p className="text-lg mb-4">
            Bobe.co started with a simple question: Why is it so hard for international students to discover authentic nightlife in Shanghai? 
          </p>
          <p className="text-lg mb-4">
            As students ourselves, we found that the most memorable nights happened when local friends took us to hidden gems that never appeared in tourist guides. We created this platform to recreate that experience at scale.
          </p>
          <p className="text-lg">
            Today, we've connected thousands of international students with authentic Shanghai nightlife experiences, creating a community where shared experiences bridge cultural divides.
          </p>
        </div>
      </div>
      
      {/* Team section */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-black mb-6">OUR TEAM</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-4 border-black dark:dark-rounded-gradient-border rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-lg hover:translate-y-[-4px] transition-transform">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white dark:bg-zinc-900">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Contributing students section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black mb-6">OUR CONTRIBUTORS</h2>
        <div className="mb-4">
          <p className="text-lg mb-4">
            Our content is created by international students from universities across Shanghai. Here's where our contributors come from:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {contributingStudents.map((university) => (
            <UniversityCard 
              key={university.university}
              university={university.university} 
              studentCount={university.studentCount}
              color={university.color}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-4">Want to share your own Shanghai nightlife experiences?</h3>
          <Button className="bg-black hover:bg-black/80 text-white dark:bg-gradient-to-r dark:from-gradient-pink dark:to-gradient-purple dark:text-black dark:hover:brightness-110 rounded-xl border-2 border-black dark:dark-rounded-gradient-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none dark:dark-gradient-shadow-sm px-6 py-6 text-lg">
            Become a Contributor
          </Button>
        </div>
      </div>
    </div>
  )
} 