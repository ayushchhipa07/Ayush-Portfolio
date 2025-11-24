import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Get all sections
      const sections = document.querySelectorAll('section[id], div[id]');
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      // Find which section is currently in view
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: 'easeOut',
        staggerChildren: 0.1
      } 
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
       scrolled
  ? 'backdrop-blur-md bg-gray-100/70 dark:bg-white/5 border-b border-gray-300 dark:border-white/10'
  : 'bg-white/80 dark:bg-transparent'

      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" className="flex items-center space-x-2 group">
              <div className="relative">
                <HiCode className="text-3xl text-brand-accent group-hover:text-brand-secondary transition-colors duration-300" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-full opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xl md:text-2xl font-semibold tracking-tight bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">
                Ayush
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {links.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className={`relative px-3 py-2 rounded-md transition-all duration-300 group ${
                      isActive 
                        ? 'text-brand-accent/90 bg-gray-200 dark:bg-white/5 ring-1 ring-gray-300 dark:ring-white/10' 
                        : 'text-gray-700 dark:text-secondary-text hover:text-black dark:hover:text-primary-text hover:bg-gray-200/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    <motion.div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-brand-accent to-brand-secondary ${
                        isActive ? 'w-2/3' : 'w-0 group-hover:w-2/3'
                      }`}
                      transition={{ duration: 0.3 }}
                    />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-brand-accent/5 rounded-md"
                        layoutId="activeSection"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>


          {/* CTA Button */}
          <motion.div 
            className="hidden md:block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
             <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 dark:text-white transition"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button> &nbsp;
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary text-white font-medium shadow-sm hover:shadow-brand-accent/30 transition-all"
            >
              <span>Hire Me</span>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-primary-text hover:text-brand-accent transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white/95 dark:bg-dark-bg/95 border-t border-gray-300 dark:border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={linkVariants}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'text-brand-accent bg-brand-accent/10 border border-brand-accent/20' 
                        : 'text-gray-700 dark:text-primary-text hover:text-brand-accent hover:bg-gray-200/60 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.div
                variants={linkVariants}
                className="pt-4 border-t border-white/10"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary text-white font-medium w-full"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;