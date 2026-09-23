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

  const handleNavigate = (view, projectId = null) => {
    if (view === currentView) return;
    
    // 1. Capture scroll IMMEDIATELY before any transitions or unmounts start
    if (currentView === 'home') {
      savedScroll.current = window.scrollY;
    }
    
    // 2. Track the last project visited so Showcase can snap to it explicitly
    if (view === 'project') {
      setLastProjectId(projectId);
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
      setActiveProjectId(projectId);
      
      // 7. After React has rendered the new component, restart Lenis and refresh
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Refresh ScrollTrigger FIRST so the DOM expands to its pinned height
          ScrollTrigger.refresh(true);

          if (window.lenis) {
            window.lenis.start();
            // If returning to home, restore the saved scroll position
            const targetScroll = view === 'home' ? savedScroll.current : 0;
            window.lenis.scrollTo(targetScroll, { immediate: true });
            // Force GSAP to update its animations to the new scroll position immediately
            ScrollTrigger.update();
          } else {
             // Fallback for native scroll
             const targetScroll = view === 'home' ? savedScroll.current : 0;
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
        <Footer />
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
