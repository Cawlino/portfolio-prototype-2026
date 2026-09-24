import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Header = ({ onNavigate }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate both header layers simultaneously
    gsap.fromTo(containerRef.current.children,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div ref={containerRef}>

      {/* LAYER 1: Logo Only (No Blend Mode, purely visual) */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-0.5">
          <img 
            src="/logo-symbol.png" 
            alt="Vitrine Web" 
            className="h-6 md:h-7 w-auto object-contain"
          />
          <span className="font-bold text-xl tracking-tighter opacity-0 select-none">
            Vitrine Web
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium pr-16 opacity-0 select-none">
          <span>Projetos</span>
          <span>Sobre Nós</span>
          <span>Contato</span>
        </nav>
        <div className="md:hidden pr-16 font-medium text-sm tracking-widest uppercase opacity-0 select-none">
          Menu
        </div>
      </header>

      {/* LAYER 2: Text Only (Mix Blend Difference, handles clicks) */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div 
          className="flex items-center gap-0.5 group pointer-events-auto"
          data-cursor="hover"
          onClick={() => onNavigate('home', '#top')}
        >
          <img 
            src="/logo-symbol.png" 
            alt="" 
            className="h-6 md:h-7 w-auto object-contain opacity-0"
          />
          <span className="font-bold text-xl tracking-tighter group-hover:opacity-70 transition-opacity">
            Vitrine Web
          </span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium pr-16 pointer-events-auto">
          <button className="hover:opacity-60 transition-opacity" onClick={() => onNavigate('home', '#projetos')}>Projetos</button>
          <button className="hover:opacity-60 transition-opacity" onClick={() => onNavigate('home', '#sobre-nos')}>Sobre Nós</button>
          <button className="hover:opacity-60 transition-opacity" onClick={() => onNavigate('home', '#contato')}>Contato</button>
        </nav>
        
        <div 
          className="md:hidden pr-16 font-medium text-sm tracking-widest uppercase pointer-events-auto"
          data-cursor="hover"
        >
          Menu
        </div>
      </header>
    </div>
  );
};
