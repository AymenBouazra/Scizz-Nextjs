'use client'
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { findOne } from "@/services/url";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ShortenedUrlPage({ params }) {
  const [urlExists, setUrlExists] = useState('pending');
  const { shortUrlId } = use(params);
  const router = useRouter();
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await findOne(shortUrlId);

        if (response.data?.originalUrl) {
          router.push(response.data.originalUrl);
          setUrlExists('exists');
        } else {
          toast.error("Invalid or missing original URL in response.");
          setUrlExists('not found');
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setUrlExists('not found');
          toast.error("URL not found.");
        } else {
          console.error("Error fetching URL:", error);
          toast.error("An error occurred while fetching the URL.");
        }
        setUrlExists('not found');
      }
    };

    fetchUrl();
  }, [shortUrlId, router]);

  if (urlExists === 'not found') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8"
        >
          <h1 className="text-2xl font-bold text-white mb-4">
            Oops! This URL doesn't exist.
          </h1>
          <p className="text-white mb-6">
            The shortened URL doesn't have a corresponding original URL.
          </p>
          <Link
            href="/"
            className="group relative whitespace-nowrap w-full px-6 py-3 bg-[#02a676] text-white font-semibold rounded-lg overflow-hidden z-[3] hover:text-white"
          >
            <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
            Go back home
          </Link>
        </motion.div>
      </div>
    );
  } else if (urlExists === 'pending') {
    return <div
      className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          Searching for URL...
        </h1>
      </div>
    </div>;

  } else if (urlExists === 'exists') {
    return <div
      className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-4">
          Redirecting...
        </h1>
      </div>
    </div>;
  }
}