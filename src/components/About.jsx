import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      const img = profile.querySelector('.profile-img');
      const content = profile.querySelector('.profile-content');

      gsap.fromTo(img,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          scale: 1,
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
    <section ref={sectionRef} className="py-32 px-4 md:px-12 lg:px-16 w-full border-t border-current border-opacity-10 relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto">
        
        <div className="mb-32">
          <p className="text-sm font-bold tracking-widest uppercase mb-8 opacity-50">O Cérebro por trás da operação</p>
          <h2 
            ref={textRef} 
            className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-tight max-w-[80rem]"
          >
            Nós unimos a precisão da extração de dados com o impacto visual de protótipos de alta conversão. O resultado? <span className="opacity-40">Um motor imparável de aquisição de clientes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          <div ref={addToRefs} className="flex flex-col group cursor-pointer">
            <div className="image-deform-container aspect-[3/4] mb-8 bg-zinc-200 relative shadow-2xl w-full">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop" 
                alt="Daniel" 
                className="profile-img absolute inset-[-10%] w-[120%] h-[120%] object-cover grayscale transition-all duration-700"
              />
            </div>
            <div className="profile-content">
              <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Daniel</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6 border-b border-current pb-4 inline-block">
                Especialista em Dados & Automação
              </p>
              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                Focado na lógica, estrutura e performance. É o responsável por desenvolver os motores de scraping que varrem a web em busca dos leads mais quentes. Para ele, dados são o novo petróleo, e a automação é a refinaria.
              </p>
            </div>
          </div>

          <div ref={addToRefs} className="flex flex-col group cursor-pointer mt-0 md:mt-48">
            <div className="image-deform-container aspect-[3/4] mb-8 bg-zinc-200 relative shadow-2xl w-full">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop" 
                alt="Sócio" 
                className="profile-img absolute inset-[-10%] w-[120%] h-[120%] object-cover grayscale transition-all duration-700"
              />
            </div>
            <div className="profile-content">
              <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Sócio / Design</h3>
              <p className="text-sm font-bold tracking-widest uppercase opacity-50 mb-6 border-b border-current pb-4 inline-block">
                Diretor de UI/UX & Protótipos
              </p>
              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                Transforma dados complexos em interfaces que convertem. Especialista em criar protótipos de altíssima fidelidade que não apenas brilham aos olhos, mas guiam os leads diretamente para a ação desejada.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
