"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUpPage() {
 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6">
   <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8"
   >
    <h1 className="text-3xl font-bold text-white text-center mb-6">
     Create your account
    </h1>

    <div className="flex flex-col gap-4 mb-6">
     <button className="w-full px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition duration-200 flex items-center justify-center gap-2">
      <img
       src={`https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_"G"_logo.svg`}
       alt="Google Logo"
       className="w-5 h-5"
      />
      <span>Continue with Google</span>
     </button>
    </div>

    <div className="flex items-center my-6">
     <div className="flex-1 h-px bg-gray-300"></div>
     <span className="mx-4 text-gray-300">or</span>
     <div className="flex-1 h-px bg-gray-300"></div>
    </div>

    <form className="flex flex-col gap-4">
     <div className="flex flex-col gap-2">
      <label htmlFor="name" className="text-white">
       First name
      </label>
      <input
       type="text"
       id="name"
       placeholder="Aymen"
       className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
       required
      />
     </div>
     <div className="flex flex-col gap-2">
      <label htmlFor="lastname" className="text-white">
       Family name
      </label>
      <input
       type="text"
       id="lastname"
       placeholder="Bouazra"
       className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
       required
      />
     </div>
     <div className="flex flex-col gap-2">
      <label htmlFor="email" className="text-white">
       Email
      </label>
      <input
       type="email"
       id="email"
       placeholder="aymen.bouazra@example.com"
       className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
       required
      />
     </div>
     <div className="flex flex-col gap-2">
      <label htmlFor="password" className="text-white">
       Password
      </label>
      <input
       type="password"
       id="password"
       placeholder="********"
       className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
       required
      />
     </div>
     <button
      type="submit"
      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
     >
      Sign Up
     </button>
    </form>

    <p className="text-center text-gray-300 mt-6">
     Already have an account?{" "}
     <Link
      href="/signin"
      className="text-blue-400 hover:text-blue-300 transition duration-200"
     >
      Log in
     </Link>
    </p>
   </motion.div>
  </div>
 );
}