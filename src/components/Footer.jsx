import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-20 px-4 md:px-12 lg:px-16 w-full mt-20 border-t border-current border-opacity-10 overflow-hidden">
      <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        
        <div className="flex-1">
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6">
            VAMOS<br/>CONVERSAR.
          </h2>
          <button 
            data-cursor="hover"
            className="text-lg md:text-2xl border-b border-current pb-1 hover:opacity-50 transition-opacity"
            onClick={() => window.location.href = "mailto:hello@antigravity.com"}
          >
            hello@antigravity.com
          </button>
        </div>
        
        <div className="flex gap-10 text-sm tracking-widest uppercase font-medium">
          <ul className="space-y-4">
            <li><a href="#" data-cursor="hover" className="hover:opacity-50 transition-opacity">LinkedIn</a></li>
            <li><a href="#" data-cursor="hover" className="hover:opacity-50 transition-opacity">Twitter</a></li>
            <li><a href="#" data-cursor="hover" className="hover:opacity-50 transition-opacity">Instagram</a></li>
          </ul>
          <ul className="space-y-4 text-right">
            <li><a href="#" data-cursor="hover" className="hover:opacity-50 transition-opacity">Projetos</a></li>
            <li><a href="#" data-cursor="hover" className="hover:opacity-50 transition-opacity">Sobre nós</a></li>
            <li 
              className="cursor-pointer hover:opacity-50 transition-opacity"
              data-cursor="hover" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Voltar ao Topo ↑
            </li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
};
