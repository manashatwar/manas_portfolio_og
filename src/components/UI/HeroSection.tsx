import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import BlockchainVisualization from '../3D/BlockchainVisualization';
import { personalInfo } from '../../data/personalInfo';

const HeroSection: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const handleBlockClick = (category: string) => {
    setActiveBlock(category);
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

  const handleContactClick = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  return (
    <section id="home" className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 grid-background opacity-40" />
      
      {/* Minimal particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 25}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-12 min-h-screen">
            {/* Left Content Panel */}
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full px-8 xl:px-16">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8"
                >
                  {/* Professional Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full px-4 py-2"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400 text-sm font-medium">Available for opportunities</span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <h1 className="text-5xl xl:text-7xl font-bold text-white leading-tight">
                      {personalInfo.name.split(' ')[0]}
                      <br />
                      <span className="text-slate-400">{personalInfo.name.split(' ')[1]}</span>
                    </h1>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-2xl xl:text-3xl text-slate-300 font-light"
                  >
                    {personalInfo.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-lg text-slate-400 leading-relaxed max-w-lg"
                  >
                    {personalInfo.tagline}
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <motion.a
                      href="#projects"
                      className="btn-primary inline-flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>View Projects</span>
                      <ArrowRight size={18} />
                    </motion.a>
                    
                    <motion.button
                      onClick={handleContactClick}
                      className="btn-secondary inline-flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail size={18} />
                      <span>Get In Touch</span>
                    </motion.button>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex items-center space-x-6 pt-4"
                  >
                    <span className="text-slate-500 text-sm font-medium">Connect:</span>
                    <motion.a
                      href={personalInfo.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={personalInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin size={20} />
                    </motion.a>
                    <motion.a
                      href={personalInfo.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter size={20} />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Right 3D Visualization Panel */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-screen w-full"
              >
                <BlockchainVisualization 
                  onBlockClick={handleBlockClick}
                  activeBlock={activeBlock}
                />
              </motion.div>
              
              {/* Interaction Hint */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
                className="absolute bottom-8 left-8 glass-card px-4 py-3 max-w-sm"
              >
                <p className="text-slate-300 text-sm">
                  <span className="text-slate-100 font-medium">Interactive:</span> Click and drag to explore • Click blocks to view projects
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen flex flex-col">
          {/* Mobile Content */}
          <div className="flex-1 flex items-center justify-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-8 max-w-lg"
            >
              {/* Professional Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full px-4 py-2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-400 text-sm font-medium">Available for opportunities</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-white"
              >
                {personalInfo.name}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl sm:text-2xl text-slate-300 font-light"
              >
                {personalInfo.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-lg text-slate-400 leading-relaxed"
              >
                {personalInfo.tagline}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col gap-4"
              >
                <motion.a
                  href="#projects"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Projects</span>
                  <ArrowRight size={18} />
                </motion.a>
                
                <motion.button
                  onClick={handleContactClick}
                  className="btn-secondary inline-flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={18} />
                  <span>Get In Touch</span>
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex items-center justify-center space-x-6 pt-4"
              >
                <motion.a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href={personalInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter size={24} />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile 3D Visualization */}
          <div className="h-[400px] sm:h-[500px] relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full w-full"
            >
              <BlockchainVisualization 
                onBlockClick={handleBlockClick}
                activeBlock={activeBlock}
              />
            </motion.div>
            
            {/* Mobile Interaction Hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card px-4 py-2"
            >
              <p className="text-slate-300 text-sm text-center">
                Tap and drag to explore the blockchain
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-slate-400 hover:text-white transition-colors"
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to about section"
        >
          <ChevronDown size={28} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;