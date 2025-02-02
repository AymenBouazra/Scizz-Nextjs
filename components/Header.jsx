"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  const token = localStorage.getItem('token_url_shortener');
  setIsLoggedIn(!!token);
 }, []);

 const handleLogout = () => {
  localStorage.removeItem('token_url_shortener');
  window.location.reload();
 };

 useEffect(() => {
  const checkAuthStatus = () => {
   const token = localStorage.getItem('token_url_shortener');
   setIsLoggedIn(!!token);
  };
  checkAuthStatus();
  window.addEventListener('authStateChanged', checkAuthStatus);

  return () => {
   window.removeEventListener('authStateChanged', checkAuthStatus);
  };
 }, []);

 return (
  <motion.header
   initial={{ opacity: 0, y: -50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8 }}
   className="w-full fixed top-0 left-0 bg-white/10 backdrop-blur-lg shadow-lg z-50"
  >
   {/* <h1 className="text-6xl">ADD DOCUMENTATION ? page 404 notfound ? begin JEST ? Deploy to vercel ? </h1> */}

   <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <Link href="/" className="text-2xl font-bold text-white">
     URL Shortener
    </Link>
    <nav className="flex items-center gap-6">
     <Link
      href="/"
      className="text-white hover:text-blue-400 transition duration-200"
     >
      Home
     </Link>
     {isLoggedIn ? (
      <>
       <Link
        href="/profile"
        className="text-white hover:text-blue-400 transition duration-200"
       >
        Profile
       </Link>
       <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
       >
        <LogOut size={20} />
        Logout
       </button>
      </>


     ) : (
      <>
       <Link
        href="/signin"
        className="text-white hover:text-blue-400 transition duration-200"
       >
        Sign In
       </Link>
       <Link
        href="/signup"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
       >
        Sign Up
       </Link>
      </>
     )}
    </nav>
   </div>
  </motion.header>
 );
}