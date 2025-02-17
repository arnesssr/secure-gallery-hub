
import { useRef } from 'react';

const ThreeDBackground = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/40 to-transparent animate-gradient"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(93, 63, 211, 0.5) 0%,
              rgba(49, 47, 147, 0.4) 50%,
              rgba(28, 27, 51, 0.3) 100%
            )
          `
        }}
      ></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 
                       backdrop-blur-3xl animate-float-${i + 1}`}
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `scale(${Math.random() * 0.5 + 0.8})`,
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
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
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.8})`,
              clipPath: i % 2 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'polygon(25% 0%, 100% 25%, 75% 100%, 0% 75%)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          />
        ))}
      </div>

      {/* Enhanced light effects */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-transparent animate-pulse"
        style={{
          filter: 'blur(100px)'
        }}
      ></div>
      
      {/* Enhanced glow effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/80 via-[#9b87f5]/40 to-transparent z-10 transition-all duration-500"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(26, 31, 44, 0.8) 0%,
              rgba(155, 135, 245, 0.4) 50%,
              rgba(217, 70, 239, 0.2) 100%
            )
          `
        }}
      ></div>
    </div>
  );
};

export default ThreeDBackground;
