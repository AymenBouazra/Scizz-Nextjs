"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, Trash2, Search, Link2 } from 'lucide-react';
import { getProfile } from '@/services/auth';
import { removeUrlFromUser } from '@/services/url';
import toast from 'react-hot-toast';

export default function UrlProfile() {
 const [loading, setLoading] = useState(true);
 const [searchQuery, setSearchQuery] = useState('');
 const [copyStates, setCopyStates] = useState({});
 const [profile, setProfile] = useState();

 const removeUrl = async (id, token) => {
  try {
   const response = await removeUrlFromUser(id, token);
   if (response.status === 200) {

    toast.success(response.data.message);
    fetchProfile();
   } else if (response.status === 400) {
    toast.error(response.data.message);
   } else {
    console.error("Error during removeUrlFromUser:", response);
   }

  } catch (error) {
   console.error("Error during removeUrlFromUser:", error);
  }
 };

 const fetchProfile = async () => {
  setLoading(true);
  const response = await getProfile(localStorage.getItem('token_url_shortener'));
  setProfile(response);
  setLoading(false);
 };
 useEffect(() => {
  fetchProfile();
 }, []);

 const handleCopy = async (id, url) => {
  try {
   await navigator.clipboard.writeText(url);
   setCopyStates(prev => ({ ...prev, [id]: true }));
   setTimeout(() => {
    setCopyStates(prev => ({ ...prev, [id]: false }));
   }, 2000);
  } catch (err) {
   console.error("Failed to copy URL");
  }
 };

 const filteredUrls = profile ? profile.urlIds.filter(url =>
  url.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
  url.shortenedUrl.toLowerCase().includes(searchQuery.toLowerCase())
 ) : [];

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6 pt-24">
   <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-6xl mx-auto mb-12 text-center">
    <h1 className="text-5xl font-bold text-white mb-4">
     Manage Your Shortened Links
    </h1>
    <p className="text-xl text-purple-200">
     All your shortened URLs in one place, easy to manage and track.
    </p>
   </motion.div>

   <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-6xl mx-auto mb-8 text-center">
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
     <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex gap-12">
       <div className="text-center">
        <div className="text-3xl font-bold text-white">{profile?.urlIds?.length || 0}</div>
        <div className="text-purple-200">Total Links</div>
       </div>
       <div className="text-center">
        <div className="text-3xl font-bold text-white">
         {profile?.urlIds?.reduce((sum, url) => sum + (url.clicks || 0), 0) || 0}
        </div>
        <div className="text-purple-200">Total Clicks</div>
       </div>
      </div>

      <div className="relative w-full md:w-auto">
       <Search className="w-5 h-5 text-purple-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
       <input
        type="text"
        placeholder="Search URLs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-64 pl-10 pr-4 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
       />
      </div>
     </div>
    </div>
   </motion.div>

   {profile?.urlIds?.length ? <>{loading ? (
    <div className="flex justify-center py-12">
     <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
   ) : (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredUrls.map((url) => (
      <motion.div
       key={url._id}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300"
      >
       <div className="p-6">
        <div className="flex justify-between items-start mb-4">
         <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
           <Link2 className="w-5 h-5 text-purple-300" />
          </div>
          <div>
           <div className="text-sm text-purple-300">
            {new Date(url.createdAt).toLocaleDateString()}
           </div>
          </div>
         </div>

         <div className="flex gap-2">
          <button
           onClick={() => handleCopy(url._id, url.shortenedUrl)}
           className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
           title="Copy shortened URL"
          >
           <Copy className="w-4 h-4 text-purple-300" />
          </button>
          <a
           href={url.shortenedUrl}
           target="_blank"
           rel="noopener noreferrer"
           className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
          >
           <ExternalLink className="w-4 h-4 text-purple-300" />
          </a>
         </div>
        </div>

        <div className="space-y-1 pt-3 border-t border-purple-500/50">
         <div>
          <div className="text-sm text-purple-300">Shortened URL:</div>
          <div className="text-white break-all">
           {url.shortenedUrl}
          </div>
         </div>
         <div>
          <div className="text-sm text-purple-300">Original URL:</div>
          <div className="text-purple-200 break-all text-sm line-clamp-2">
           {url.originalUrl}
          </div>
         </div>
        </div>

        {copyStates[url._id] && (
         <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-sm mt-2"
         >
          Copied to clipboard!
         </motion.div>
        )}

        <div className="mt-4 pt-4 border-t border-purple-500/50 flex justify-between items-center">
         <div className="text-sm text-purple-300">
          <span className="text-white font-medium">{url.clicks}</span> clicks
         </div>
         <button
          onClick={() => removeUrl(url._id, localStorage.getItem('token_url_shortener'))}
          className="text-red-400 hover:text-red-300 transition-colors"
          title="Delete URL"
         >
          <Trash2 className="w-4 h-4" />
         </button>
        </div>
       </div>
      </motion.div>
     ))}
    </div>
   )}
   </> : <>
    No URLs found
   </>}
  </div>
 );
}