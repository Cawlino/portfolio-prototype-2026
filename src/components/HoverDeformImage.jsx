import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const HoverDeformImage = ({ children, outerClassName, innerClassName }) => {
  const containerRef = useRef(null);
  const imgWrapperRef = useRef(null);
  
  // Store the GSAP quickTo functions for maximum performance
  const anims = useRef({});

  useEffect(() => {
    if (!containerRef.current || !imgWrapperRef.current) return;
    
    // gsap.quickTo is highly optimized for mousemove events.
    // It avoids creating new objects/tweens 60x a second.
    anims.current.tl = gsap.quickTo(containerRef.current, "borderTopLeftRadius", { duration: 0.4, ease: "power3.out" });
    anims.current.tr = gsap.quickTo(containerRef.current, "borderTopRightRadius", { duration: 0.4, ease: "power3.out" });
    anims.current.br = gsap.quickTo(containerRef.current, "borderBottomRightRadius", { duration: 0.4, ease: "power3.out" });
    anims.current.bl = gsap.quickTo(containerRef.current, "borderBottomLeftRadius", { duration: 0.4, ease: "power3.out" });
    
    anims.current.rot = gsap.quickTo(imgWrapperRef.current, "rotation", { duration: 0.4, ease: "power3.out" });
  }, []);

  const handleMouseMove = (e) => {
    if (!anims.current.tl) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const base = 16; // 16 pixels (1rem)
    const maxDeform = rect.width * 0.35; // 35% of the element's width in pixels
    
    const tl = base + (1 - x) * (1 - y) * maxDeform;
    const tr = base + x * (1 - y) * maxDeform;
    const br = base + x * y * maxDeform;
    const bl = base + (1 - x) * y * maxDeform;

    // Call the quickTo functions with raw pixel numbers
    anims.current.tl(tl);
    anims.current.tr(tr);
    anims.current.br(br);
    anims.current.bl(bl);
    
    anims.current.rot((x - 0.5) * 4);
  };

  const handleMouseEnter = () => {
    if (!imgWrapperRef.current) return;
    // Overwrite true forces any conflicting tweens to stop immediately
    gsap.to(imgWrapperRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true
    });
  };

  const handleMouseLeave = () => {
    if (!anims.current.tl) return;
    
    // Use quickTo to reset borders and rotation efficiently
    anims.current.tl(16);
    anims.current.tr(16);
    anims.current.br(16);
    anims.current.bl(16);
    anims.current.rot(0);
    
    gsap.to(imgWrapperRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true
    });
  };

  return (
    <div className={`relative ${outerClassName || ''}`}>
      <div 
        ref={containerRef} 
        className={`overflow-hidden relative w-full h-full transform-gpu ${innerClassName || ''}`}
        style={{ borderRadius: '16px' }}
      >
        <div ref={imgWrapperRef} className="w-full h-full absolute inset-0 transform-gpu">
          {children}
        </div>
      </div>
      
      {/* Invisible Static Hit Area */}
      <div 
        className="absolute inset-0 z-20 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};
