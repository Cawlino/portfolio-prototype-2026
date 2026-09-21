import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TransitionOverlay = ({ isActive, onTransitionComplete }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Animate In (Curtain drops down or sweeps across)
      const tl = gsap.timeline({
        onComplete: () => {
          if (onTransitionComplete) onTransitionComplete();
          // After switching the view, animate out
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.1
          });
        }
      });

      // Reset position to bottom
      gsap.set(overlayRef.current, { yPercent: 100 });
      
      // Sweep up to cover screen
      tl.to(overlayRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.inOut"
      });
    }
  }, [isActive, onTransitionComplete]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[100] bg-black pointer-events-none translate-y-full"
    >
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-6xl font-bold tracking-tighter">
        <span className="animate-pulse">Carregando...</span>
      </div>
    </div>
  );
};
