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
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center">
      
      <div 
        className="cursor-pointer flex items-center gap-0.5 group"
        data-cursor="hover"
        onClick={() => onNavigate('home')}
      >
        <img 
          src="/logo-symbol.png" 
          alt="Vitrine Web" 
          className="h-6 md:h-7 w-auto object-contain"
        />
        <span className="font-bold text-xl tracking-tighter text-[#1E293B] group-hover:opacity-70 transition-opacity">
          Vitrine Web
        </span>
      </div>
      
      <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium pr-16 mix-blend-difference text-white">
        <button data-cursor="hover" className="hover:opacity-60 transition-opacity" onClick={() => onNavigate('home')}>Projetos</button>
        <button data-cursor="hover" className="hover:opacity-60 transition-opacity">Serviços</button>
        <button data-cursor="hover" className="hover:opacity-60 transition-opacity">Contato</button>
      </nav>
      
      <div className="md:hidden pr-16 font-medium text-sm tracking-widest uppercase cursor-pointer mix-blend-difference text-white">
        Menu
      </div>
    </header>
  );
};
