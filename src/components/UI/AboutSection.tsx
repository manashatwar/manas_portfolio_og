import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Code, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

const AboutSection: React.FC = () => {
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

  const stats = [
    { 
      icon: Code, 
      value: personalInfo.stats.projectsCompleted, 
      label: 'Projects Completed',
      color: 'text-primary-400'
    },
    { 
      icon: TrendingUp, 
      value: personalInfo.stats.totalTVL, 
      label: 'Total Value Locked',
      color: 'text-secondary-400'
    },
    { 
      icon: Shield, 
      value: personalInfo.stats.securityAudits, 
      label: 'Security Audits',
      color: 'text-green-400'
    },
    { 
      icon: Users, 
      value: personalInfo.stats.communityStar, 
      label: 'Community Stars',
      color: 'text-purple-400'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'DeFi Innovation',
      description: 'Led development of protocols managing $50M+ TVL'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Discovered and disclosed 5+ critical vulnerabilities'
    },
    {
      icon: Users,
      title: 'Community Leader',
      description: 'Speaker at ETHGlobal and mentor to 20+ developers'
    },
    {
      icon: Zap,
      title: 'Gas Optimization',
      description: 'Achieved 40%+ gas savings across multiple protocols'
    }
  ];

  return (
    <section id="about" ref={ref} className="section-padding bg-dark-900/50">
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about building the decentralized future through secure, 
              scalable blockchain solutions and innovative financial primitives.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Bio Section */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-4 text-primary-400">
                    My Journey
                  </h3>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    {personalInfo.bio.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Current Focus */}
                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-4 text-secondary-400">
                    Current Focus
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {personalInfo.currentFocus.map((focus, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                        <span className="text-gray-300">{focus}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats and Achievements */}
            <motion.div variants={itemVariants}>
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="glass-card p-6 text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                      <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Key Achievements */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Key Achievements
                  </h3>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="glass-card-hover p-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start space-x-4">
                        <achievement.icon className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-300 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {personalInfo.certifications.map((cert, index) => (
                      <div key={index} className="border-l-2 border-primary-500 pl-4">
                        <div className="font-semibold text-primary-400">
                          {cert.name}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {cert.issuer} • {cert.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;