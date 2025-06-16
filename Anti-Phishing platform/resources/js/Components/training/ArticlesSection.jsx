import React from 'react';
import { Newspaper, Shield, ChevronRight, CheckCircle2 } from 'lucide-react';

const ArticlesSection = ({ 
  securityAwarenessBlogs, 
  phishingAwarenessBlogs, 
  validCompletedArticles, 
  handleCompleteArticle 
}) => {
  return (
    <div className="bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 w-full mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-blue-100 flex items-center gap-3">
        <Newspaper className="w-10 h-10" />
        Articles
      </h1>
      <div className="space-y-16">
        {/* Security Awareness Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-200 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Security Awareness
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {securityAwarenessBlogs.map(blog => (
              <div key={blog.id} className="bg-[#1a2332] border border-blue-900 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-blue-300 mb-2">
                    <span className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded">Security Awareness</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-blue-200">{blog.title}</h3>
                  <div className="mt-auto space-y-3">
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-200 font-medium flex items-center gap-1 group"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </a>
                    <button
                      className={`w-full px-4 py-2 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                        validCompletedArticles.includes(blog.id) 
                          ? 'bg-green-600 text-white' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      onClick={() => handleCompleteArticle(blog.id)}
                      disabled={validCompletedArticles.includes(blog.id)}
                    >
                      {validCompletedArticles.includes(blog.id) ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Mark as Completed
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phishing Awareness Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-200 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Phishing Awareness
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {phishingAwarenessBlogs.map(blog => (
              <div key={blog.id} className="bg-[#1a2332] border border-blue-900 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-blue-300 mb-2">
                    <span className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded">Phishing Awareness</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-blue-200">{blog.title}</h3>
                  <div className="mt-auto space-y-3">
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-200 font-medium flex items-center gap-1 group"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </a>
                    <button
                      className={`w-full px-4 py-2 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                        validCompletedArticles.includes(blog.id) 
                          ? 'bg-green-600 text-white' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      onClick={() => handleCompleteArticle(blog.id)}
                      disabled={validCompletedArticles.includes(blog.id)}
                    >
                      {validCompletedArticles.includes(blog.id) ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Completed
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Mark as Completed
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection; 