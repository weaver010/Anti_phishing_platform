import React from 'react';
import { Shield, Newspaper } from 'lucide-react';

const EXTERNAL_RESOURCES = [
  { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/' },
  { name: 'UK NCSC Cyber Aware', url: 'https://www.ncsc.gov.uk/cyberaware/home' }
];

const UpdatesSection = ({
  tip,
  news,
  newsLoading,
  newsError,
  feedback,
  setFeedback,
  handleFeedbackSubmit,
  feedbackStatus,
}) => {
  return (
    <div className="bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 w-full mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-blue-100 flex items-center gap-3">
        <Shield className="w-10 h-10" />
        Updates
      </h1>

      {/* Security Tip of the Day */}
      <div className="mb-8 p-4 bg-[#1a2332] rounded-xl border border-blue-900 flex items-center gap-3">
        <span className="text-2xl">💡</span>
        <span className="text-blue-100 font-medium">Security Tip of the Day:</span>
        <span className="text-blue-200 italic">{tip}</span>
      </div>

      {/* Recent Security News */}
      <div className="bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 mb-8">
        <h3 className="text-2xl font-bold text-blue-200 mb-6 flex items-center gap-2">
          <Newspaper className="w-6 h-6" />
          Recent Security News
        </h3>
        {newsLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : newsError ? (
          <div className="text-red-400 text-center py-4">
            <p>{newsError}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {news.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#1e2a3a] rounded-xl p-4 hover:bg-[#2a3a4a] transition-colors"
              >
                <div className="flex gap-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-blue-100 mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-blue-300 text-sm mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <p className="text-blue-400 text-xs">
                      {article.publishedAt}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* External Resources */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
          <span className="text-blue-400">🔗</span>
          Trusted External Resources
        </h2>
        <ul className="list-disc list-inside space-y-2 text-blue-200">
          {EXTERNAL_RESOURCES.map(res => (
            <li key={res.url}>
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline">
                {res.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback Form */}
      <div className="mb-2">
        <h2 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
          <span className="text-blue-400">✉️</span>
          Feedback / Feature Request
        </h2>
        <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
          <textarea
            className="bg-[#1a2332] border border-blue-900 rounded-lg p-3 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[80px]"
            placeholder="Your feedback or feature request..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            Submit
          </button>
          {feedbackStatus && <div className={`text-sm ${feedbackStatus.startsWith('Thank') ? 'text-green-400' : 'text-red-400'}`}>{feedbackStatus}</div>}
        </form>
      </div>
    </div>
  );
};

export default UpdatesSection; 