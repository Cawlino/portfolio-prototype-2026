import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const HoverDeformImage = ({ children, className }) => {
  const containerRef = useRef(null);
  const imgWrapperRef = useRef(null);

  useEffect(() => {
    // QuickTo for high performance
    const tlTo = gsap.quickTo(containerRef.current, "borderTopLeftRadius", { ease: "power3.out", duration: 0.6 });
    const trTo = gsap.quickTo(containerRef.current, "borderTopRightRadius", { ease: "power3.out", duration: 0.6 });
    const brTo = gsap.quickTo(containerRef.current, "borderBottomRightRadius", { ease: "power3.out", duration: 0.6 });
    const blTo = gsap.quickTo(containerRef.current, "borderBottomLeftRadius", { ease: "power3.out", duration: 0.6 });
    
    // Scale and rotation for the inner content
    const contentTo = gsap.quickTo(imgWrapperRef.current, "scale", { ease: "power3.out", duration: 0.6 });
    const rotateTo = gsap.quickTo(imgWrapperRef.current, "rotate", { ease: "power3.out", duration: 0.6 });

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized mouse position (0 to 1) inside the element
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Base radius (16px / 1rem) + Dynamic radius based on proximity (up to 40% or heavily rounded)
      // We use percentages for a more fluid/organic look across different sizes
      const maxDeform = 45; // Max percentage
      const base = 3; // Base percentage (roughly resembles small border radius)
      
      // Proximity to corners
      const tl = base + (1 - x) * (1 - y) * maxDeform;
      const tr = base + (x) * (1 - y) * maxDeform;
      const br = base + (x) * (y) * maxDeform;
      const bl = base + (1 - x) * (y) * maxDeform;

      tlTo(`${tl}%`);
      trTo(`${tr}%`);
      brTo(`${br}%`);
      blTo(`${bl}%`);
      
      // Subtle rotation based on X position (-2deg to 2deg)
      rotateTo((x - 0.5) * 4);
    };

    const handleMouseEnter = () => {
      contentTo(1.1);
    };

    const handleMouseLeave = () => {
      // Reset back to normal
      tlTo("1rem");
      trTo("1rem");
      brTo("1rem");
      blTo("1rem");
      contentTo(1);
      rotateTo(0);
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden relative transform-gpu ${className}`}
      style={{ borderRadius: '1rem' }} // Base initial state
    >
      <div ref={imgWrapperRef} className="w-full h-full absolute inset-0 transform-gpu">
        {children}
      </div>
    </div>
  );
};
