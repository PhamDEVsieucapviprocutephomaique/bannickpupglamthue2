import React, { useState, useEffect, useRef } from "react";

const VisitorCounter = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);
  const hasAnimated = useRef(false); // 👈 THÊM DÒNG NÀY

  useEffect(() => {
    // 👈 CHỈ CHẠY ANIMATION 1 LẦN DUY NHẤT
    if (hasAnimated.current) {
      setDisplayCount(count);
      setProgress(1);
      return;
    }

    if (count > 0) {
      hasAnimated.current = true; // 👈 ĐÁNH DẤU ĐÃ CHẠY

      const duration = 2000; // 1 GIÂY
      const startTime = Date.now();

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setProgress(progress);
        setDisplayCount(Math.floor(count * progress));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(updateCounter);
        } else {
          setDisplayCount(count);
          setProgress(1);
        }
      };

      animationRef.current = requestAnimationFrame(updateCounter);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count]);

  return (
    <div className="w-4/5 mx-auto">
      {/* COUNTER DISPLAY */}
      <div className="text-center mb-3">
        <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {displayCount.toLocaleString()}
        </span>
        <p className="text-blue-300 text-sm mt-1">Lượt Truy Cập</p>
      </div>

      {/* PROGRESS BAR - STANDALONE */}
      <div className="w-full bg-blue-800 bg-opacity-50 rounded-full h-3 overflow-hidden border border-cyan-400 border-opacity-50">
        <div
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-100 ease-out shadow-lg"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>

      {/* ANIMATED DOTS */}
      <div className="flex justify-center space-x-2 mt-3">
        <div
          className={`w-2 h-2 bg-cyan-400 rounded-full transition-all duration-300 ${
            progress > 0.3 ? "opacity-100 animate-pulse" : "opacity-30"
          }`}
        ></div>
        <div
          className={`w-2 h-2 bg-blue-400 rounded-full transition-all duration-300 ${
            progress > 0.6 ? "opacity-100 animate-pulse" : "opacity-30"
          }`}
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className={`w-2 h-2 bg-purple-400 rounded-full transition-all duration-300 ${
            progress > 0.9 ? "opacity-100 animate-pulse" : "opacity-30"
          }`}
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default VisitorCounter;
