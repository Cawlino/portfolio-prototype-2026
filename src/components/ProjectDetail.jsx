import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projectDetails = {
  'pacex': {
    title: 'PACEX',
    subtitle: 'AI',
    image: '/pacex-mobile.png',
    description: 'O PaceX Mobile é uma plataforma de treino inteligente e completa. Através de inteligência artificial avançada, o app atua como um personal trainer virtual, oferecendo insights, evolução constante e análises profundas para os atletas, tudo em uma interface altamente imersiva.',
    client: 'PaceX',
    services: 'App Mobile, Inteligência Artificial',
    technologies: 'React Native, Expo, Node.js',
    aspect: 'aspect-video w-full'
  },
  'adventista-play': {
    title: 'ADVENTISTA',
    subtitle: 'PLAY',
    image: '/adventista-mobile.jpg',
    description: 'Um aplicativo educacional gamificado, focado no estudo diário da Escola Sabatina. Inspirado no Duolingo, desenvolvemos recursos como ofensivas, XP e lições modulares. O design da aba de Lições foi pensado para oferecer uma interface limpa que não distrai o momento de devoção.',
    client: 'Adventista Play',
    services: 'Mobile App, Gamificação',
    technologies: 'Expo, React Native',
    aspect: 'aspect-[9/16] w-full max-w-[350px] mx-auto'
  },
  'dentista-cassiano': {
    title: 'DR.',
    subtitle: 'CASSIANO',
    image: '/dentista-cassiano.png',
    description: 'Landing page projetada para o Dr. Cassiano Martins Gomes, com foco na captação de pacientes e transmissão de autoridade. A interface limpa evidencia os 31 anos de experiência clínica, contando com componentes interativos como o comparador "Antes e Depois" e direcionamento ágil para o WhatsApp.',
    client: 'Dr. Cassiano Martins Gomes',
    services: 'Web Design, Landing Page',
    technologies: 'React, Vite, CSS3',
    aspect: 'aspect-video w-full'
  }
};

export const ProjectDetail = ({ projectId, onNavigate }) => {
  const containerRef = useRef(null);
  const project = projectDetails[projectId] || projectDetails['pacex'];

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

      <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 leading-none uppercase text-center md:text-left">
        {project.title}<br/>{project.subtitle}.
      </h1>

      <div className={`${project.aspect} bg-zinc-800 rounded-2xl overflow-hidden relative shadow-2xl mb-16`}>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-lg opacity-80 mb-32 font-light">
        <div className="md:col-span-2 text-xl md:text-3xl leading-relaxed">
          {project.description}
        </div>
        <div className="flex flex-col gap-6 text-sm uppercase tracking-widest">
          <div>
            <strong className="block mb-2 opacity-50">Cliente</strong>
            <span>{project.client}</span>
          </div>
          <div>
            <strong className="block mb-2 opacity-50">Serviços</strong>
            <span>{project.services}</span>
          </div>
          <div>
            <strong className="block mb-2 opacity-50">Tecnologias</strong>
            <span>{project.technologies}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
