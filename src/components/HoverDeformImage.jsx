import React, { useRef } from 'react';
import gsap from 'gsap';

export const HoverDeformImage = ({ children, outerClassName, innerClassName }) => {
  const containerRef = useRef(null);
  const imgWrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !imgWrapperRef.current) return;
    
    // We calculate from the static hit area (e.currentTarget) so it never flickers!
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Normalize coordinates between 0 and 1
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const maxDeform = 45; // Máximo de deformação em %
    const base = 5;       // Base em %
    
    // Calcula o peso de cada canto
    const tl = base + (1 - x) * (1 - y) * maxDeform;
    const tr = base + x * (1 - y) * maxDeform;
    const br = base + x * y * maxDeform;
    const bl = base + (1 - x) * y * maxDeform;

    gsap.to(containerRef.current, {
      borderTopLeftRadius: `${tl}%`,
      borderTopRightRadius: `${tr}%`,
      borderBottomRightRadius: `${br}%`,
      borderBottomLeftRadius: `${bl}%`,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });

    gsap.to(imgWrapperRef.current, {
      rotate: (x - 0.5) * 4,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseEnter = () => {
    if (!imgWrapperRef.current) return;
    gsap.to(imgWrapperRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current || !imgWrapperRef.current) return;
    gsap.to(containerRef.current, {
      borderRadius: "1rem", // Volta ao normal
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });
    gsap.to(imgWrapperRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  return (
    <div className={`relative ${outerClassName || ''}`}>
      {/* Deforming Element */}
      <div 
        ref={containerRef} 
        className={`overflow-hidden relative w-full h-full transform-gpu ${innerClassName || ''}`}
        style={{ borderRadius: '1rem' }}
      >
        <div ref={imgWrapperRef} className="w-full h-full absolute inset-0 transform-gpu">
          {children}
        </div>
      </div>
      
      {/* Invisible Static Hit Area */}
      {/* Prevents flicker because this box never changes size/shape when hovered */}
      <div 
        className="absolute inset-0 z-20 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};
