"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signin } from "@/services/auth";
import toast from "react-hot-toast";
import brand from "../../assets/img/scizz-brand.svg?url";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signin(data);
      if (response.status === 200) {
        setTimeout(() => {
          toast.success(response.message);
          localStorage.setItem("token_url_shortener", response.response.token);
          window.dispatchEvent(new Event('authStateChanged'));
          router.push("/");
          setIsLoading(false);
        }, 2000)
      } else if (response.status === 400) {
        toast.error(response.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error("Error during sign-in:", response);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during sign-in:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8"
      >
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <img
              src={brand.src}
              alt="Scizz logo"
              className="w-40"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Sign in and save your links
        </h1>


        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-300">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              placeholder="Enter your email"
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
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition duration-200 self-end"
          >
            Forgot your password?
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full px-6 py-3 text-white font-semibold rounded-lg overflow-hidden z-[3] ${isLoading ? "cursor-not-allowed bg-[#018a61]" : "bg-[#02a676]"
              } transition duration-200`}
          >
            <span className="absolute inset-0 bg-[#018a61] transform scale-x-0 origin-left transition-transform duration-500 ease-in-out delay-100 group-hover:scale-x-100 z-[-1]"></span>
            {isLoading ? (
              <div role="status" className="flex justify-center items-center w-full gap-3">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Signing in...</span>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Signin"
            )}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}