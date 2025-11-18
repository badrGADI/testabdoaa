import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Camera, BookOpen } from 'lucide-react';
import { MOCK_FEATURED_BIRDS } from '../constants';
import AdPlaceholder from '../components/AdPlaceholder';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/birds/1920/1080" 
            alt="Bird background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
            The World of Birds
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            The most comprehensive database of avian life. Explore over 10,700 species with detailed life histories, maps, and media.
          </p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex shadow-xl">
            <input 
              type="text" 
              placeholder="Search for a species, family, or region..." 
              className="flex-1 px-4 py-3 text-gray-900 focus:outline-none rounded-l-lg"
            />
            <button className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold transition">
              Search
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
             <div>
               <div className="text-3xl font-bold text-secondary">10,721</div>
               <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Species</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-secondary">249</div>
               <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Families</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-secondary">50M+</div>
               <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">Observations</div>
             </div>
          </div>
        </div>
      </section>

      <AdPlaceholder format="banner" className="my-2" />

      {/* Featured Species */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Species</h2>
              <p className="text-gray-500 mt-2">Species spotlight from around the globe.</p>
            </div>
            <Link to="/taxonomy" className="text-primary font-semibold hover:text-red-700 inline-flex items-center">
              View Taxonomy <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_FEATURED_BIRDS.map((bird) => (
              <Link key={bird.id} to={`/species/${bird.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                  <img 
                    src={bird.imageUrl} 
                    alt={bird.commonName} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold">{bird.commonName}</h3>
                    <p className="text-gray-300 italic text-sm">{bird.scientificName}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props / Features */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-primary">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Range Maps</h3>
              <p className="text-gray-600 leading-relaxed">Dynamic distribution maps updated with real-time observation data.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-primary">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Media Library</h3>
              <p className="text-gray-600 leading-relaxed">Access millions of photos, audio recordings, and videos.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scientific Accounts</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive life history accounts written by ornithologists and experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">Unlock the Full Encyclopedia</h2>
          <p className="text-red-50 text-lg mb-8 max-w-2xl mx-auto">
            Get unlimited access to every species account, range map, and media gallery. Support avian research and conservation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary font-bold px-8 py-3 rounded-md shadow hover:bg-gray-100 transition">
              Subscribe Now
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-md hover:bg-white hover:text-primary transition">
              Try Free Preview
            </button>
          </div>
        </div>
      </section>

      <AdPlaceholder format="banner" className="my-0" />
    </div>
  );
};

export default Home;