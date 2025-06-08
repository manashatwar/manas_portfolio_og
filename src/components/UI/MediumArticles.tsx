import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Clock, Calendar, BookOpen, TrendingUp, FileText, Users } from 'lucide-react';
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="articles" ref={ref} className="section-padding bg-slate-950">
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Research & Insights
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Deep analysis of blockchain security, DeFi protocols, and Web3 ecosystem developments
            </p>
          </motion.div>

          {/* Featured Article */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="professional-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  {/* Article Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-4">
                      <span className="bg-slate-100 text-slate-900 px-3 py-1 rounded-full text-sm font-bold">
                        FEATURED
                      </span>
                      <span className="text-slate-400 font-medium">
                        {personalInfo.mediumArticles[0].publication}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                      {personalInfo.mediumArticles[0].title}
                    </h3>
                    
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {personalInfo.mediumArticles[0].excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {personalInfo.mediumArticles[0].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6">
                      <div className="flex items-center space-x-6 text-slate-400">
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
                        className="btn-primary inline-flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Read Article</span>
                        <ExternalLink size={18} />
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Visual Stats */}
                  <div className="lg:col-span-1">
                    <div className="bg-slate-900/50 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-bold text-white mb-2">$1.4B</div>
                      <div className="text-slate-400 text-sm mb-4">Impact Scale</div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-slate-300 h-2 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-slate-500 text-xs mt-2">Security Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Articles Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">More Research</h3>
            
            <div className="grid gap-6">
              {personalInfo.mediumArticles.slice(1).map((article, index) => (
                <motion.div
                  key={index}
                  className="professional-card group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    {/* Article Number */}
                    <div className="lg:col-span-1">
                      <div className="text-4xl font-bold text-slate-600 group-hover:text-slate-400 transition-colors">
                        {String(index + 2).padStart(2, '0')}
                      </div>
                    </div>
                    
                    {/* Article Content */}
                    <div className="lg:col-span-8">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400 font-medium text-sm">
                            {article.publication}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500 text-sm">
                            {new Date(article.publishedDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-bold text-white group-hover:text-slate-200 transition-colors">
                          {article.title}
                        </h4>
                        
                        <p className="text-slate-400 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-slate-800 text-slate-400 px-3 py-1 rounded-lg text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Meta Info */}
                    <div className="lg:col-span-2">
                      <div className="text-right space-y-2">
                        <div className="flex items-center justify-end space-x-2 text-slate-500">
                          <Clock size={14} />
                          <span className="text-sm">{article.readTime}</span>
                        </div>
                        <div className="flex items-center justify-end space-x-2 text-slate-500">
                          <BookOpen size={14} />
                          <span className="text-sm">Research</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Read More */}
                    <div className="lg:col-span-1">
                      <motion.a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-slate-800 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
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
            <div className="professional-card max-w-lg mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-6">
                <Users className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Follow My Research
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Stay updated with the latest insights on blockchain security, DeFi protocols, and Web3 innovations.
              </p>
              <motion.a
                href={personalInfo.social.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TrendingUp size={18} />
                <span>Follow on Medium</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediumArticles;