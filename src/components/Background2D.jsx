import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Background2D = () => {
  const bgRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax and color shifting based on scroll
    gsap.to(circle1Ref.current, {
      yPercent: 50,
      scale: 1.5,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    gsap.to(circle2Ref.current, {
      yPercent: -50,
      xPercent: 30,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      }
    });

    gsap.to(textRef.current, {
      xPercent: -50,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 2
      }
    });

  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50">
      {/* Huge background text */}
      <div 
        ref={textRef} 
        className="absolute top-[30%] left-[10%] text-[20vw] font-bold text-slate-200/50 whitespace-nowrap tracking-tighter"
      >
        PROTOTYPE
      </div>

      {/* Blurry gradient circles */}
      <div 
        ref={circle1Ref}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
      ></div>
      <div 
        ref={circle2Ref}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-60"
      ></div>
    </div>
  );
};
