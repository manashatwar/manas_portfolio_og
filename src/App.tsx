import React from 'react';
import Header from './components/Layout/Header';
import HeroSection from './components/UI/HeroSection';
import AboutSection from './components/UI/AboutSection';
import ProjectsSection from './components/UI/ProjectsSection';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-gray-100">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
    </div>
  );
}

export default App;