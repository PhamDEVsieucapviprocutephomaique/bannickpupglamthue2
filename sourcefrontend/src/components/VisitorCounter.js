import React, { useState, useEffect } from "react";

const VisitorCounter = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Hiệu ứng count-up
    if (count > 0) {
      const duration = 2000; // 2 giây
      const steps = 60;
      const stepTime = duration / steps;
      const stepValue = count / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(
          Math.floor(stepValue * currentStep),
          count
        );
        setDisplayCount(currentValue);

        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayCount(count);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [count]);

  return (
    <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 border-4 border-yellow-400 rounded-2xl p-6 max-w-md mx-auto shadow-2xl transform hover:scale-105 transition-all duration-500">
      <div className="bg-black bg-opacity-70 rounded-xl p-4 border-2 border-white">
        <h3 className="text-white text-lg font-bold mb-2 text-center">
          👥 Lượt Truy Cập
        </h3>
        <div className="text-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent animate-pulse">
            {displayCount.toLocaleString()}
          </span>
        </div>
        <p className="text-yellow-300 text-sm text-center mt-2">
          Người đã ghé thăm website
        </p>
      </div>
    </div>
  );
};

export default VisitorCounter;
