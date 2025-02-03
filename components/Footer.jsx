"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import brand from "../assets/img/scizz-brand.svg?url";

export default function Footer() {
 return (
  <motion.footer
   initial={{ opacity: 0, y: 50 }}
   whileInView={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8 }}
   className="w-full bg-white/10 backdrop-blur-lg shadow-lg"
  >
   <div className="max-w-6xl mx-auto py-8 px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
     <div className="flex flex-col items-center md:items-start">
      <Link href="/" className="text-2xl font-bold text-white">
       <img src={brand.src} alt="Logo" className="w-44" />
      </Link>
      <p className="text-sm text-gray-300 mt-4">
       Simplify your links and track their performance with ease.
      </p>
     </div>

     <div className="flex flex-col items-center md:items-start">
      <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
      <Link
       href="/"
       className="text-gray-300 hover:text-[#02a676] transition duration-200 mb-2"
      >
       Home
      </Link>
      <Link
       href="/documentations"
       className="text-gray-300 hover:text-[#02a676] transition duration-200 mb-2"
      >
       Documentation
      </Link>
      {localStorage.getItem('token_url_shortener') && (
       <Link
        href="/profile"
        className="text-gray-300 hover:text-[#02a676] transition duration-200 mb-2"
       >
        Profile
       </Link>
      )}
      <Link
       href="/signin"
       className="text-gray-300 hover:text-[#02a676] transition duration-200 mb-2"
      >
       Sign In
      </Link>
     </div>

     <div className="flex flex-col items-center md:items-start">
      <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
      <p className="text-gray-300 mb-2 whitespace-nowrap">Email: aymenbouazra994@gmail.com</p>
      <p className="text-gray-300 mb-2">Phone: +216 (24) 819-992</p>
      <p className="text-gray-300">Address: Manouba, Tunisia</p>
     </div>
    </div>

    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
     <p className="text-sm text-gray-300">
      &copy; {new Date().getFullYear()} Scizz. All rights reserved.
     </p>
    </div>
   </div>
  </motion.footer>
 );
}