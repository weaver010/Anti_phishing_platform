import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import MyProgress from './MyProgress';
import useAuthStore from '../stores/authStore';
import { 
  BookOpen, 
  GraduationCap, 
  Newspaper, 
  Video, 
  BarChart3, 
  Shield, 
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import AwarenessSection from '../components/training/AwarenessSection';
import ArticlesSection from '../components/training/ArticlesSection';
import VideosSection from '../components/training/VideosSection';
import UpdatesSection from '../components/training/UpdatesSection';

// 🔧 Function to get ID from YouTube URL
const getYouTubeID = (url) => {
  // Handles both youtube.com and youtu.be links
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const securityAwarenessBlogs = [
  {
    id: 1,
    title: 'Understanding AiTM and MitM Attacks',
    date: 'June 4, 2025',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/understanding-aitm-and-mitm-attacks',
  },
  {
    id: 2,
    title: 'What are the unwritten rules of security in your organisation?',
    date: 'April 3, 2025',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/what-are-the-unwritten-rules-of-security-in-your-organisation',
  },
  {
    id: 3,
    title: 'Scammers are on the hunt this Easter holidays',
    date: 'March 12, 2025',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/scammers-are-on-the-hunt-this-easter-holidays',
  },
  {
    id: 4,
    title: "Data Privacy: Safeguarding Your Organisation's Most Valuable Asset",
    date: 'January 23, 2025',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/data-privacy-safeguarding-your-organisations-most-valuable-asset',
  },
  {
    id: 5,
    title: 'Safer Internet Day – Keep Everyone Safe Online',
    date: 'January 4, 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/safer-internet-day-2022-keep-everyone-safe-online',
  },
  {
    id: 6,
    title: 'How to avoid LinkedIn scams',
    date: 'November 20, 2024',
    image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/how-to-avoid-linkedin-scams',
  },
];

const phishingAwarenessBlogs = [
  {
    id: 7,
    title: 'Top phishing scams to look out for',
    date: 'July 17, 2024',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/top-phishing-scams-to-look-out-for',
  },
  {
    id: 8,
    title: 'How your digital footprint feeds scammers',
    date: 'June 27, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/how-your-digital-footprint-feeds-scammers',
  },
  {
    id: 9,
    title: 'Modern communication creates modern phishing problems',
    date: 'June 6, 2024',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/modern-communication-creates-modern-phishing-problems',
  },
  {
    id: 10,
    title: 'Understanding the emerging cyber threats: Vishing and Generative AI',
    date: 'March 13, 2024',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/understanding-the-emerging-cyber-threats-vishing-and-generative-ai',
  },
  {
    id: 11,
    title: 'Scammers are on the hunt: Diversify your cyber security plan',
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/scammers-are-on-the-hunt-diversify-your-cyber-security-plan',
  },
  {
    id: 12,
    title: 'Understanding clickbait tactics',
    date: 'December 10, 2023',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    link: 'https://www.phriendlyphishing.com/blog/understanding-clickbait-tactics',
  },
];

// Helper to get initial completion state from localStorage or default
function getInitialCompleted(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultValue;
}

const SECURITY_TIPS = [
  "Always verify the sender's email address before clicking any links.",
  'Use strong, unique passwords for every account.',
  'Enable two-factor authentication wherever possible.',
  'Never share your passwords with anyone.',
  'Keep your software and antivirus up to date.',
  'Be cautious of urgent or threatening messages.',
  'Hover over links to preview the URL before clicking.',
  'Report suspicious emails to your IT/security team.',
  'Do not download attachments from unknown sources.',
  'Regularly back up your important data.'
];

const EXTERNAL_RESOURCES = [
  { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/' },
  { name: 'UK NCSC Cyber Aware', url: 'https://www.ncsc.gov.uk/cyberaware/home' }
];

const TrainingContent = () => {
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('awareness');
  const [contents, setContents] = useState([]);
  const [completedAwareness, setCompletedAwareness] = useState(() => getInitialCompleted('completedAwareness', false));
  const [completedArticles, setCompletedArticles] = useState(() => getInitialCompleted('completedArticles', []));
  const [completedVideos, setCompletedVideos] = useState(() => getInitialCompleted('completedVideos', []));
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState(null);
  const [tip, setTip] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  // Authentication check - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.visit('/login');
    }
  }, [isAuthenticated]);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/training-contents')
      .then(response => setContents(response.data))
      .catch(error => console.error('Error fetching training content:', error));
  }, []);

  // Persist completion state to localStorage
  useEffect(() => { localStorage.setItem('completedAwareness', JSON.stringify(completedAwareness)); }, [completedAwareness]);
  useEffect(() => { localStorage.setItem('completedArticles', JSON.stringify(completedArticles)); }, [completedArticles]);
  useEffect(() => { localStorage.setItem('completedVideos', JSON.stringify(completedVideos)); }, [completedVideos]);

  // Filter completed items to only those that exist in the current content
  const validCompletedArticles = completedArticles.filter(id =>
    [...securityAwarenessBlogs, ...phishingAwarenessBlogs].some(a => a.id === id)
  );
  const validCompletedVideos = completedVideos.filter(id =>
    contents.filter(c => c.type === 'video').some(v => v.id === id)
  );

  // Dynamic totals
  const totalArticles = securityAwarenessBlogs.length + phishingAwarenessBlogs.length;

  // Dynamic progress
  const progress = {
    awareness: completedAwareness ? 1 : 0,
    articles: validCompletedArticles.length,
    videos: validCompletedVideos.length,
    updates: 0
  };

  const totals = {
    awareness: 1,
    articles: totalArticles,
    videos: contents.filter(c => c.type === 'video').length,
    updates: 2
  };

  useEffect(() => {
    window.setActiveTab = setActiveTab;
    return () => { delete window.setActiveTab; };
  }, [setActiveTab]);

  useEffect(() => {
    if (activeTab === 'updates') {
      setNewsLoading(true);
      setNewsError(null);
      
      // Using the API endpoint for news
      axios.get('/api/news')
        .then(res => {
          if (res.data.articles && res.data.articles.length > 0) {
            // The articles are already formatted correctly from the API
            setNews(res.data.articles);
            // Set a random security tip
            setTip(SECURITY_TIPS[Math.floor(Math.random() * SECURITY_TIPS.length)]);
          } else {
            setNewsError('No recent security news available.');
          }
          setNewsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching news:', err);
          setNewsError(err.response?.data?.error || 'Failed to fetch news. Please try again later.');
          setNewsLoading(false);
        });
    }
  }, [activeTab]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackStatus(null);
    try {
      await axios.post('/api/feedback', { message: feedback });
      setFeedback('');
      setFeedbackStatus('Thank you for your feedback!');
    } catch (err) {
      setFeedbackStatus('Failed to send feedback. Please try again.');
    }
  };

  // Handler functions
  const handleCompleteAwareness = () => {
    setCompletedAwareness(true);
  };
  const handleCompleteArticle = (articleId) => {
    setCompletedArticles(prev => prev.includes(articleId) ? prev : [...prev, articleId]);
  };
  const handleCompleteVideo = (videoId) => {
    setCompletedVideos(prev => prev.includes(videoId) ? prev : [...prev, videoId]);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#233554] flex items-start justify-center py-12 px-2">
        <div className="w-full bg-[#1a2332] border border-blue-900 rounded-2xl shadow-2xl p-4 md:p-8 lg:p-12 mx-2 mt-8 mb-8">
          {/* Navigation Tabs */}
          <div className="sticky top-[64px] z-40 bg-[#1a2332] py-4 border-b border-blue-900">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: 'awareness', label: 'Awareness', icon: BookOpen, description: 'Master the fundamentals of phishing defense through expert-led security protocols and best practices' },       
                  { id: 'articles', label: 'Articles', icon: Newspaper, description: 'In-depth analysis of emerging cyber threats and advanced defense methodologies' },
                  { id: 'videos', label: 'Videos', icon: Video, description: 'Expert-led demonstrations and real-world scenarios showcasing effective threat mitigation strategies' },
                  { id: 'progress', label: 'Progress', icon: BarChart3, description: 'Comprehensive analytics dashboard for monitoring your cybersecurity training advancement' },
                  { id: 'updates', label: 'Updates', icon: Shield, description: 'Real-time security intelligence and critical threat advisories' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-bold tracking-wide text-base md:text-lg ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
                        : 'bg-[#22304a] text-blue-100 hover:bg-blue-800/50 shadow backdrop-blur-sm'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-extrabold">{tab.label}</span>
                  </button>
                ))}
              </div>
              {/* Tab Description */}
              <div className="text-center mt-2">
                <p className="text-blue-200 text-lg md:text-xl font-semibold tracking-wide leading-relaxed">
                  {[
                    { id: 'awareness', description: 'Master the fundamentals of phishing defense through expert-led security protocols and best practices' },
                    { id: 'articles', description: 'In-depth analysis of emerging cyber threats and advanced defense methodologies' },
                    { id: 'videos', description: 'Expert-led demonstrations and real-world scenarios showcasing effective threat mitigation strategies' },
                    { id: 'progress', description: 'Comprehensive analytics dashboard for monitoring your cybersecurity training advancement' },
                    { id: 'updates', description: 'Real-time security intelligence and critical threat advisories' }
                  ].find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full mt-8">
            {activeTab === 'awareness' && (
              <AwarenessSection
                completedAwareness={completedAwareness}
                handleCompleteAwareness={handleCompleteAwareness}
              />
            )}

            {activeTab === 'articles' && (
              <ArticlesSection
                securityAwarenessBlogs={securityAwarenessBlogs}
                phishingAwarenessBlogs={phishingAwarenessBlogs}
                validCompletedArticles={validCompletedArticles}
                handleCompleteArticle={handleCompleteArticle}
              />
            )}

            {activeTab === 'videos' && (
              <VideosSection
                contents={contents}
                validCompletedVideos={validCompletedVideos}
                handleCompleteVideo={handleCompleteVideo}
              />
            )}

            {activeTab === 'progress' && (
              <div className="bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 w-full mb-8">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-blue-100 flex items-center gap-3 tracking-tight">
                  <BarChart3 className="w-12 h-12" />
                  Cybersecurity Training Analytics
                </h1>
                <div className="text-blue-100">
                  <MyProgress progress={progress} totals={totals} setActiveTab={setActiveTab} />
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    className="px-8 py-4 bg-red-500 text-white rounded-2xl shadow-lg hover:bg-red-600 transition-all duration-300 font-bold text-lg flex items-center gap-2 transform hover:scale-105 tracking-wide"
                    onClick={() => {
                      localStorage.removeItem('completedAwareness');
                      localStorage.removeItem('completedArticles');
                      localStorage.removeItem('completedVideos');
                      window.location.reload();
                    }}
                  >
                    Reset Progress
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'updates' && (
              <UpdatesSection
                tip={tip}
                news={news}
                newsLoading={newsLoading}
                newsError={newsError}
                feedback={feedback}
                setFeedback={setFeedback}
                handleFeedbackSubmit={handleFeedbackSubmit}
                feedbackStatus={feedbackStatus}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainingContent;
