"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import brand from "../assets/img/scizz-brand.svg?url";

export default function Header() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

 const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
 };

 return (
  <motion.header
   initial={{ opacity: 0, y: -50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8 }}
   className="w-full fixed top-0 left-0 bg-white/10 backdrop-blur-lg shadow-lg z-[1]"
  >
   <div className="max-w-6xl mx-auto py-4 px-4 flex items-center justify-between">
    <Link href="/" className="text-2xl font-bold text-white">
     <img src={brand.src} alt="Logo" className="w-32" />
    </Link>

    <nav className="hidden md:flex items-center gap-6">
     <Link
      href="/"
      className="text-white hover:text-[#02a676] transition duration-200"
     >
      Home
     </Link>
     <Link
      href="/documentations"
      className="text-white hover:text-[#02a676] transition duration-200"
     >
      Documentation
     </Link>
     {isLoggedIn ? (
      <>
       <Link
        href="/profile"
        className="text-white hover:text-[#02a676] transition duration-200"
       >
        Profile
       </Link>
       <button
        type="submit"
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 group relative w-full px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg overflow-hidden z-[3] hover:text-white"
       >
        <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
        <LogOut size={20} />
        Logout
       </button>
      </>
     ) : (
      <>
       <Link
        href="/signin"
        className="text-white whitespace-nowrap hover:text-[#02a676] transition duration-200"
       >
        Sign In
       </Link>
       <Link
        href="/signup"
        className="group relative whitespace-nowrap w-full px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg overflow-hidden z-[3] hover:text-white"
       >
        <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
        Sign Up
       </Link>
      </>
     )}
    </nav>

    <button
     onClick={toggleMobileMenu}
     className="md:hidden text-white focus:outline-none"
    >
     {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
   </div>

   {isMobileMenuOpen && (
    <motion.div
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.3 }}
     className="md:hidden bg-white/10 backdrop-blur-lg shadow-lg w-full px-4 py-6"
    >
     <nav className="flex flex-col gap-4">
      <Link
       href="/"
       className="text-white hover:text-[#02a676] transition duration-200"
       onClick={toggleMobileMenu}
      >
       Home
      </Link>
      <Link
       href="/documentations"
       className="text-white hover:text-[#02a676] transition duration-200"
       onClick={toggleMobileMenu}
      >
       Documentation
      </Link>
      {isLoggedIn ? (
       <>
        <Link
         href="/profile"
         className="text-white hover:text-[#02a676] transition duration-200"
         onClick={toggleMobileMenu}
        >
         Profile
        </Link>
        <button
         type="submit"
         onClick={() => {
          handleLogout();
          toggleMobileMenu();
         }}
         className="flex items-center justify-center gap-2 group relative w-full px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg overflow-hidden z-[3] hover:text-white"
        >
         <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
         <LogOut size={20} />
         Logout
        </button>
       </>
      ) : (
       <>
        <Link
         href="/signin"
         className="text-white whitespace-nowrap hover:text-[#02a676] transition duration-200"
         onClick={toggleMobileMenu}
        >
         Sign In
        </Link>
        <Link
         href="/signup"
         className="group relative whitespace-nowrap w-full px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg overflow-hidden z-[3] hover:text-white"
         onClick={toggleMobileMenu}
        >
         <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
         Sign Up
        </Link>
       </>
      )}
     </nav>
    </motion.div>
   )}
  </motion.header>
 );
}