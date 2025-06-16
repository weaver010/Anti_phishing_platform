import React, { useState } from 'react';
import UpdatesSection from '@/Components/training/UpdatesSection';

const Updates = ({ news: initialNews, tip: initialTip, error: initialError }) => {
  const [tip, setTip] = useState(initialTip || 'Avoid clicking on suspicious links.');
  const [news, setNews] = useState(initialNews || []);
  const [newsLoading, setNewsLoading] = useState(false); // مش بنحمل من API خارجي
  const [newsError, setNewsError] = useState(initialError || null);
  const [feedback, setFeedback] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      setFeedbackStatus('Thank you for your feedback!');
      setFeedback('');
    } catch (error) {
      setFeedbackStatus('Failed to send feedback. Try again later.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {newsError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{newsError}</span>
        </div>
      )}
      {!newsLoading && news.length === 0 && !newsError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">No news articles available at the moment.</span>
        </div>
      )}
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
    </div>
  );
};

export default Updates;
