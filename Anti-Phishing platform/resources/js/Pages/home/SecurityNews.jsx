import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SecurityNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news');
                if (response.data.status === 'ok') {
                    setNews(response.data.articles);
                } else {
                    setError('Failed to fetch news');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch security news');
                setLoading(false);
                console.error('Error fetching news:', err);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="text-center p-4">Loading security news...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Recent Security News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        {article.urlToImage && (
                            <img 
                                src={article.urlToImage} 
                                alt={article.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image+Available';
                                }}
                            />
                        )}
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                {article.source.name && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                        {article.source.name}
                                    </span>
                                )}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </span>
                                <a 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecurityNews; 