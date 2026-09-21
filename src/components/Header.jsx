import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Header = ({ onNavigate }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    // Animate header in on load
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
      <div 
        className="font-bold text-xl tracking-tighter cursor-pointer flex items-center gap-2"
        data-cursor="hover"
        onClick={() => onNavigate('home')}
      >
        <div className="w-4 h-4 bg-white rounded-full"></div>
        ANTIGRAVITY
      </div>
      
      <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium pr-16">
        <button data-cursor="hover" className="hover:opacity-60 transition-opacity" onClick={() => onNavigate('home')}>Projetos</button>
        <button data-cursor="hover" className="hover:opacity-60 transition-opacity">Serviços</button>
        <button data-cursor="hover" className="hover:opacity-60 transition-opacity">Contato</button>
      </nav>
      
      <div className="md:hidden pr-16 font-medium text-sm tracking-widest uppercase">
        Menu
      </div>
    </header>
  );
};
