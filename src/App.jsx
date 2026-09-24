import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { CustomCursor } from './components/CustomCursor';
import { Background2D } from './components/Background2D';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { About } from './components/About';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TransitionOverlay } from './components/TransitionOverlay';
import { ProjectDetail } from './components/ProjectDetail';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [lastProjectId, setLastProjectId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const savedScroll = React.useRef(0);

  const handleNavigate = (view, target = null) => {
    if (view === currentView) {
      if (view === 'home' && target && typeof target === 'string' && target.startsWith('#')) {
        if (window.lenis) {
          window.lenis.scrollTo(target === '#top' ? 0 : target, { duration: 1.5 });
        } else {
          const el = target === '#top' ? document.body : document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }
    
    // 1. Capture scroll IMMEDIATELY before any transitions or unmounts start
    if (currentView === 'home') {
      savedScroll.current = window.scrollY;
    }
    
    // 2. Track the last project visited so Showcase can snap to it explicitly
    if (view === 'project') {
      setLastProjectId(target);
    }
    
    setIsTransitioning(true);
    
    // Switch view midway through the transition (0.45s)
    setTimeout(() => {
      // 3. Kill ALL ScrollTriggers BEFORE React unmounts the pinned component.
      ScrollTrigger.getAll().forEach(st => st.kill());

      // 4. Stop Lenis so it doesn't fight with the scroll reset
      if (window.lenis) {
        window.lenis.stop();
      }

      // 5. Force scroll to top temporarily to avoid weird jumps during unmount
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 6. Now switch the view — React will unmount old, mount new
      setCurrentView(view);
      if (view === 'project') {
        setActiveProjectId(target);
      }
      
      // 7. After React has rendered the new component, restart Lenis and refresh
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Refresh ScrollTrigger FIRST so the DOM expands to its pinned height
          ScrollTrigger.refresh(true);

          if (window.lenis) {
            window.lenis.start();
            let targetScroll = view === 'home' ? savedScroll.current : 0;
            if (view === 'home' && target && typeof target === 'string' && target.startsWith('#')) {
              targetScroll = target === '#top' ? 0 : target;
            }
            window.lenis.scrollTo(targetScroll, { immediate: true });
            ScrollTrigger.update();
          } else {
             let targetScroll = view === 'home' ? savedScroll.current : 0;
             if (view === 'home' && target && typeof target === 'string' && target.startsWith('#')) {
               const el = target === '#top' ? document.body : document.querySelector(target);
               targetScroll = el ? el.offsetTop : 0;
             }
             window.scrollTo(0, targetScroll);
             ScrollTrigger.update();
          }
        });
      });
    }, 450);

    // End transition (0.9s)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <>
      <CustomCursor />
      <Header onNavigate={handleNavigate} />
      <TransitionOverlay 
        isActive={isTransitioning} 
      />
      <Background2D />

      <main className="relative z-10 w-full overflow-hidden">
        {currentView === 'home' && (
          <>
            <Hero />
            <Showcase onNavigate={handleNavigate} returnToProjectId={lastProjectId} />
            <About />
          </>
        )}
        {currentView === 'project' && (
          <ProjectDetail projectId={activeProjectId} onNavigate={handleNavigate} />
        )}
        <Footer onNavigate={handleNavigate} />
      </main>
    </>
  );
}

function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  );
}

export default App;
