import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Filter } from 'lucide-react';
import { projects, projectCategories } from '../../data/projects';
import ProjectCard from './ProjectCard';

const ProjectsSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filterOptions = [
    { key: 'all', label: 'All Projects', count: projects.length },
    ...Object.entries(projectCategories).map(([key, category]) => ({
      key,
      label: category.name,
      count: category.count
    }))
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = activeFilter === 'all' || project.category === activeFilter;
    const featuredMatch = !featuredOnly || project.featured;
    return categoryMatch && featuredMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="projects" ref={ref} className="section-padding">
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A showcase of innovative blockchain solutions, from DeFi protocols 
              to smart contract infrastructure, each pushing the boundaries of 
              decentralized technology.
            </p>
          </motion.div>

          {/* Filter Controls */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {filterOptions.map((option) => (
                  <motion.button
                    key={option.key}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === option.key
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-dark-950'
                        : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-primary-400'
                    }`}
                    onClick={() => setActiveFilter(option.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option.label} ({option.count})
                  </motion.button>
                ))}
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                    featuredOnly ? 'bg-primary-500' : 'bg-dark-700'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${
                      featuredOnly ? 'translate-x-6' : 'translate-x-0.5'
                    } translate-y-0.5`} />
                  </div>
                  <span className="text-gray-300 text-sm">Featured Only</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your filters to see more projects.
                </p>
              </div>
            </motion.div>
          )}

          {/* View All Projects CTA */}
          {filteredProjects.length > 0 && activeFilter === 'all' && !featuredOnly && (
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 mb-6">
                Want to see more projects and detailed case studies?
              </p>
              <motion.a
                href="#contact"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;