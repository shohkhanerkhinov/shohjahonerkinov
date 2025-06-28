import React from "react";
import { motion } from "framer-motion";

const GitProblem: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-950 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-700"
      >
        {/* SVG Icon */}
        <div className="mb-6 flex justify-center">
          <svg
            className="w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-3">Kechirasiz 😔</h2>
        <p className="text-gray-300 leading-relaxed">
          Codlarning noto‘g‘ri maqsadda ishlatilayotgani uchun sizni GitHub
          codlariga o‘tkaza olmayman.
        </p>
      </motion.div>
    </div>
  );
};

export default GitProblem;
