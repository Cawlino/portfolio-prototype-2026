import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverDeformImage } from './HoverDeformImage';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'pacex',
    title: 'PaceX AI',
    description: 'Um personal trainer virtual integrado em um aplicativo nativo completo. A inteligência artificial de ponta do PaceX aumenta a retenção e o engajamento ao oferecer análises profundas e evolução constante para seus usuários.',
    image: '/pacex-mobile.png',
    features: ['Ecossistema Nativo', 'Treinador com IA', 'Retenção e Engajamento'],
  },
  {
    id: 'adventista-play',
    title: 'Adventista Play',
    description: 'Transformando o estudo diário em um hábito irresistível através da gamificação. Inspirado nos maiores líderes SaaS, este app maximiza o retorno contínuo dos usuários usando XP, lições modulares e sistema de ofensivas (streaks).',
    images: ['/adventista-mobile.jpg', '/adventista-mobile-2.jpg', '/adventista-mobile-3.jpg'],
    features: ['Sistemas Gamificados', 'Engajamento de Usuário', 'Lições Diárias Estruturadas'],
  },
  {
    id: 'dentista-cassiano',
    title: 'Dr. Cassiano',
    description: 'Página de alta conversão projetada para consultórios de excelência. Transmite as 3 décadas de autoridade e captura leads ativamente via WhatsApp, convertendo visitantes em pacientes qualificados através de prova social.',
    image: '/dentista-cassiano.png',
    features: ['Landing Page de Conversão', 'Estratégia de Lead Capture', 'Credibilidade e UI Clean'],
  }
];

