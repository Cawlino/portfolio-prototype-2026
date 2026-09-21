import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Plataforma de Scraping & Leads",
    description: "Desenvolvemos um sistema inteligente capaz de varrer a internet e encontrar os leads mais qualificados para o seu negócio. Interface moderna, rápida e focada em resultados reais.",
    features: ["Busca automatizada em tempo real", "Enriquecimento de dados (Email, Telefone)", "Exportação simplificada para CRM"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Dashboard Analítico B2B",
    description: "Painel de controle focado em visualização de dados em massa. Permite que gestores tomem decisões rapidamente baseados em gráficos dinâmicos de alta performance.",
    features: ["Gráficos em tempo real com WebGL", "Filtros avançados e cruzamento de dados", "Integração via API com múltiplos ERPs"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "E-commerce Headless B2B",
    description: "Nova arquitetura de loja virtual descolada do frontend. Permite navegação instantânea e uma experiência de usuário comparável a aplicativos nativos.",
    features: ["Arquitetura Headless com Next.js", "Checkout em 1 clique", "Animações fluidas entre páginas"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "CRM Customizado para Vendas",
    description: "Um CRM feito sob medida para gerenciar o funil de vendas dos leads prospectados. O sistema acompanha cada interação do usuário com a marca.",
    features: ["Kanban interativo e arrastável", "Automação de e-mails de follow-up", "Histórico de atividades em tempo real"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  }
];

export const Showcase = ({ onNavigate }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // We get all project rows and animate them on scroll
    const rows = containerRef.current.querySelectorAll('.project-row');
    
    rows.forEach((row) => {
      const image = row.querySelector('.project-image');
      const text = row.querySelector('.project-text');

      // Parallax effect on the image
      gsap.fromTo(image,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Text reveal
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
    <section ref={containerRef} className="py-20 md:py-32 px-6 w-full flex flex-col gap-32 md:gap-48">
      {projects.map((project, index) => {
        // Alternate layout: even indexes have text on left, odd have text on right
        const isEven = index % 2 === 0;
        
        return (
          <div key={project.id} className="project-row max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            <div className={`project-text flex flex-col items-start ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
              <div className="text-xs font-bold tracking-widest uppercase mb-4 opacity-50">0{index + 1} / 0{projects.length}</div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">{project.title}</h2>
              <p className="text-base md:text-lg opacity-80 mb-8 leading-relaxed max-w-lg">
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
                className="px-6 py-3 md:px-8 md:py-4 border border-current rounded-full uppercase tracking-widest text-xs md:text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 mix-blend-difference"
              >
                Ver Estudo de Caso
              </button>
            </div>

            <div className={`project-image-container overflow-hidden rounded-2xl aspect-[4/3] bg-zinc-800 relative shadow-2xl w-full ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
              <div className="project-image absolute inset-[-10%] w-[120%] h-[120%]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-70"
                />
                {/* Mockup Overlay Elements to give a "Prototype" feel */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-4/5 h-4/5 border border-white/20 rounded-xl bg-black/20 backdrop-blur-sm flex flex-col p-4 shadow-2xl">
                    <div className="flex gap-2 mb-4">
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 rounded border border-white/10 bg-white/5"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </section>
  );
};
