import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HoverDeformImage } from './HoverDeformImage';

const projects = [
  {
    id: 'project-1',
    title: 'Nexus Data Scraping',
    description: 'Arquitetura de extração de dados em massa para identificar leads B2B no LinkedIn e diretórios corporativos. Reduziu o tempo de prospecção em 85%.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    features: ['Python & BeautifulSoup', 'Integração CRM Automática', 'Dashboards Analíticos']
  },
  {
    id: 'project-2',
    title: 'Aura Fintech UI',
    description: 'Um redesign completo da experiência do usuário para um app de pagamentos. Interface minimalista com feedback tátil e microinterações fluidas.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop',
    features: ['React Native', 'Animações 60fps', 'Aumento de 40% em Conversão']
  },
  {
    id: 'project-3',
    title: 'Echo E-commerce',
    description: 'Plataforma de e-commerce headless focada em performance brutal e SEO. Navegação sem transições de carregamento perceptíveis.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    features: ['Next.js', 'Integração Shopify', 'Edge Computing']
  },
  {
    id: 'project-4',
    title: 'Lumina Analytics',
    description: 'Dashboard de visualização de dados complexos transformados em gráficos interativos e fáceis de digerir. Tomada de decisão rápida e baseada em fatos.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    features: ['D3.js', 'Data Storytelling', 'Modo Escuro Dinâmico']
  }
];

export const Showcase = ({ onNavigate }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const rows = containerRef.current.querySelectorAll('.project-row');
    
    rows.forEach((row) => {
      const imageContainer = row.querySelector('.project-image-container');
      const text = row.querySelector('.project-text');

      gsap.fromTo(imageContainer,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      gsap.fromTo(text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-32 w-full flex flex-col gap-32 md:gap-48 px-4 md:px-12 lg:px-16 overflow-hidden">
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div key={project.id} className="project-row max-w-[100rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            
            <div className={`project-text flex flex-col items-start ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
              <div className="text-xs font-bold tracking-widest uppercase mb-4 opacity-50">0{index + 1} / 0{projects.length}</div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">{project.title}</h2>
              <p className="text-base md:text-lg opacity-80 mb-8 leading-relaxed max-w-xl">
                {project.description}
              </p>
              
              <ul className="space-y-4 mb-10 w-full max-w-md">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base">
                    <div className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></div>
                    <span className="opacity-90">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                data-cursor="hover"
                onClick={() => onNavigate('project', project.id)}
                className="px-6 py-3 md:px-8 md:py-4 border border-current rounded-full uppercase tracking-widest text-xs md:text-sm hover:bg-[#1E293B] hover:text-[#F0F4F8] transition-colors duration-300"
              >
                Ver Estudo de Caso
              </button>
            </div>

            <div className={`w-full ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
              <HoverDeformImage className="project-image-container bg-slate-200 shadow-2xl aspect-[4/3] md:aspect-[16/10] w-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-[120%] h-[120%] ml-[-10%] mt-[-10%] object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-4/5 h-4/5 border border-white/20 rounded-xl bg-black/10 backdrop-blur-md flex flex-col p-4 shadow-2xl">
                    <div className="flex gap-2 mb-4">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-400"></div>
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 rounded border border-white/10 bg-white/10"></div>
                  </div>
                </div>
              </HoverDeformImage>
            </div>

          </div>
        );
      })}
    </section>
  );
};
