import React from "react";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-200 bg-opacity-75 z-50">
      <div className="flex space-x-4">
        {/* Dot 1 */}
        <div className="w-4 h-4 rounded-full bg-gray-500 animate-dot1"></div>
        {/* Dot 2 */}
        <div className="w-4 h-4 rounded-full bg-gray-500 animate-dot2"></div>
        {/* Dot 3 */}
        <div className="w-4 h-4 rounded-full bg-gray-500 animate-dot3"></div>
      </div>
    </div>
  );
};

export default Loader;