import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HoverDeformImage } from './HoverDeformImage';

const projects = [
  {
    id: 'pacex',
    title: 'PaceX AI',
    description: 'PaceX Mobile é uma plataforma de treino inteligente completa. Através de inteligência artificial, o aplicativo atua como um personal trainer virtual, oferecendo análises profundas, evolução constante e insights personalizados.',
    image: '/pacex-mobile.png',
    features: ['Plataforma Completa', 'Personal Trainer IA', 'Análises Inteligentes'],
  },
  {
    id: 'adventista-play',
    title: 'Adventista Play',
    description: 'Aplicativo desenvolvido para promover o estudo diário (Escola Sabatina) com uma abordagem gamificada. O sistema de lições e XP incentiva a leitura constante por meio de uma interface fluida e de fácil uso.',
    images: ['/adventista-mobile.jpg', '/adventista-mobile-2.jpg', '/adventista-mobile-3.jpg'],
    features: ['Sistema de Progresso', 'UI Mobile Limpa', 'Lições Diárias'],
  },
  {
    id: 'dentista-cassiano',
    title: 'Dr. Cassiano',
    description: 'Página institucional de alta conversão para clínica odontológica. Transmite 31 anos de autoridade com design limpo, galeria interativa de antes/depois e otimização para agendamentos via WhatsApp.',
    image: '/dentista-cassiano.png',
    features: ['Design Institucional', 'Slider Interativo', 'Alta Conversão'],
  }
];

export const Showcase = ({ onNavigate }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const rows = containerRef.current.querySelectorAll('.project-row');
    
    rows.forEach((row) => {
      const innerImage = row.querySelector('.parallax-img');
      const text = row.querySelector('.project-text');

      if (innerImage) {
        gsap.fromTo(innerImage,
          { scale: 1 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

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
          <div key={project.id} className="project-row max-w-[100rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-stretch">
            
            <div className={`project-text flex flex-col items-start justify-between ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
              <div>
                <div className="text-xs font-bold tracking-widest uppercase mb-4 opacity-50 pt-2">0{index + 1} / 0{projects.length}</div>
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
              </div>

              <button 
                data-cursor="hover"
                onClick={() => onNavigate('project', project.id)}
                className="mt-auto px-6 py-3 md:px-8 md:py-4 border border-current rounded-full uppercase tracking-widest text-xs md:text-sm hover:bg-[#1E293B] hover:text-[#F0F4F8] transition-colors duration-300"
              >
                Ver Estudo de Caso
              </button>
            </div>

            <div className={`w-full min-h-[400px] flex ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
              <HoverDeformImage 
                outerClassName={`project-image-container relative w-full h-full overflow-hidden rounded-2xl`}
                innerClassName="bg-zinc-900 shadow-2xl w-full h-full flex items-center justify-center overflow-hidden"
              >
                {project.images ? (
                  <div className="w-full h-full flex items-center justify-center gap-2 md:gap-4 p-4 md:p-8 bg-zinc-800">
                    {project.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className={`w-[30%] max-w-[200px] aspect-[9/16] object-cover rounded-xl md:rounded-2xl shadow-xl transform transition-all duration-500 ${
                          idx === 1 ? 'scale-110 z-10 -translate-y-4' : 'scale-95 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                ) : (
                  <img  
                    src={project.image} 
                    alt={project.title} 
                    className="parallax-img w-full h-full object-cover object-center"
                  />
                )}
              </HoverDeformImage>
            </div>

          </div>
        );
      })}
    </section>
  );
};
