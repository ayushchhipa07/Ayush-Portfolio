import { motion } from 'framer-motion';
import { FaBriefcase, FaCode, FaDatabase, FaGlobe, FaUsers } from 'react-icons/fa';

const Experience = () => {
  const techBadges = [
    { name: 'PHP', color: 'from-purple-500 to-pink-500' },
    { name: 'CodeIgniter', color: 'from-red-500 to-orange-500' },
    { name: 'MySQL', color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', color: 'from-yellow-400 to-orange-500' },
    { name: 'React', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', color: 'from-green-500 to-emerald-500' },
    { name: 'Git', color: 'from-orange-500 to-red-500' },
    { name: 'Postman', color: 'from-orange-400 to-red-400' }
  ];

  const achievements = [
    { icon: FaGlobe, text: 'Working ComplyRelax.com', color: 'text-blue-400' },
    { icon: FaDatabase, text: 'Optimized MySQL Performance', color: 'text-green-400' },
    { icon: FaCode, text: 'Developed REST APIs', color: 'text-purple-400' },
    { icon: FaUsers, text: 'Team Collaboration', color: 'text-pink-400' }
  ];

  return (
    <div className="relative pb-5 pt-4 px-4 bg-dark-bg overflow-hidden">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-brand-accent/25 to-brand-secondary/15 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-gradient-to-tr from-brand-secondary/20 to-brand-accent/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-brand-accent/5 to-brand-secondary/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary-text"
        >
          Professional <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Experience</span>
        </motion.h2>

        {/* Main experience card with enhanced design */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ y: -5 }}
          className="relative group"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 via-brand-secondary/20 to-brand-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Header section */}
            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 border border-brand-accent/30 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary text-white shadow-lg">
                      <FaBriefcase className="text-sm" />
                    </div>
                    <span className="text-sm font-medium text-primary-text">Dec 2022 – Present</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary-text mb-2">
                    Web Developer
                  </h3>
                  <p className="text-xl text-brand-accent font-semibold">Businessnow Private Limited</p>
                </div>
                
                {/* Achievement icons */}
                <div className="flex gap-4 mt-6 md:mt-0">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-all"
                    >
                      <achievement.icon className={`text-2xl ${achievement.color}`} />
                      <span className="text-xs text-secondary-text text-center">{achievement.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Work summary with enhanced styling */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary-text mb-4">Key Responsibilities</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-secondary-text">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Built and maintained ComplyRelax.com using Core PHP & CodeIgniter</span>
                    </li>
                       <li className="flex items-start gap-3 text-secondary-text">
                      <div className="w-2 h-2 bg-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Efficiently handled user queries, ensuring a smooth and enhanced user experience.</span>
                    </li>
                    <li className="flex items-start gap-3 text-secondary-text">
                      <div className="w-2 h-2 bg-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Continuously developed and integrated new user-focused features to optimize workflows, enhance productivity, and minimize processing time.</span>
                    </li>
                    
                     <li className="flex items-start gap-3 text-secondary-text">
                      <div className="w-2 h-2 bg-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Worked on system administration tasks including server setup, deployment, SSL integration, backups, and monitoring application uptime.</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-primary-text mb-4">Technical Achievements</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-secondary-text">
                      <div className="w-2 h-2 bg-light-text rounded-full mt-2 flex-shrink-0"></div>
                      <span>Developed scalable backend logic and improved UI/UX with React & modern JS</span>
                    </li>
                    <li className="flex items-start gap-3 text-secondary-text">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0"></div>
                      <span>Collaborated with team to implement new features and integrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;