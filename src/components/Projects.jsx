import { motion } from 'framer-motion';
import { FaCode, FaExternalLinkAlt, FaGithub, FaGlobe } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'ComplyRelax',
      subtitle: 'Task Management & Professional Services Platform',
      description: "ComplyRelax is an AI-powered compliance and office management platform that helps professionals like CS and CA simplify corporate compliances, automate routine tasks, and boost productivity with a smart, centralized dashboard.",
      longDescription: 'Developed a full-stack web application using PHP and CodeIgniter framework. The platform features user authentication, task management, document handling, and professional service coordination. Implemented responsive design and optimized database queries for better performance.',
      live: 'https://complyrelax.com',
      tags: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'jQuery', 'Ajax'],
      features: [
        'User Authentication & Authorization',
        'Task Management System',
        'Document Upload & Management',
        'Professional Service Coordination',
        'Responsive Web Design',
        'Database Optimization'
      ],
      icon: '/complyrelax.png',
      color: 'text-brand-accent',
      image: '../../public/complyrelax.png'
    },
    {
      title: 'Portfolio Website',
      subtitle: 'Modern React Portfolio',
      description: 'A modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations and interactive elements.',
      longDescription: 'Developed a personal portfolio website showcasing professional experience, skills, and projects. Features include smooth scroll animations, interactive components, and mobile-responsive design.',
      github: 'https://github.com/ayushchhipa07/Ayush-Portfolio',
      live: '#',
      tags: ['React', 'Tailwind CSS', 'Vite', 'Node.js', 'JavaScript'],
      features: [
        'Responsive Design',
        'Smooth Animations',
        'Interactive Components',
        'Modern UI/UX',
        'Performance Optimized',
        'SEO Friendly',
        'Dark & Light Mode'
      ],
      icon: '/Icon.svg',
      color: 'text-brand-secondary',
      image: '../../public/Icon.svg'
    }
  ];

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg 
    text-black dark:text-white overflow-hidden transition-colors duration-300 pt-5 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-accent/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 ">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-primary-text mb-6">
            My <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-700 dark:text-secondary-text text-lg max-w-3xl mx-auto">
            Showcasing my expertise in full-stack development through innovative and scalable web solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              className="group"
            >
              <div className="rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.06]
    backdrop-blur-xl shadow-lg dark:shadow-2xl overflow-hidden hover:border-brand-accent/30 transition-all duration-300 h-full">
                {/* Project Header */}
                <div className="p-6 border-b border-gray-300 dark:border-white/10">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 border border-brand-accent/30 mr-4`}>
                      <img 
                        src={`${project.image}`} 
                        alt={`${project.title} icon`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div 
                        className="w-8 h-8 hidden flex items-center justify-center text-brand-accent"
                        style={{ display: 'none' }}
                      >
                        <FaCode size={30} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black dark:text-primary-text mb-1">{project.title}</h3>
                      <p className="text-sm text-brand-accent font-medium">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-secondary-text text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-200 rounded-xl dark:bg-white/5 border border-gray-300 dark:border-white/10 text-black dark:text-primary-text/90 font-medium hover:border-brand-accent/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Features */}
                <div className="p-6">
                  <h4 className="text-black dark:text-primary-text font-semibold mb-3 flex items-center">
                    <FaCode className="text-brand-accent mr-2" />
                    Key Features
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {project.features.slice(0, 7).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-secondary-text">
                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex space-x-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-200 dark:bg-white/5 rounded-lg text-gray-700 dark:text-secondary-text hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub size={18} />
                        </motion.a>
                      )}
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-200 dark:bg-white/5 rounded-lg text-gray-700 dark:text-secondary-text hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.06] backdrop-blur-xl shadow-lg dark:shadow-2xl backdrop-blur-xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-black dark:text-primary-text mb-4">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-secondary-text mb-6 max-w-2xl mx-auto">
              Let's collaborate to bring your ideas to life with modern web technologies and innovative solutions.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-brand-accent to-brand-secondary text-white font-semibold rounded-full hover:shadow-xl hover:shadow-brand-accent/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGlobe className="mr-2" />
              Let's Work Together
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;