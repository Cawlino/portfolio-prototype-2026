import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TransitionOverlay = ({ isActive }) => {
  const overlayRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    // Kill any ongoing animation
    if (tl.current) tl.current.kill();

    if (isActive) {
      // Animate IN from bottom to cover screen
      gsap.set(overlayRef.current, { yPercent: 100 });
      tl.current = gsap.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.inOut"
      });
    } else {
      // Only animate OUT if we are currently at 0 (covering screen)
      const currentY = gsap.getProperty(overlayRef.current, "yPercent");
      if (currentY !== 100) {
        tl.current = gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.45,
          ease: "power3.inOut"
        });
      } else {
        // Otherwise, stay hidden at the bottom (initial load)
        gsap.set(overlayRef.current, { yPercent: 100 });
      }
    }
  }, [isActive]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed top-0 left-0 w-full h-full z-[100] bg-[#0A0D14] pointer-events-none flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center opacity-90">
        <img 
          src="/logo-symbol.png" 
          alt="Vitrine Web Logo" 
          className="w-24 md:w-36 h-auto object-contain mb-6" 
          style={{ filter: 'brightness(0) invert(1) drop-shadow(0px 8px 16px rgba(0,0,0,0.6))' }}
        />
        <span 
          className="font-black text-3xl md:text-5xl tracking-tighter uppercase text-white"
          style={{ textShadow: '0px 8px 16px rgba(0,0,0,0.6)' }}
        >
          Vitrine Web
        </span>
      </div>
    </div>
  );
};
