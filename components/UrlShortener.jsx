"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { create } from "@/services/url";
import Link from "next/link";
import toast from "react-hot-toast";
import brand_icon from "../assets/img/scizz-icon.svg?url";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await create({ originalUrl, token: localStorage.getItem('token_url_shortener') });
      if (response.status === 201) {
        setIsLoading(false);
        toast.success(response.data.message);
        setShortenedUrl(response.data.response.shortenedUrl);
        setErrors([]);
      } else if (response.data && response.data.status === 302) {
        setIsLoading(false);
        toast.success(response.data.response.message);
        setShortenedUrl(response.data.response.shortenedUrl);
        setErrors([]);
      } else if (response.response && response.response.status === 400) {
        setIsLoading(false);
        toast.error(response.response.data.message[0]);
        setErrors(response.response.data.message);
      } else {
        setIsLoading(false);
        setErrors([]);
        toast.error('An error occurred while shortening the URL.');
      }
    } catch (error) {
      console.log({ error });
      toast.error('An error occurred while shortening the URL.');
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6 pt-28">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl text-center"
      >
        <h1 className="flex flex-col items-center text-4xl font-bold text-white mb-6">
          Shorten Your Links in Seconds with <span className="text-[#02a676] text-6xl font-bold">Scizz</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          A fast, reliable, and free URL shortener for all your needs. Perfect for social media, emails, and more.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter a long URL"
              className="w-full md:w-3/4 px-6 py-3 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full px-6 md:w-1/4 py-3 text-white font-semibold rounded-lg overflow-hidden z-[3] ${isLoading ? "cursor-not-allowed bg-[#018a61]" : "bg-[#02a676]"} transition duration-200`}
            >
              <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
              {isLoading ? (
                <div role="status" className="flex justify-center items-center w-full gap-3">
                  <span className="flex items-center justify-center gap-2">
                    <img src={brand_icon.src} alt="Logo" className="w-6 h-6 animate-pulse" />
                    <span className="text-white">Scizzing...</span>
                  </span>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <img src={brand_icon.src} alt="Logo" className="w-6 h-6" />
                  <span className="text-white">Scizz URL</span>
                </div>
              )}
            </button>
          </form>
          {errors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-4 bg-white/10 rounded-lg relative"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <p className="text-sm sm:text-lg text-white truncate mb-2 sm:mb-0 break-all">
                  <code>Your short URL is: <b className="underline cursor-pointer" onClick={handleCopy}>{shortenedUrl}</b></code>
                </p>
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>
              <div>
                {!localStorage.getItem('token_url_shortener') && (
                  <div className="text-yellow-400 text-xs sm:text-sm mt-2">
                    Save your created links to access them later by logging in to your account.
                  </div>
                )}
              </div>

              {showCopied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-5 right-4 bg-gray-800/50 text-white px-3 py-1 text-xs sm:text-sm rounded-lg"
                >
                  Copied!
                </motion.div>
              )}
            </motion.div>
          ) :
            (
              <div className="flex flex-col items-start mt-3 gap-1">
                {errors.map((error, index) => (
                  <span key={index} className="text-red-500 text-bold text-start text-sm p-2 rounded-lg bg-white/60">
                    {error}
                  </span>
                ))}
              </div>
            )
          }
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-6xl mt-24 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-12">
          Learn More About Scizz
        </h2>
        <div className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Explore Our Documentation
          </h3>
          <p className="text-gray-300 mb-6">
            Discover how to make the most of Scizz with our comprehensive documentation. Learn about advanced features, API integrations, and best practices for URL shortening.
          </p>
          <Link
            href="/documentations"
            className="inline-block px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg hover:bg-[#018a61] transition duration-200"
          >
            View Documentation
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-6xl mt-24 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-12">
          Save Your Links Forever!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Never Lose a Link</h3>
            <p className="text-gray-300 mb-6">
              Create an account to save all your shortened URLs in one place. Access them anytime, anywhere.
            </p>
            <Link
              href="/signup"
              className="inline-block px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg hover:bg-[#018a61] transition duration-200"
            >
              Sign Up Now
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Manage Your Links</h3>
            <p className="text-gray-300 mb-6">
              Already have an account? Log in to view and manage your saved URLs.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg hover:bg-[#018a61] transition duration-200"
            >
              Log In
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full max-w-6xl mt-24 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          Why Choose Scizz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-300">
              Our service is optimized for speed, ensuring your links are shortened in milliseconds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Easy to Use</h3>
            <p className="text-gray-300">
              Simply paste your long URL and get a shortened link instantly. No sign-up required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Free Forever</h3>
            <p className="text-gray-300">
              Enjoy unlimited URL shortening without any hidden costs or fees with Scizz.
            </p>
          </motion.div>
        </div>
      </div>
    </div >
  );
}