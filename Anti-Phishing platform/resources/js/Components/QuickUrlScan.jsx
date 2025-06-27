import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
if (csrfTokenMeta) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfTokenMeta.getAttribute('content');
}

const QuickUrlScan = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const response = await axios.post('/quick-url-scan', { url });
      setResult(response.data);
    } catch (error) {
      setError('Scan failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <span className="text-xl font-semibold mb-2">Quick URL Scan</span>
      <div className="flex w-full max-w-xl space-x-2">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-cyan-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleScan}
          disabled={loading || !url}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            loading || !url
              ? 'bg-cyan-900 text-cyan-300 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
          }`}
        >
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
      {error && (
        <div className="mt-4 text-center">
          <span className="text-red-400">{error}</span>
        </div>
      )}
      {result && !error && (
        <div className="mt-4 text-center">
          {result.is_phishing ? (
            <span className="text-red-500 font-bold">
              Phishing/Spam URL Detected! (Confidence: {(result.probability * 100).toFixed(1)}%)
            </span>
          ) : (
            <span className="text-green-400 font-bold">
              URL is Safe. (Confidence: {(100 - result.probability * 100).toFixed(1)}%)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickUrlScan;