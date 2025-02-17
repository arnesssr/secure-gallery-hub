
import { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-transparent animate-gradient"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 
                       backdrop-blur-3xl animate-float-${i + 1}`}
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
        
        {/* Additional geometric shapes */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className={`absolute bg-gradient-to-br from-purple-400/10 to-blue-400/10 
                       backdrop-blur-3xl animate-float-reverse-${i + 1}`}
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
              clipPath: i % 2 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'polygon(25% 0%, 100% 25%, 75% 100%, 0% 75%)',
            }}
          />
        ))}
      </div>

      {/* Subtle light effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
    </div>
  );
};

export default ThreeDBackground;
