import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ProjectDetail = ({ projectId, onNavigate }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top when mounting
    window.scrollTo(0, 0);

    gsap.fromTo(containerRef.current.children, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 px-6 max-w-7xl mx-auto flex flex-col">
      <button 
        data-cursor="hover"
        onClick={() => onNavigate('home')}
        className="self-start mb-12 text-sm uppercase tracking-widest font-bold border-b border-current pb-1 hover:opacity-50 transition-opacity"
      >
        ← Voltar para Projetos
      </button>

      <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
        ESTUDO DE<br/>CASO 0{projectId}.
      </h1>

      <div className="w-full aspect-video bg-zinc-800 rounded-2xl overflow-hidden relative shadow-2xl mb-16">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
          alt="Project Cover" 
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-2xl font-light tracking-widest">Vídeo / Demonstração aqui</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-lg opacity-80 mb-32 font-light">
        <div className="md:col-span-2 text-xl md:text-3xl leading-relaxed">
          Este é o detalhamento do projeto. Aqui você explicaria qual era o problema do lead, qual foi a estratégia de design/desenvolvimento e os resultados alcançados com o protótipo.
        </div>
        <div className="flex flex-col gap-6 text-sm uppercase tracking-widest">
          <div>
            <strong className="block mb-2 opacity-50">Cliente</strong>
            <span>Empresa Confidencial</span>
          </div>
          <div>
            <strong className="block mb-2 opacity-50">Serviços</strong>
            <span>Scraping, UI/UX, Protótipo</span>
          </div>
          <div>
            <strong className="block mb-2 opacity-50">Tecnologias</strong>
            <span>React, Python, Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
};
