import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HoverDeformImage } from './HoverDeformImage';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const profilesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        }
      }
    );

    profilesRef.current.forEach((profile, index) => {
      const innerImage = profile.querySelector('.parallax-img');
      const content = profile.querySelector('.profile-content');

      gsap.fromTo(innerImage,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: profile,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      gsap.fromTo(content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: profile,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !profilesRef.current.includes(el)) {
      profilesRef.current.push(el);
    }
  };

  return (
    <section id="sobre-nos" ref={sectionRef} className="py-32 px-4 md:px-12 lg:px-16 w-full border-t border-current border-opacity-10 relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto">
        
        <div className="mb-32">
          <p className="text-sm font-bold tracking-widest uppercase mb-8 opacity-50">O Cérebro por trás da operação</p>
          <h2 
            ref={textRef} 
            className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight max-w-[70rem]"
          >
            Engenharia Full-Stack e IA focada em escalabilidade. <span className="opacity-40">Desenvolvemos desde páginas de alta conversão até ecossistemas complexos e inovadores.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          <div ref={addToRefs} className="flex flex-col group" data-cursor="hover">
            <HoverDeformImage 
              outerClassName="profile-image-container aspect-[3/4] mb-8 w-full"
              innerClassName="bg-zinc-200 shadow-2xl"
            >
              <img 
                src="/daniel.jpg" 
                alt="Daniel Barrionuevo" 
                className="parallax-img absolute inset-[-10%] w-[120%] h-[120%] object-cover transition-all duration-700"
              />
            </HoverDeformImage>
            <div className="profile-content">
              <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Daniel Barrionuevo</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6 border-b border-current pb-4 inline-block">
                Engenheiro de Software Full Stack
              </p>
              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                Tech Lead e Desenvolvedor Full Stack, especialista na concepção de plataformas completas em React e Node.js. Focado em escalabilidade, arquiteturas robustas e integração de Inteligência Artificial para criar soluções inovadoras.
              </p>
            </div>
          </div>

          <div ref={addToRefs} className="flex flex-col group mt-0 md:mt-48" data-cursor="hover">
            <HoverDeformImage 
              outerClassName="profile-image-container aspect-[3/4] mb-8 w-full"
              innerClassName="bg-zinc-200 shadow-2xl"
            >
              <img 
                src="/natanael.jpg" 
                alt="Natanael Balbo" 
                className="parallax-img absolute inset-[-10%] w-[120%] h-[120%] object-cover transition-all duration-700"
              />
            </HoverDeformImage>
            <div className="profile-content">
              <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Natanael Balbo</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6 border-b border-current pb-4 inline-block">
                Engenheiro de Software Full Stack
              </p>
              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                Desenvolvedor Full Stack apaixonado por criar soluções escaláveis e funcionais. Especialista em React, TypeScript, Python e Django, atua em todo o ciclo de desenvolvimento de sistemas modernos e de alto desempenho.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
