import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen flex flex-col justify-center items-center px-6 relative"
    >
      <div className="max-w-5xl w-full">
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-tight"
        >
          Elevando<br/>Conversões.
        </h1>
        <p 
          ref={subtitleRef} 
          className="mt-6 text-xl md:text-2xl max-w-2xl font-light opacity-80"
        >
          Protótipos de alta fidelidade e sistemas avançados de prospecção de leads, desenhados para impressionar e converter.
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
        <span className="text-sm tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-current"></div>
      </div>
    </section>
  );
};
