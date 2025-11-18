import React, { useState } from 'react';
import { Bird, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-850 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
               <Bird className="h-8 w-8 text-secondary" />
               <span className="font-serif font-bold text-xl tracking-tight">The World of Birds</span>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               The authoritative resource for birds of the world. Integrating ornithological data, range maps, and multimedia for over 10,000 species.
             </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Species</a></li>
              <li><a href="#" className="hover:text-white transition">Families</a></li>
              <li><a href="#" className="hover:text-white transition">News</a></li>
              <li><a href="#" className="hover:text-white transition">Glossary</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">About</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Partners</a></li>
              <li><a href="#" className="hover:text-white transition">Staff</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Subscribe</h3>
             <p className="text-gray-400 text-sm mb-4">Get the latest ornithological news delivered to your inbox.</p>
             <form className="flex flex-col space-y-2">
               <input type="email" placeholder="Enter your email" className="bg-gray-700 text-white px-4 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
               <button className="bg-secondary text-white font-bold px-4 py-2 rounded text-sm hover:bg-red-500 transition">Sign Up</button>
             </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} The World of Birds Project. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Mail className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;