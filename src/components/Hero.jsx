import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative min-h-[88vh] md:min-h-screen 
                    bg-white dark:bg-dark-bg 
                    text-black dark:text-white 
                    overflow-hidden pt-24 transition-colors duration-300">

      {/* BG Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 h-72 w-72 md:h-[28rem] md:w-[28rem] 
                        rounded-full 
                        bg-gradient-to-br 
                        from-purple-500/20 to-blue-500/10 
                        dark:from-brand-accent/30 dark:to-brand-secondary/20 
                        blur-3xl"></div>

        <div className="absolute -bottom-24 -left-16 h-72 w-72 md:h-[24rem] md:w-[24rem] 
                        rounded-full 
                        bg-gradient-to-tr 
                        from-blue-400/10 to-purple-300/10
                        dark:from-brand-secondary/20 dark:to-brand-accent/10 
                        blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 
                   flex items-center justify-center min-h-[70vh] md:min-h-[78vh]"
      >
        <div className="w-full text-center">

          <motion.span 
            variants={itemVariants} 
            className="inline-block text-xs tracking-widest uppercase 
                       text-gray-600 dark:text-secondary-text/80 mb-4"
          >
            Available for freelance
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            <span className="text-black dark:text-primary-text">Hi, I'm </span>
            <span className="bg-gradient-to-r 
                             from-purple-600 via-purple-500 to-cyan-400 
                             dark:from-brand-accent dark:via-neon-purple dark:to-neon-cyan 
                             bg-clip-text text-transparent">
              Ayush Chhipa
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-xl sm:text-2xl text-gray-700 dark:text-secondary-text mb-6"
          >
            Building scalable web apps and thoughtful product experiences.
          </motion.p>

          <motion.p 
            variants={itemVariants} 
            className="text-gray-700 dark:text-secondary-text leading-relaxed mb-8"
          >
            Full-stack developer specializing in React, Node.js and modern PHP frameworks. 
            I craft performant, accessible interfaces and reliable backends.
          </motion.p>

          {/* Skills */}
          <motion.div 
            variants={itemVariants} 
            className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {['React', 'Node.js', 'Express.js', 'PHP', 'MySQL', 'Tailwind'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 rounded-full text-xs md:text-sm 
                           bg-gray-200 border-gray-300 
                           dark:bg-white/[0.06] dark:border-white/10 
                           text-black dark:text-primary-text/90 
                           hover:border-purple-400/40 dark:hover:border-brand-accent/40 
                           border transition-colors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">

            <a href="/Ayush_Chhipa_Resume.pdf" download="Ayush_Chhipa_Resume.pdf"
              className="inline-flex items-center justify-center px-6 py-3 
                         rounded-full text-white font-medium shadow-sm 
                         bg-gradient-to-r 
                         from-purple-500 to-blue-500 
                         dark:from-brand-accent dark:to-brand-secondary 
                         hover:shadow-purple-400/30 dark:hover:shadow-brand-accent/30 
                         transition-all"
            >
              <FaDownload className="mr-2" /> Download Resume
            </a>

            <a href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full 
                         border border-gray-400 text-black hover:bg-gray-200
                         dark:border-white/15 dark:text-primary-text dark:hover:bg-white/5 
                         transition-colors"
            >
              View Projects <FaArrowRight className="ml-2" />
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="mt-8 flex justify-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-gray-500 dark:border-white/20 hover:border-brand-accent/40 hover:text-light-text transition-all duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/ayush-chhipa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-gray-500 dark:border-white/20 hover:border-brand-accent/40 hover:text-light-text transition-all duration-300"
            >
              <FaLinkedin />
            </a>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
