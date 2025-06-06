import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, FileText, Shield, TrendingUp, Users } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'text-green-400 bg-green-400/20';
      case 'Audited': return 'text-blue-400 bg-blue-400/20';
      case 'Development': return 'text-yellow-400 bg-yellow-400/20';
      case 'Beta': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getMetricIcon = (key: string) => {
    switch (key) {
      case 'tvlManaged': return TrendingUp;
      case 'users': return Users;
      case 'security': return Shield;
      default: return FileText;
    }
  };

  const formatMetricLabel = (key: string) => {
    switch (key) {
      case 'tvlManaged': return 'TVL Managed';
      case 'gasOptimization': return 'Gas Saved';
      case 'transactions': return 'Transactions';
      case 'users': return 'Users';
      case 'security': return 'Security';
      default: return key;
    }
  };

  return (
    <motion.div
      className="glass-card-hover p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      {/* Project Image */}
      <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-48 object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-dark-950 px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex-1 flex flex-col">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-dark-800 text-primary-400 px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-gray-400 text-xs px-2 py-1">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Metrics */}
        {Object.keys(project.metrics).length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => {
                const Icon = getMetricIcon(key);
                return (
                  <div key={key} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-primary-400" />
                    <div>
                      <div className="text-xs text-gray-400">{formatMetricLabel(key)}</div>
                      <div className="text-sm font-semibold text-white">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} />
                </motion.a>
              )}
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink size={20} />
                </motion.a>
              )}
              {project.links.article && (
                <motion.a
                  href={project.links.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FileText size={20} />
                </motion.a>
              )}
            </div>
            
            <div className="text-xs text-gray-500">
              {new Date(project.dateCompleted).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;