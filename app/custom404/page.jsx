import { motion } from "framer-motion";
import Link from "next/link";

export default function Custom404() {
 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-6 pt-24">
   <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center"
   >
    <motion.h1
     initial={{ scale: 0.9 }}
     animate={{ scale: 1 }}
     transition={{ duration: 0.5, delay: 0.3 }}
     className="text-9xl font-bold text-white mb-4"
    >
     404
    </motion.h1>

    <motion.p
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5, delay: 0.6 }}
     className="text-2xl text-gray-300 mb-8"
    >
     Oops! The page you're looking for doesn't exist.
    </motion.p>

    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: 0.9 }}
    >
     <Link
      href="/"
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
     >
      Go Back Home
     </Link>
    </motion.div>
   </motion.div>
  </div>
 );
}