import React from 'react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer id="contato" className="py-20 px-4 md:px-12 lg:px-16 w-full mt-20 border-t border-current border-opacity-10 overflow-hidden relative z-20">
      <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        
        <div className="flex-1">
          <p className="text-sm font-bold tracking-widest uppercase mb-4 opacity-50">Tem um projeto em mente?</p>
          <img 
            src="/logo-symbol.png" 
            alt="Vitrine Web" 
            className="h-12 md:h-16 w-auto object-contain mb-6"
          />
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-10">
            VAMOS<br/>CONVERSAR.
          </h2>
          <a 
            href="https://wa.me/554488680905" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#1E293B] text-white font-bold uppercase tracking-widest text-sm md:text-base rounded-full hover:bg-black transition-colors duration-300"
            data-cursor="hover"
          >
            Chamar no WhatsApp
          </a>
        </div>
        
        <div className="flex flex-col items-end gap-10 text-sm tracking-widest uppercase font-medium">
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-right">
            
            {/* Top-Left: LinkedIn */}
            <div className="relative group flex justify-end">
              <div className="hover:opacity-50 transition-opacity flex items-center gap-2" data-cursor="hover">
                LinkedIn
              </div>
              <div className="absolute right-0 bottom-full hidden group-hover:block pb-2 z-50">
                <div className="flex flex-col bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden whitespace-nowrap min-w-[150px] text-left text-white">
                  <a href="https://www.linkedin.com/in/danielbarrionuevo/" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/5" data-cursor="hover">
                    Daniel
                  </a>
                  <a href="https://www.linkedin.com/in/natanael-figueredo-balbo/" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-white/10 transition-colors" data-cursor="hover">
                    Natanael
                  </a>
                </div>
              </div>
            </div>
            
            {/* Top-Right: Instagram */}
            <div className="relative group flex justify-end">
              <div className="hover:opacity-50 transition-opacity flex items-center gap-2" data-cursor="hover">
                Instagram
              </div>
              <div className="absolute right-0 bottom-full hidden group-hover:block pb-2 z-50">
                <div className="flex flex-col bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden whitespace-nowrap min-w-[150px] text-left text-white">
                  <a href="https://www.instagram.com/danielbarriogomes/" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/5" data-cursor="hover">
                    Daniel
                  </a>
                  <a href="https://www.instagram.com/natanaelbalbo/" target="_blank" rel="noopener noreferrer" className="px-6 py-4 hover:bg-white/10 transition-colors" data-cursor="hover">
                    Natanael
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom-Left: Projetos */}
            <div className="flex justify-end">
              <button className="hover:opacity-50 transition-opacity uppercase" data-cursor="hover" onClick={() => onNavigate && onNavigate('home', '#projetos')}>Projetos</button>
            </div>
            
            {/* Bottom-Right: Sobre Ns */}
            <div className="flex justify-end">
              <button className="hover:opacity-50 transition-opacity uppercase" data-cursor="hover" onClick={() => onNavigate && onNavigate('home', '#sobre-nos')}>Sobre Nós</button>
            </div>
            
          </div>

          {/* Voltar ao Topo */}
          <div 
            className="hover:opacity-50 transition-opacity uppercase block"
            data-cursor="hover" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Voltar ao Topo ↑
          </div>
          
        </div>
        
      </div>
    </footer>
  );
};
