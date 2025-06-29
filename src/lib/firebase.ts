import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, orderBy, query, limit } from 'firebase/firestore';
import { BlogPost } from '../types/blog';

// TODO: Replace with your actual Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDXWracBvtY_BpBSeApaHy9pjN0fZWFqTc",
  authDomain: "blogflow-89614.firebaseapp.com",
  projectId: "blogflow-89614",
  storageBucket: "blogflow-89614.firebasestorage.app",
  messagingSenderId: "422251480167",
  appId: "1:422251480167:web:c927ab93e96791f64fc0c2",
  measurementId: "G-WCB66PW4TB"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection reference
const BLOGS_COLLECTION = 'blogs';

export const getBlogPosts = async (limitCount: number = 10): Promise<BlogPost[]> => {
  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    } as BlogPost));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return mock data for development
    return getMockBlogPosts();
  }
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Return mock data for development
    const mockPosts = getMockBlogPosts();
    return mockPosts.find(post => post.id === id) || null;
  }
};

// Mock data for development and demonstration
const getMockBlogPosts = (): BlogPost[] => [
  {
    id: '1',
    title: 'The Future of AI in Business Intelligence',
    content: `
      <div class="prose max-w-none">
        <p>Artificial Intelligence is transforming how businesses analyze data and make strategic decisions. In this comprehensive guide, we explore the cutting-edge applications of AI in business intelligence.</p>
        
        <h2>Key Developments in 2024</h2>
        <p>The landscape of AI-powered business intelligence has evolved dramatically this year. Organizations are leveraging machine learning algorithms to uncover patterns in their data that were previously invisible to human analysts.</p>
        
        <h3>Predictive Analytics Revolution</h3>
        <p>Modern AI systems can now predict market trends with unprecedented accuracy. By analyzing historical data, customer behavior patterns, and external market factors, these systems provide actionable insights that drive business growth.</p>
        
        <h3>Real-time Decision Making</h3>
        <p>The integration of AI with real-time data streams enables businesses to make informed decisions instantaneously. This capability is particularly valuable in fast-paced industries where timing is crucial.</p>
        
        <h2>Implementation Strategies</h2>
        <p>Successfully implementing AI in business intelligence requires a strategic approach. Organizations must consider data quality, infrastructure requirements, and team training to maximize the benefits of AI-powered analytics.</p>
        
        <p>The future promises even more sophisticated AI capabilities, including natural language processing for query interfaces and automated insight generation that can democratize data analysis across organizations.</p>
      </div>
    `,
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    createdAt: new Date('2024-01-15'),
    author: 'AI Agent',
    excerpt: 'Discover how artificial intelligence is revolutionizing business intelligence and data analytics in 2024.'
  },
  {
    id: '2',
    title: 'Sustainable Technology Trends Shaping Tomorrow',
    content: `
      <div class="prose max-w-none">
        <p>As environmental consciousness grows, technology companies are pioneering sustainable solutions that balance innovation with ecological responsibility.</p>
        
        <h2>Green Computing Revolution</h2>
        <p>The tech industry is embracing energy-efficient computing solutions, from low-power processors to renewable energy-powered data centers. These innovations are reducing the carbon footprint of digital operations worldwide.</p>
        
        <h3>Circular Economy in Tech</h3>
        <p>Technology companies are adopting circular economy principles, designing products for longevity, repairability, and recyclability. This shift represents a fundamental change in how we approach technology lifecycle management.</p>
        
        <h2>Impact on Business Operations</h2>
        <p>Organizations that embrace sustainable technology practices are not only reducing their environmental impact but also discovering cost savings and improved brand reputation. The business case for green technology has never been stronger.</p>
        
        <p>Looking ahead, sustainable technology will become the standard rather than the exception, driving innovation in areas such as renewable energy integration, waste reduction, and resource optimization.</p>
      </div>
    `,
    imageUrl: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=1200',
    createdAt: new Date('2024-01-14'),
    author: 'AI Agent',
    excerpt: 'Explore the latest sustainable technology trends that are creating a more environmentally responsible future.'
  },
  {
    id: '3',
    title: 'Cybersecurity in the Age of Remote Work',
    content: `
      <div class="prose max-w-none">
        <p>The shift to remote work has fundamentally changed the cybersecurity landscape. Organizations must adapt their security strategies to protect distributed workforces and cloud-based operations.</p>
        
        <h2>New Threat Vectors</h2>
        <p>Remote work has introduced new vulnerabilities that cybercriminals are eager to exploit. Home networks, personal devices, and unsecured connections create attack surfaces that traditional office-based security models weren't designed to address.</p>
        
        <h3>Zero Trust Architecture</h3>
        <p>The zero trust security model has emerged as a critical framework for remote work security. By assuming no implicit trust and continuously validating every transaction, organizations can maintain security regardless of user location.</p>
        
        <h2>Employee Training and Awareness</h2>
        <p>Human factors remain the weakest link in cybersecurity. Comprehensive training programs that educate employees about phishing, social engineering, and safe computing practices are essential for maintaining security in distributed work environments.</p>
        
        <p>As remote work becomes permanent for many organizations, investing in robust cybersecurity infrastructure and practices is not just advisable—it's essential for business continuity and data protection.</p>
      </div>
    `,
    imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1200',
    createdAt: new Date('2024-01-13'),
    author: 'AI Agent',
    excerpt: 'Learn how organizations are adapting their cybersecurity strategies for the remote work era.'
  }
];