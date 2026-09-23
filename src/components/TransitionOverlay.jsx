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
      className="fixed inset-0 z-[100] bg-[#0A0D14] pointer-events-none translate-y-full flex items-center justify-center"
    >
      <div className="w-48 md:w-64">
        <img 
          src="/logo-vitrine-web.png" 
          alt="Vitrine Web Loading" 
          className="w-full h-auto animate-pulse" 
        />
      </div>
    </div>
  );
};
