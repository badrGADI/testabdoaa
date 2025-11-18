import React, { useEffect, useState } from 'react';
import { getRecentNews } from '../services/geminiService';
import { NewsArticle } from '../types';
import AdPlaceholder from '../components/AdPlaceholder';

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const data = await getRecentNews();
      setArticles(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Ornithology News</h1>
            <p className="text-xl text-gray-500">The latest updates from the field of bird conservation and science.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
                {loading ? (
                    [1,2,3].map(i => (
                        <div key={i} className="animate-pulse flex flex-col md:flex-row gap-6">
                            <div className="bg-gray-200 w-full md:w-1/3 h-48 rounded"></div>
                            <div className="flex-1 space-y-4 py-2">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-24 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    articles.map((article) => (
                        <article key={article.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-12 last:border-0">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover rounded-lg shadow-sm hover:opacity-90 transition" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-primary mb-2">
                                    <span>{article.category}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">{article.date}</span>
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 hover:text-primary cursor-pointer leading-tight">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                    {article.summary}
                                </p>
                                <div className="mt-auto">
                                    <span className="text-sm font-semibold text-gray-900">By {article.author}</span>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>

            <div className="lg:col-span-4 space-y-8">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-gray-900 mb-4">Trending Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Migration', 'Climate Change', 'New Discoveries', 'Genetics', 'Conservation', 'Behavior'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary cursor-pointer transition">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                
                <AdPlaceholder format="sidebar" />

                <div className="bg-primary text-white p-6 rounded-lg shadow-md">
                    <h3 className="font-serif font-bold text-xl mb-2">Daily Newsletter</h3>
                    <p className="text-red-50 text-sm mb-4">Get a daily bird fact and news summary.</p>
                    <input type="email" placeholder="Email address" className="w-full px-3 py-2 rounded text-gray-900 text-sm mb-2 focus:outline-none" />
                    <button className="w-full bg-slate-900 hover:bg-slate-800 py-2 rounded text-sm font-bold transition">Subscribe</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default News;