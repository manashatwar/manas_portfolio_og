import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Clock, Calendar, BookOpen, TrendingUp, Eye, Heart } from 'lucide-react';
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
        staggerChildren: 0.3
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
    <section id="articles" ref={ref} className="section-padding bg-dark-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-width relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6">
              <BookOpen className="w-8 h-8 text-dark-950" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
              Research & Insights
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Deep dives into blockchain security, DeFi protocols, and the evolving Web3 landscape
            </p>
          </motion.div>

          {/* Featured Article - Large Card */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-dark-900/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  {/* Article Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-4">
                      <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-dark-950 px-4 py-2 rounded-full text-sm font-bold">
                        FEATURED
                      </span>
                      <span className="text-primary-400 font-semibold">
                        {personalInfo.mediumArticles[0].publication}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight group-hover:text-primary-400 transition-colors">
                      {personalInfo.mediumArticles[0].title}
                    </h3>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {personalInfo.mediumArticles[0].excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {personalInfo.mediumArticles[0].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary-500/20 text-primary-400 px-4 py-2 rounded-full text-sm font-medium border border-primary-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-6 text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span className="text-sm">{new Date(personalInfo.mediumArticles[0].publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} />
                          <span className="text-sm">{personalInfo.mediumArticles[0].readTime}</span>
                        </div>
                      </div>
                      
                      <motion.a
                        href={personalInfo.mediumArticles[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-dark-950 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Read Article</span>
                        <ExternalLink size={18} />
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Visual Element */}
                  <div className="lg:col-span-1">
                    <div className="relative">
                      <div className="w-full h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <Eye className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                          <div className="text-3xl font-bold text-primary-400">1.4B</div>
                          <div className="text-gray-400">Impact Scale</div>
                        </div>
                      </div>
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Articles - Timeline Style */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-gray-300 mb-12">More Research Articles</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 hidden lg:block"></div>
              
              {personalInfo.mediumArticles.slice(1).map((article, index) => (
                <motion.div
                  key={index}
                  className="relative lg:pl-20 mb-12 group"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full hidden lg:block group-hover:scale-150 transition-transform"></div>
                  
                  <div className="glass-card-hover p-6 lg:p-8">
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* Article Number & Meta */}
                      <div className="lg:col-span-1">
                        <div className="text-6xl font-bold text-primary-400/20 group-hover:text-primary-400/40 transition-colors mb-4">
                          {String(index + 2).padStart(2, '0')}
                        </div>
                        <div className="space-y-2">
                          <div className="text-primary-400 font-semibold text-sm">
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
                      
                      {/* Article Content */}
                      <div className="lg:col-span-3">
                        <h4 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                          {article.title}
                        </h4>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-dark-800 text-primary-400 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <motion.a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-semibold group-hover:translate-x-2 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>Read Full Article</span>
                          <ExternalLink size={16} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-20"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative glass-card p-8 max-w-md mx-auto">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-dark-950" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-400 mb-6">
                  Follow my Medium profile for the latest insights on blockchain security and Web3 innovations.
                </p>
                <motion.a
                  href={personalInfo.social.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={18} />
                  <span>Follow on Medium</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediumArticles;