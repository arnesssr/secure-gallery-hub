
import { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/40 to-transparent animate-gradient"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 
                       backdrop-blur-3xl animate-float-${i + 1}`}
            style={{
              width: `${Math.random() * 300 + 150}px`, // Increased size
              height: `${Math.random() * 300 + 150}px`, // Increased size
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${Math.random() * 0.5 + 0.8})`, // Increased scale
            }}
          />
        ))}
        
        {/* Additional geometric shapes */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className={`absolute bg-gradient-to-br from-purple-400/30 to-blue-400/30 
                       backdrop-blur-3xl animate-float-reverse-${i + 1}`}
            style={{
              width: `${Math.random() * 200 + 100}px`, // Increased size
              height: `${Math.random() * 200 + 100}px`, // Increased size
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})`, // Increased scale
              clipPath: i % 2 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'polygon(25% 0%, 100% 25%, 75% 100%, 0% 75%)',
            }}
          />
        ))}
      </div>

      {/* Subtle light effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
      
      {/* Additional glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/80 via-[#9b87f5]/40 to-transparent z-10 transition-all duration-500"></div>
    </div>
  );
};

export default ThreeDBackground;
