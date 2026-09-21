import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggle } from './components/ThemeToggle';
import { Background3D } from './components/Background3D';
import { Background2D } from './components/Background2D';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { About } from './components/About';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TransitionOverlay } from './components/TransitionOverlay';
import { ProjectDetail } from './components/ProjectDetail';

function AppContent() {
  const { theme } = useTheme();
  
  // 'home' or 'project'
  const [currentView, setCurrentView] = useState('home');
  const [activeProjectId, setActiveProjectId] = useState(null);
  
  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextView, setNextView] = useState(null);
  const [nextProjectId, setNextProjectId] = useState(null);

  const handleNavigate = (view, projectId = null) => {
    if (view === currentView) return;
    setNextView(view);
    setNextProjectId(projectId);
    setIsTransitioning(true);
  };

  const onTransitionComplete = () => {
    setCurrentView(nextView);
    setActiveProjectId(nextProjectId);
    setIsTransitioning(false);
  };

  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <Header onNavigate={handleNavigate} />
      
      <TransitionOverlay 
        isActive={isTransitioning} 
        onTransitionComplete={onTransitionComplete} 
      />
      
      {/* Backgrounds based on theme */}
      {theme === 'dark' ? <Background3D /> : <Background2D />}

      {/* Main Content */}
      <main className="relative z-10 w-full overflow-hidden">
        {currentView === 'home' && (
          <>
            <Hero />
            <Showcase onNavigate={handleNavigate} />
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
