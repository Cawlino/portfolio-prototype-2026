import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

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
    )
    .fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-12 lg:px-16 relative overflow-hidden"
    >
      <div className="max-w-[100rem] w-full relative z-10">
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter leading-none"
        >
          Transformamos<br/>ideias em experiências<br/>digitais.
        </h1>
        <p 
          ref={subtitleRef} 
          className="mt-8 text-xl md:text-3xl max-w-3xl font-light opacity-80"
        >
          Desenvolvemos landing pages de alta conversão, portfólios impactantes e sistemas web completos para impulsionar o seu negócio.
        </p>
        <div ref={buttonsRef} className="mt-12 flex flex-col sm:flex-row gap-4">
          <a 
            href="https://wa.me/554488680905?text=Olá,%20tenho%20interesse%20em%20iniciar%20um%20projeto!" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-center"
          >
            Iniciar projeto
          </a>
          <a 
            href="#projetos" 
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis) {
                window.lenis.scrollTo('#projetos', { duration: 1.2 });
              } else {
                document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 border border-white/30 hover:border-white/80 font-semibold rounded-full hover:scale-105 transition-all text-center cursor-pointer"
          >
            Ver trabalhos
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
        <span className="text-sm tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-current"></div>
      </div>
    </section>
  );
};