export const Showcase = ({ onNavigate, returnToProjectId }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const scrollTweenRef = useRef(null);
  
  const activeIdxRef = useRef(0);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const scrollToIdx = (idx) => {
    if (!scrollTweenRef.current || !scrollTweenRef.current.scrollTrigger) return;
    const st = scrollTweenRef.current.scrollTrigger;
    const total = projects.length - 1;
    const targetY = st.start + (idx / total) * (st.end - st.start);
    
    if (window.lenis) {
      window.lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (activeIdxRef.current < projects.length - 1) {
      scrollToIdx(activeIdxRef.current + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdxRef.current > 0) {
      scrollToIdx(activeIdxRef.current - 1);
    }
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop - Scroll Horizontal via GSAP
      const sections = gsap.utils.toArray('.project-row');
      
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.3, max: 0.8 },
            delay: 0.2,
            ease: "power1.inOut",
            directional: false
          },
          end: () => "+=" + wrapperRef.current.offsetWidth,
          onUpdate: (self) => {
            const newIdx = Math.round(self.progress * (sections.length - 1));
            activeIdxRef.current = newIdx;
            
            if (prevBtnRef.current) {
              const isStart = self.progress <= 0.05;
              prevBtnRef.current.style.opacity = isStart ? '0' : '1';
              prevBtnRef.current.style.transform = isStart ? 'translateX(-16px)' : 'translateX(0)';
              prevBtnRef.current.style.pointerEvents = isStart ? 'none' : 'auto';
            }
            if (nextBtnRef.current) {
              const isEnd = self.progress >= 0.95;
              nextBtnRef.current.style.opacity = isEnd ? '0' : '1';
              nextBtnRef.current.style.transform = isEnd ? 'translateX(16px)' : 'translateX(0)';
              nextBtnRef.current.style.pointerEvents = isEnd ? 'none' : 'auto';
            }
          }
        }
      });
      
      scrollTweenRef.current = scrollTween;

      // EXACT JUMP FOR DESKTOP
      if (returnToProjectId) {
        const idx = projects.findIndex(p => p.id === returnToProjectId);
        if (idx > 0) {
          // Wait for GSAP to fully calculate bounds
          setTimeout(() => {
            const st = scrollTween.scrollTrigger;
            if (st) {
              const targetY = st.start + (idx / (sections.length - 1)) * (st.end - st.start);
              if (window.lenis) {
                window.lenis.scrollTo(targetY, { immediate: true });
              } else {
                window.scrollTo(0, targetY);
              }
            }
          }, 100);
        }
      }

      sections.forEach((row, index) => {
        const innerImage = row.querySelector('.parallax-img');
        const text = row.querySelector('.project-text');

        if (innerImage) {
          gsap.fromTo(innerImage,
            { scale: 1 },
            {
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: index === 0 ? containerRef.current : row,
                containerAnimation: index === 0 ? null : scrollTween,
                start: index === 0 ? "top bottom" : "left right",
                end: index === 0 ? "bottom top" : "right left",
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
              trigger: index === 0 ? containerRef.current : row,
              containerAnimation: index === 0 ? null : scrollTween,
              start: index === 0 ? "top 70%" : "left center",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      return () => {
        if (scrollTween) scrollTween.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile - Scroll vertical natural
      const sections = gsap.utils.toArray('.project-row');

      // EXACT JUMP FOR MOBILE (vertical)
      if (returnToProjectId) {
        const idx = projects.findIndex(p => p.id === returnToProjectId);
        if (idx > 0) {
          setTimeout(() => {
            const targetEl = sections[idx];
            if (targetEl) {
              const rect = targetEl.getBoundingClientRect();
              const targetY = window.scrollY + rect.top;
              
              if (window.lenis) {
                window.lenis.scrollTo(targetY, { immediate: true });
              } else {
                window.scrollTo(0, targetY);
              }
            }
          }, 100);
        }
      }

      sections.forEach((row, index) => {
        const innerImage = row.querySelector('.parallax-img');
        const text = row.querySelector('.project-text');

        if (innerImage) {
          gsap.fromTo(innerImage,
            { scale: 0.95, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: index === 0 ? "top 95%" : "top 85%",
                end: "center center",
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
              trigger: row,
              start: index === 0 ? "top 95%" : "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      id="projetos"
      ref={containerRef} 
      className="w-full h-auto md:h-[100vh] overflow-x-hidden md:overflow-hidden relative"
    >
      {/* Navigation Arrows (Desktop Only) */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 lg:px-8 pointer-events-none z-50">
        <button 
          ref={prevBtnRef}
          onClick={handlePrev}
          className="opacity-0 -translate-x-4 pointer-events-none flex items-center justify-center gap-3 px-6 h-12 lg:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white shadow-2xl transition-all duration-300 hover:bg-white/40 hover:scale-105"
          aria-label="Projeto anterior"
          data-cursor="hover"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span className="text-sm font-bold tracking-widest uppercase">Anterior</span>
        </button>
        <button 
          ref={nextBtnRef}
          onClick={handleNext}
          className="opacity-100 translate-x-0 pointer-events-auto flex items-center justify-center gap-3 px-6 h-12 lg:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white shadow-2xl transition-all duration-300 hover:bg-white/40 hover:scale-105"
          aria-label="Próximo projeto"
          data-cursor="hover"
        >
          <span className="text-sm font-bold tracking-widest uppercase">Ver mais projetos</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <div 
        ref={wrapperRef} 
        className="flex flex-col md:flex-row flex-nowrap w-full md:w-[calc(100vw*3)] h-full"
      >
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={project.id} 
              className="project-row relative w-full md:w-screen h-auto md:h-screen shrink-0 flex items-center justify-center px-4 py-24 md:py-0 md:px-12 lg:px-16 border-b border-white/5 md:border-none last:border-none"
            >
              <div className="max-w-[100rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-stretch">
                
                <div className={`project-text flex flex-col items-start justify-between h-full py-10 lg:py-0 ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
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
                    className="mt-auto md:mt-10 px-6 py-3 md:px-8 md:py-4 border border-current rounded-full uppercase tracking-widest text-xs md:text-sm hover:bg-[#1E293B] hover:text-[#F0F4F8] transition-colors duration-300"
                  >
                    Ver Estudo de Caso
                  </button>
                </div>

                <div className={`w-full h-[50vh] lg:h-full flex ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
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
                            className={`w-[30%] max-w-[200px] aspect-[9/16] object-contain rounded-xl md:rounded-2xl shadow-xl transform transition-all duration-500 ${
                              idx === 1 ? 'scale-110 z-10 -translate-y-4' : 'scale-95 opacity-70 hover:opacity-100 hover:scale-105'
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <img  
                        src={project.image} 
                        alt={project.title} 
                        className="parallax-img w-full h-full object-contain object-center p-4 md:p-8"
                      />
                    )}
                  </HoverDeformImage>
                </div>

              </div>
              <button
                onClick={() => {
                  const nextSection = document.getElementById('sobre-nos');
                  if (nextSection) {
                    if (window.lenis) {
                      window.lenis.scrollTo(nextSection, { offset: 0, duration: 1.2 });
                    } else {
                      nextSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 px-6 md:px-8 py-3 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-zinc-800 transition-all duration-300 hover:scale-105 z-10"
                data-cursor="hover"
                aria-label="Ir para a próxima seção"
              >
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Conheça a equipe</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
