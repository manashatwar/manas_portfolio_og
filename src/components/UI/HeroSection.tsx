import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import BlockchainVisualization from '../3D/BlockchainVisualization';
import { personalInfo } from '../../data/personalInfo';

const HeroSection: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const handleBlockClick = (category: string) => {
    setActiveBlock(category);
    // Scroll to projects section
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 500);
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* 3D Blockchain Visualization */}
      <div className="absolute inset-0">
        <BlockchainVisualization 
          onBlockClick={handleBlockClick}
          activeBlock={activeBlock}
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="text-gradient glow-text">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {personalInfo.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="inline-block mr-2" size={20} />
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card p-6 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">
                {personalInfo.stats.projectsCompleted}+
              </div>
              <div className="text-gray-400 text-sm">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">
                {personalInfo.stats.totalTVL}
              </div>
              <div className="text-gray-400 text-sm">TVL Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">
                {personalInfo.stats.smartContractsDeployed}+
              </div>
              <div className="text-gray-400 text-sm">Smart Contracts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">
                {personalInfo.stats.yearsExperience}+
              </div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-primary-400 animate-bounce"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to about section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default HeroSection;