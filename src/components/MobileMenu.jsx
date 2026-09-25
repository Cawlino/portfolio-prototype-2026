import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
  const containerRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(containerRef.current,
        { clipPath: "circle(0% at top right)" },
        { clipPath: "circle(150% at top right)", duration: 0.8, ease: "power3.inOut" }
      );
      
      gsap.fromTo(linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(containerRef.current,
        { clipPath: "circle(0% at top right)", duration: 0.6, ease: "power3.inOut" }
      );
    }
  }, [isOpen]);

  const handleNavigate = (path, hash) => {
    onClose();
    setTimeout(() => {
      onNavigate(path, hash);
    }, 600); // wait for animation out
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#0F172A] z-[45] flex flex-col items-center justify-center pointer-events-auto"
      style={{ clipPath: "circle(0% at top right)" }}
    >
      <nav className="flex flex-col gap-10 text-center">
        <button 
          ref={el => linksRef.current[0] = el}
          onClick={() => handleNavigate('home', '#projetos')}
          className="text-4xl font-bold text-white uppercase tracking-widest"
        >
          Projetos
        </button>
        <button 
          ref={el => linksRef.current[1] = el}
          onClick={() => handleNavigate('home', '#sobre-nos')}
          className="text-4xl font-bold text-white uppercase tracking-widest"
        >
          Sobre Nós
        </button>
        <button 
          ref={el => linksRef.current[2] = el}
          onClick={() => handleNavigate('home', '#contato')}
          className="text-4xl font-bold text-white uppercase tracking-widest"
        >
          Contato
        </button>
      </nav>
    </div>
  );
};
