'use client'
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { findOne } from "@/services/url";

export default function ShortenedUrlPage({ params }) {
  const [urlExists, setUrlExists] = useState('pending');
  const { shortUrlId } = use(params);
  const router = useRouter();
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await findOne(shortUrlId);
        console.log(response);

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
        className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6"
      >
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! This URL doesn't exist.
          </h1>
          <p className="text-gray-600 mb-6">
            The shortened URL{" "}
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">
              {shortUrlId}
            </span>{" "}
            doesn't have a corresponding original URL.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
  } else if (urlExists === 'pending') {
    return <div
      className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6"
    >
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Searching for URL...
        </h1>
      </div>
    </div>;

  } else if (urlExists === 'exists') {
    return <div
      className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6"
    >
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Redirecting...
        </h1>
      </div>
    </div>;
  }
}