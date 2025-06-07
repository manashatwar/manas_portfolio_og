import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Clock, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

const MediumArticles: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="articles" ref={ref} className="section-padding bg-dark-950">
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Exploring blockchain technology, security vulnerabilities, and the evolving Web3 ecosystem 
              through in-depth analysis and research.
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="space-y-8">
            {personalInfo.mediumArticles.map((article, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="glass-card-hover p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <BookOpen size={128} className="text-primary-400" />
                  </div>

                  <div className="grid lg:grid-cols-4 gap-6 items-start relative z-10">
                    {/* Article Number & Publication */}
                    <div className="lg:col-span-1">
                      <div className="flex flex-col items-start space-y-3">
                        <div className="text-6xl font-bold text-primary-400/20 group-hover:text-primary-400/40 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="space-y-2">
                          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-dark-950 px-3 py-1 rounded-full text-xs font-semibold">
                            {article.publication}
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <Calendar size={14} />
                            <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400 text-sm">
                            <Clock size={14} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="lg:col-span-3">
                      <div className="space-y-4">
                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-primary-400 transition-colors leading-tight">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-dark-800 text-primary-400 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More Link */}
                        <div className="pt-4">
                          <motion.a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-semibold group-hover:translate-x-2 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Read Full Article</span>
                            <ExternalLink size={18} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/30 rounded-2xl transition-colors duration-300" />
                </motion.div>
              </motion.article>
            ))}
          </div>

          {/* View All Articles CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 max-w-md mx-auto">
              <TrendingUp className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">
                Want to read more?
              </h3>
              <p className="text-gray-400 mb-6">
                Check out my Medium profile for more articles on blockchain technology and Web3.
              </p>
              <motion.a
                href={personalInfo.social.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit Medium Profile
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediumArticles;