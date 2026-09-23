import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projectDetails = {
  'pacex': {
    title: 'PACEX',
    subtitle: 'AI',
    image: '/pacex-mobile.png',
    description: 'Transforme a maneira como seus usuários treinam com o PaceX AI. Desenvolvido do zero como um aplicativo nativo robusto, ele integra Inteligência Artificial avançada para atuar como um personal trainer virtual e inteligente. Uma plataforma escalável que eleva a retenção de alunos através de insights personalizados, evolução constante e uma interface imersiva. A tecnologia ideal para negócios fitness que desejam oferecer uma experiência premium e automatizada.',
    client: 'PaceX',
    services: 'App Mobile Nativo, Inteligência Artificial',
    technologies: 'React Native, Expo, Tailwind, React Query, RevenueCat',
    aspect: 'aspect-video w-full'
  },
  'adventista-play': {
    title: 'ADVENTISTA',
    subtitle: 'PLAY',
    image: '/adventista-mobile.jpg',
    description: 'Crie engajamento real e recorrente com o Adventista Play. Utilizamos a ciência da gamificação para transformar o estudo em um hábito diário viciante. Com sistemas de ofensivas (streaks), acúmulo de XP e estruturação de lições modulares, o aplicativo maximiza a taxa de retorno dos usuários. Uma arquitetura escalável e focada em resultados, perfeita para instituições e empresas que buscam revolucionar a aprendizagem e retenção na era digital.',
    client: 'Adventista Play',
    services: 'Mobile App, Gamificação, SaaS',
    technologies: 'React Native, Expo, Supabase, Tailwind',
    aspect: 'aspect-[9/16] w-full max-w-[350px] mx-auto'
  },
  'dentista-cassiano': {
    title: 'DR.',
    subtitle: 'CASSIANO',
    image: '/dentista-cassiano.png',
    description: 'Aumente o fluxo de pacientes do seu consultório com uma Landing Page de alta conversão. O projeto para o Dr. Cassiano foi estrategicamente desenhado para transmitir credibilidade absoluta (31 anos de experiência) e capturar leads de forma direta para o WhatsApp. Com elementos visuais de impacto, como o comparador Antes/Depois interativo, sua clínica se destaca na internet, transformando visitantes em pacientes reais de alto valor.',
    client: 'Dr. Cassiano Martins Gomes',
    services: 'Web Design, Landing Page de Conversão',
    technologies: 'React, Vite, CSS, React Router',
    aspect: 'aspect-video w-full'
  }
};

export const ProjectDetail = ({ projectId, onNavigate }) => {
  const containerRef = useRef(null);
  const project = projectDetails[projectId] || projectDetails['pacex'];

  useEffect(() => {
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
