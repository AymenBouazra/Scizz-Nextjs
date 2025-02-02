"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Header() {
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const dropdownRef = useRef(null);
 const router = useRouter();
 const signout = async () => {
  try {
   const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`);
   console.log(response.data);
   router.push("/");
  } catch (error) {
   console.error("Error during sign-out:", error);
  }
 };

 useEffect(() => {
  const handleClickOutside = (event) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setTimeout(() => setIsDropdownOpen(false), 3000);
   }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);

 return (
  <motion.header
   initial={{ opacity: 0, y: -50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8 }}
   className="w-full fixed top-0 left-0 bg-white/10 backdrop-blur-lg shadow-lg z-50"
  >
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
     <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
       type="button"
       onClick={() => setIsDropdownOpen(!isDropdownOpen)}
       className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
       id="menu-button"
       aria-expanded="true"
       aria-haspopup="true"
      >
       Profile
       <svg
        className="-mr-1 h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
       >
        <path
         fillRule="evenodd"
         d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
         clipRule="evenodd"
        />
       </svg>
      </button>
      {isDropdownOpen && (
       <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, y: -50 }}
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
       >
        <div className="py-1" role="none">
         <Link
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-0"
         >
          Account
         </Link>
         <button
          type="button"
          onClick={signout}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          tabIndex="-1"
          id="menu-item-3"
         >
          Sign Out
         </button>
        </div>
       </motion.div>
      )}
     </div>
    </nav>
   </div>
  </motion.header>
 );
}