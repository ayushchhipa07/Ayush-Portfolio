import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiCode, HiDatabase, HiGlobe, HiServer } from 'react-icons/hi';

const Hero = () => {
  const floatingIcons = [
    { icon: HiCode, delay: 0, position: 'top-20 left-20' },
    { icon: HiServer, delay: 1, position: 'top-40 right-20' },
    { icon: HiDatabase, delay: 2, position: 'bottom-40 left-10' },
    { icon: HiGlobe, delay: 3, position: 'bottom-20 right-10' },
  ];

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
    <div className="relative min-h-[88vh] md:min-h-screen bg-dark-bg overflow-hidden pt-24">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-20 h-72 w-72 md:h-[28rem] md:w-[28rem] rounded-full bg-gradient-to-br from-brand-accent/30 to-brand-secondary/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-16 h-72 w-72 md:h-[24rem] md:w-[24rem] rounded-full bg-gradient-to-tr from-brand-secondary/20 to-brand-accent/10 blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh] md:min-h-[78vh]"
      >
        <div className="w-full text-center">
          <motion.span variants={itemVariants} className="inline-block text-xs tracking-widest uppercase text-secondary-text/80 mb-4">Available for freelance</motion.span>
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            <span className="text-primary-text">Hi, I'm </span>
            <span className="bg-gradient-to-r from-brand-accent via-neon-purple to-neon-cyan bg-clip-text text-transparent">Ayush Chhipa</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-secondary-text mb-6 max-w-2xl mx-auto">
            Building scalable web apps and thoughtful product experiences.
          </motion.p>
          <motion.p variants={itemVariants} className="text-secondary-text leading-relaxed mb-8 max-w-2xl mx-auto">
            Full‑stack developer specializing in React, Node.js and modern PHP frameworks. I craft performant, accessible interfaces and reliable backends.
          </motion.p>

          {/* Skills as pill badges */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {['React', 'Node.js', 'PHP', 'MySQL', 'Tailwind', 'Framer Motion'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 rounded-full text-xs md:text-sm text-primary-text/90 bg-white/[0.06] border border-white/10 hover:border-brand-accent/40 transition-colors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a href="/Ayush_Chhipa_Resume.pdf" download="Ayush_Chhipa_Resume.pdf" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary text-white font-medium shadow-sm hover:shadow-brand-accent/30 transition-all">
              <FaDownload className="mr-2" /> Download Resume
            </a>
            <a href="#projects" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-primary-text hover:bg-white/5 transition-colors">
              View Projects <FaArrowRight className="ml-2" />
            </a>
          </motion.div>

          {/* Socials (optional, still centered) */}
          <motion.div variants={itemVariants} className="mt-8 flex justify-center gap-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-primary-text">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/ayush-chhipa" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-primary-text">
              <FaLinkedin />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;