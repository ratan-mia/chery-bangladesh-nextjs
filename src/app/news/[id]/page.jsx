
import { notFound } from 'next/navigation';
import SingleNewsPage from '../../components/news/SingleNewsPage';

// Sample data array - in a real application, this would come from an API or database
const allNewsItems = [
  {
    id: 1,
    category: 'information',
    image: "/api/placeholder/1200/600",
    date: "March 19, 2025",
    title: "The Fashion Code of Global Success: Decoding the Aesthetic DNA Behind Our Latest Models",
    author: "Design Team",
    content: `
      <p class="mb-6">Aesthetics play a crucial role in the automotive industry, often becoming the first point of connection between a vehicle and its potential owner. Our latest models represent years of research into what makes design resonate across different cultures and markets.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">The Universal Language of Design</h2>
      <p class="mb-6">While preferences vary across regions, our research identified several universal design elements that create emotional connections regardless of cultural background. These elements have been carefully integrated into our latest lineup.</p>
      
      <p class="mb-6">Key insights from our global design study:</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Balanced proportions create a sense of stability that appeals across all markets</li>
        <li>Dynamic lines suggest performance and technological advancement</li>
        <li>Thoughtful detailing signals quality and attention to craftsmanship</li>
        <li>Distinctive lighting signatures establish brand recognition</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Cultural Nuance in Global Design</h2>
      <p class="mb-6">While maintaining a consistent design language, we've incorporated subtle cultural preferences that help our vehicles feel at home in diverse markets. These adaptations never compromise the core design but enhance relevance for local consumers.</p>
      
      <div class="bg-gray-100 p-6 rounded-lg mb-6">
        <blockquote class="text-gray-700 italic">
          "Great design speaks to universal human preferences while acknowledging cultural context. It's not about different designs for different markets—it's about creating a cohesive design with thoughtful variations."
        </blockquote>
        <p class="text-gray-600 mt-3">— Head of Global Design</p>
      </div>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">The Future of Global Design</h2>
      <p class="mb-6">Our ongoing research continues to explore the evolution of global design preferences, allowing us to stay ahead of trends while maintaining timeless appeal. The next generation of vehicles will build on these foundations while pushing boundaries in new directions.</p>
      
      <p>The success of our design approach is ultimately measured in the emotional connection customers feel with our vehicles—a connection that transcends borders and speaks to universal appreciation for thoughtful, purposeful design.</p>
    `,
    tags: ['Design', 'Global Markets', 'Research', 'Innovation'],
    relatedArticles: [
      {
        id: 5,
        title: "Unveiling the Future: Highlights from the International Auto Expo",
        date: "February 22, 2025",
        link: "/news/5"
      },
      {
        id: 7,
        title: "The Future of Mobility: Trends Shaping Next-Generation Transportation",
        date: "February 10, 2025",
        link: "/news/7"
      },
      {
        id: 9,
        title: "Global Expansion: New Markets and Growth Opportunities in 2025",
        date: "January 30, 2025",
        link: "/news/9"
      }
    ]
  },
  {
    id: 2,
    category: 'product',
    image: "/api/placeholder/1200/600",
    date: "March 14, 2025",
    title: "The Secret to Milestones: TIGGO 4's Path to Global Trust via Safety Excellence",
    author: "Safety Engineering Team",
    content: `
      <p class="mb-6">The automotive industry has witnessed numerous innovations over the decades, but safety remains a cornerstone of consumer trust and brand reputation. For the TIGGO 4, safety excellence wasn't just a marketing slogan—it became the foundation of its global success story.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Setting New Standards</h2>
      <p class="mb-6">When the TIGGO 4 first entered development, the engineering team established ambitious safety targets that would exceed regional requirements across global markets. This forward-thinking approach meant designing for the most stringent standards worldwide, not just meeting minimum requirements.</p>
      
      <p class="mb-6">The comprehensive safety strategy encompassed multiple dimensions:</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Advanced structural design with high-strength steel cage</li>
        <li>Next-generation active safety systems with predictive capabilities</li>
        <li>Intelligent driver assistance features that adapt to driving conditions</li>
        <li>Rigorous testing protocols beyond industry standards</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">The Path to Recognition</h2>
      <p class="mb-6">The journey toward global recognition began with independent safety assessments. The TIGGO 4 consistently achieved top ratings in crash tests, electronic stability evaluations, and pedestrian protection measures across different regions.</p>
      
      <p class="mb-6">These achievements translated into tangible market outcomes:</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>27% increase in consideration among safety-conscious consumers</li>
        <li>Significantly higher customer satisfaction scores compared to competitors</li>
        <li>Strong word-of-mouth recommendations based on safety features</li>
      </ul>
      
      <div class="bg-gray-100 p-6 rounded-lg mb-6">
        <blockquote class="text-gray-700 italic">
          "The TIGGO 4 represents our commitment to making advanced safety accessible to customers worldwide. We believe safety excellence should never be compromised."
        </blockquote>
        <p class="text-gray-600 mt-3">— Chief Safety Engineer</p>
      </div>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Looking Forward</h2>
      <p class="mb-6">The success of the TIGGO 4's safety-first approach has influenced future product development strategies. Upcoming models will build upon this foundation with even more advanced safety innovations, integrating emerging technologies while maintaining the brand's commitment to reliability and trust.</p>
      
      <p>As global markets continue to evolve, the principles that guided the TIGGO 4's success remain constant: rigorous standards, customer-focused innovation, and an unwavering commitment to safety excellence.</p>
    `,
    tags: ['Safety', 'TIGGO 4', 'Innovation', 'Global Markets'],
    relatedArticles: [
      {
        id: 8,
        title: "Advanced Safety Features: The Technology Behind Our 5-Star Rating",
        date: "February 05, 2025",
        link: "/news/8"
      },
      {
        id: 5,
        title: "Unveiling the Future: Highlights from the International Auto Expo",
        date: "February 22, 2025",
        link: "/news/5"
      },
      {
        id: 9,
        title: "Global Expansion: New Markets and Growth Opportunities in 2025",
        date: "January 30, 2025",
        link: "/news/9"
      }
    ]
  },
  {
    id: 3,
    category: 'partnerships',
    image: "/api/placeholder/1200/600",
    date: "March 04, 2025",
    title: "Allianz Partners and Chery International sign Strategic Partnership Agreement to Enhance Customer Experience",
    author: "Partnership Team",
    content: `
      <p class="mb-6">In a significant move that promises to elevate the ownership experience for customers worldwide, Chery International and Allianz Partners have entered into a comprehensive strategic partnership. The agreement, signed on February 15, 2025, in Wuhu, Anhui, China, marks a new chapter in automotive customer service and protection.</p>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">A Global Vision for Customer Care</h2>
      <p class="mb-6">The partnership between Chery International and Allianz Partners represents a shared commitment to customer-centric values and global excellence. By combining Chery's innovative vehicle technologies with Allianz's world-class insurance and assistance services, the collaboration aims to create a seamless, comprehensive ownership experience.</p>
      
      <p class="mb-6">Key elements of the partnership include:</p>
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Tailored insurance solutions integrated with vehicle purchase</li>
        <li>24/7 global roadside assistance with premium service levels</li>
        <li>Extended warranty programs with enhanced coverage</li>
        <li>Digital-first customer service platforms with multilingual support</li>
        <li>Specialized protection for next-generation electric and hybrid vehicles</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Implementation Timeline</h2>
      <p class="mb-6">The partnership will roll out in phases, beginning with key European and Asian markets in Q3 2025, followed by expansion to additional regions by early 2026. The phased approach allows for market-specific customization while maintaining consistent global service standards.</p>
      
      <div class="bg-gray-100 p-6 rounded-lg mb-6">
        <blockquote class="text-gray-700 italic">
          "This partnership represents our shared commitment to customer peace of mind. Together, we're creating protection and service solutions that match the quality and innovation of Chery vehicles themselves."
        </blockquote>
        <p class="text-gray-600 mt-3">— Allianz Partners CEO</p>
      </div>
      
      <h2 class="text-2xl font-bold mb-4 text-gray-900">Customer Benefits</h2>
      <p class="mb-6">For Chery customers, the partnership delivers immediate tangible benefits, including simplified claims processes, priority service scheduling, and integrated digital tools for managing all aspects of vehicle ownership and protection. The partnership's customer-first approach aligns perfectly with both companies' long-term strategies for growth and customer satisfaction.</p>
      
      <p>As both companies look to the future, this strategic alliance establishes a foundation for ongoing collaboration in emerging areas such as mobility services, connected vehicle technologies, and sustainable transportation solutions.</p>
    `,
    tags: ['Partnerships', 'Allianz', 'Customer Service', 'Global'],
    relatedArticles: [
      {
        id: 10,
        title: "Strategic Technology Alliance: Enhancing Electric Vehicle Capabilities",
        date: "January 25, 2025",
        link: "/news/10"
      },
      {
        id: 9,
        title: "Global Expansion: New Markets and Growth Opportunities in 2025",
        date: "January 30, 2025",
        link: "/news/9"
      },
      {
        id: 6,
        title: "Innovation Summit 2025: Connecting Global Automotive Leaders",
        date: "February 15, 2025",
        link: "/news/6"
      }
    ]
  }
  // Add more news items as needed
];

// This function will generate metadata for the page
export async function generateMetadata({ params }) {
  const post = allNewsItems.find(item => item.id === parseInt(params.id));
  
  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }
  
  // Extract plain text from HTML content for description
  const plainTextContent = post.content.replace(/<[^>]*>/g, '');
  const description = plainTextContent.substring(0, 160) + '...';
  
  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [post.image],
    },
  };
}

// Generate static paths for all news items
export async function generateStaticParams() {
  return allNewsItems.map(post => ({
    id: post.id.toString()
  }));
}

// The main page component - server component
export default function NewsDetail({ params }) {
  const { id } = params;
  
  // Find the post with the matching ID
  const post = allNewsItems.find(item => item.id === parseInt(id));
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  return <SingleNewsPage post={post} />;
}