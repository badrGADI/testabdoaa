import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map, Info, Volume2, Image as ImageIcon, AlertTriangle, ChevronRight } from 'lucide-react';
import { getBirdDetails } from '../services/geminiService';
import { BirdSpecies } from '../types';
import AdPlaceholder from '../components/AdPlaceholder';

const SpeciesDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bird, setBird] = useState<BirdSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'id' | 'habitat'>('overview');

  useEffect(() => {
    const fetchBird = async () => {
      setLoading(true);
      if (id) {
        const data = await getBirdDetails(id);
        setBird(data);
        if (data) {
            document.title = `${data.commonName} - The World of Birds`;
        }
      }
      setLoading(false);
    };
    fetchBird();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid mx-auto mb-4"></div>
          <p className="text-gray-500 font-serif text-lg">Retrieving ornithological data...</p>
        </div>
      </div>
    );
  }

  if (!bird) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Species Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find a record for that bird. It might be undiscovered!</p>
            <Link to="/" className="text-primary hover:underline">Return Home</Link>
        </div>
    )
  }

  // Conservation status colors (semantic, keep mostly standard but adjust for theme if needed)
  const conservationColor = 
    bird.conservationStatus.includes('Critically') || bird.conservationStatus === 'Endangered' ? 'bg-red-100 text-red-800 border-red-200' :
    bird.conservationStatus === 'Vulnerable' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
    'bg-emerald-100 text-emerald-800 border-emerald-200';

  return (
    <div className="min-h-screen bg-white">
      {/* Species Header */}
      <div className="bg-slate-850 text-white">
        <div className="max-w-7xl mx-auto">
           {/* Breadcrumbs */}
           <div className="px-4 py-4 text-xs text-gray-400 flex items-center gap-2 uppercase tracking-wider">
              <Link to="/taxonomy" className="hover:text-white">Taxonomy</Link> 
              <ChevronRight className="h-3 w-3" />
              <span>{bird.order}</span>
              <ChevronRight className="h-3 w-3" />
              <span>{bird.family}</span>
           </div>
           
           <div className="px-4 pb-8 md:flex md:items-end md:justify-between">
               <div>
                   <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{bird.commonName}</h1>
                   <p className="text-xl text-gray-400 italic font-serif">{bird.scientificName}</p>
               </div>
               <div className="mt-4 md:mt-0">
                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${conservationColor}`}>
                       {bird.conservationStatus}
                   </span>
               </div>
           </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Left Sidebar / Nav */}
        <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 text-sm uppercase tracking-wider">
                    Contents
                </div>
                <nav className="flex flex-col">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-3 text-left text-sm font-medium border-l-4 ${activeTab === 'overview' ? 'border-primary bg-red-50 text-primary' : 'border-transparent hover:bg-gray-50 text-gray-600'}`}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('id')}
                        className={`px-4 py-3 text-left text-sm font-medium border-l-4 ${activeTab === 'id' ? 'border-primary bg-red-50 text-primary' : 'border-transparent hover:bg-gray-50 text-gray-600'}`}
                    >
                        Identification
                    </button>
                    <button 
                        onClick={() => setActiveTab('habitat')}
                        className={`px-4 py-3 text-left text-sm font-medium border-l-4 ${activeTab === 'habitat' ? 'border-primary bg-red-50 text-primary' : 'border-transparent hover:bg-gray-50 text-gray-600'}`}
                    >
                        Habitat & Diet
                    </button>
                </nav>
            </div>
            
            <AdPlaceholder format="sidebar" />
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-gray-800 mb-2">Unlock Full Data</h4>
                <p className="text-xs text-gray-600 mb-3">Detailed plumage variations, molt cycles, and subspecies analysis.</p>
                <button className="w-full bg-primary text-white text-sm font-bold py-2 rounded hover:bg-red-700 transition">Subscribe</button>
            </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6">
            <div className="prose prose-slate max-w-none">
               {/* Media Hero */}
               <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                   <img src={bird.imageUrl} alt={bird.commonName} className="w-full h-auto object-cover max-h-[400px]" />
                   <div className="bg-gray-900 text-white text-xs p-2 flex justify-between">
                       <span>Image © Generic Contributor</span>
                       <span>Macaulay Library ML12345</span>
                   </div>
               </div>

               {activeTab === 'overview' && (
                   <div className="animate-fadeIn">
                       <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Species Overview</h2>
                       <p className="text-gray-700 leading-relaxed mb-6">{bird.description}</p>
                       
                       <div className="bg-red-50 border-l-4 border-primary p-4 my-6">
                           <h4 className="text-primary font-bold flex items-center gap-2 mb-2">
                               <Info className="h-5 w-5" /> Fun Fact
                           </h4>
                           <p className="text-gray-800 italic">{bird.funFact}</p>
                       </div>
                   </div>
               )}

               {activeTab === 'id' && (
                   <div className="animate-fadeIn">
                       <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Identification</h2>
                       <p className="text-gray-700 leading-relaxed">{bird.identification}</p>
                   </div>
               )}

                {activeTab === 'habitat' && (
                   <div className="animate-fadeIn">
                       <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Habitat & Diet</h2>
                       <h3 className="text-lg font-bold mt-4">Habitat</h3>
                       <p className="text-gray-700 leading-relaxed mb-4">{bird.habitat}</p>
                       <h3 className="text-lg font-bold mt-4">Diet</h3>
                       <p className="text-gray-700 leading-relaxed">{bird.diet}</p>
                   </div>
               )}
               
               <AdPlaceholder format="inline" />

               <div className="mt-8 pt-8 border-t border-gray-200">
                   <h3 className="font-bold text-gray-900 mb-4">Systematics History</h3>
                   <p className="text-sm text-gray-600">
                       Taxonomic classification is based on the latest check-list of North American Birds and relevant ornithological unions.
                   </p>
               </div>
            </div>
        </div>

        {/* Right Sidebar (Stats/Map) */}
        <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Map className="h-5 w-5 text-gray-500" /> Range
                </h3>
                <div className="bg-blue-50 aspect-square rounded flex items-center justify-center text-blue-300 mb-3">
                    {/* Placeholder for Google Map or Static Map */}
                    <Map className="h-16 w-16 opacity-50" />
                </div>
                <div className="text-sm text-gray-600">
                    <strong>Regions:</strong> {bird.region.join(', ')}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                 <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-gray-500" /> Audio
                </h3>
                <div className="space-y-2">
                    <div className="bg-gray-100 p-2 rounded text-xs flex items-center justify-between cursor-pointer hover:bg-gray-200">
                        <span>Call (Male)</span>
                        <span>0:12</span>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-xs flex items-center justify-between cursor-pointer hover:bg-gray-200">
                        <span>Song (Dawn Chorus)</span>
                        <span>0:45</span>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <span className="text-xs text-primary font-semibold cursor-pointer">View all audio recordings</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                 <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-gray-500" /> Photos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-200 aspect-square rounded overflow-hidden">
                        <img src={`https://picsum.photos/seed/${bird.slug}1/200`} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-gray-200 aspect-square rounded overflow-hidden">
                        <img src={`https://picsum.photos/seed/${bird.slug}2/200`} className="w-full h-full object-cover" />
                    </div>
                     <div className="bg-gray-200 aspect-square rounded overflow-hidden">
                        <img src={`https://picsum.photos/seed/${bird.slug}3/200`} className="w-full h-full object-cover" />
                    </div>
                     <div className="bg-gray-200 aspect-square rounded overflow-hidden">
                        <img src={`https://picsum.photos/seed/${bird.slug}4/200`} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail;