import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Bird } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';
import { searchBirds } from '../services/geminiService';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{commonName: string, slug: string, scientificName: string}[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
       // Debounce could be added here
       const results = await searchBirds(query);
       setSearchResults(results);
    } else {
        setSearchResults([]);
    }
  };

  const executeSearch = (slug?: string) => {
      if (slug) {
          navigate(`/species/${slug}`);
          setSearchQuery('');
          setSearchResults([]);
      }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Bird className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl text-slate-850 tracking-tight">The World of Birds</span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-md ml-8 relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                placeholder="Find a species..."
              />
              {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-200 rounded-b-md mt-1 max-h-60 overflow-y-auto">
                      {searchResults.map((res) => (
                          <div 
                            key={res.slug} 
                            onClick={() => executeSearch(res.slug)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-50 last:border-0"
                          >
                              <div className="font-semibold text-sm text-gray-900">{res.commonName}</div>
                              <div className="italic text-xs text-gray-500">{res.scientificName}</div>
                          </div>
                      ))}
                  </div>
              )}
            </div>
            <button className="ml-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition shadow-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary"
              >
                {link.name}
              </Link>
            ))}
             <div className="px-3 pt-2">
               <input 
                 type="text" 
                 className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none"
                 placeholder="Search species..."
               />
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;