import React, { useRef } from 'react';
import gsap from 'gsap';

export const HoverDeformImage = ({ children, className }) => {
  const containerRef = useRef(null);
  const imgWrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !imgWrapperRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
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

    // Usando gsap.to normal (overwrite: auto resolve concorrências)
    // Isso evita o erro do quickTo que não suporta unidades dinâmicas em string.
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
    <div 
      ref={containerRef} 
      className={`overflow-hidden relative transform-gpu cursor-pointer ${className}`}
      style={{ borderRadius: '1rem' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={imgWrapperRef} className="w-full h-full absolute inset-0 transform-gpu">
        {children}
      </div>
    </div>
  );
};
