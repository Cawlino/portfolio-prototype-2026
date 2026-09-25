import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run on devices that support hover (no touch)
    if (!window.matchMedia("(any-hover: hover)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;
    
    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      // Use GSAP quickTo for performance
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Hover effect for links and buttons
    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 });
    };
    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Delegate events for hover elements
    const attachHoverEvents = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    attachHoverEvents();

    // Re-attach if DOM changes (simplified for prototype)
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block"></div>;
};
