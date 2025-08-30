import { motion } from 'framer-motion';
import { FaCode, FaExternalLinkAlt, FaGithub, FaGlobe } from 'react-icons/fa';
import { HiCode, HiGlobe, HiServer } from 'react-icons/hi';

const Projects = () => {
  const projects = [
    {
      title: 'ComplyRelax',
      subtitle: 'Task Management & Professional Services Platform',
      description: 'A comprehensive web-based application designed to streamline day-to-day activity tracking for businesses and provide support for professionals like CS and CA.',
      longDescription: 'Developed a full-stack web application using PHP and CodeIgniter framework. The platform features user authentication, task management, document handling, and professional service coordination. Implemented responsive design and optimized database queries for better performance.',
      github: '#',
      live: 'https://complyrelax.com',
      tags: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
      features: [
        'User Authentication & Authorization',
        'Task Management System',
        'Document Upload & Management',
        'Professional Service Coordination',
        'Responsive Web Design',
        'Database Optimization'
      ],
      icon: HiGlobe,
      color: 'text-brand-accent',
      image: '/complyrelax-preview.jpg'
    },
    {
      title: 'Portfolio Website',
      subtitle: 'Modern React Portfolio',
      description: 'A modern, responsive portfolio website built with React and Tailwind CSS, featuring smooth animations and interactive elements.',
      longDescription: 'Developed a personal portfolio website showcasing professional experience, skills, and projects. Features include smooth scroll animations, interactive components, and mobile-responsive design.',
      github: 'https://github.com/yourusername/portfolio',
      live: '#',
      tags: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'Vite'],
      features: [
        'Responsive Design',
        'Smooth Animations',
        'Interactive Components',
        'Modern UI/UX',
        'Performance Optimized',
        'SEO Friendly'
      ],
      icon: HiCode,
      color: 'text-brand-secondary',
      image: '/portfolio-preview.jpg'
    },
    {
      title: 'E-Commerce Platform',
      subtitle: 'Online Shopping Solution',
      description: 'A full-featured e-commerce platform with product management, shopping cart, and payment integration.',
      longDescription: 'Built a complete e-commerce solution with admin panel, product catalog, user management, and payment gateway integration. Features include inventory management, order tracking, and analytics dashboard.',
      github: '#',
      live: '#',
      tags: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'PayPal API'],
      features: [
        'Product Management',
        'Shopping Cart System',
        'Payment Integration',
        'Admin Dashboard',
        'Inventory Management',
        'Order Tracking'
      ],
      icon: HiServer,
      color: 'text-light-text',
      image: '/ecommerce-preview.jpg'
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
    <div className="min-h-screen bg-dark-secondary pb-10 pt-10 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-full text-brand-accent font-medium text-sm border border-brand-accent/30 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6">
            My <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-secondary-text text-lg max-w-3xl mx-auto">
            Showcasing my expertise in full-stack development through innovative and scalable web solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              className="group"
            >
              <div className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-brand-accent/30 transition-all duration-300 h-full">
                {/* Project Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 border border-brand-accent/30 mr-4`}>
                      <project.icon className={`text-2xl ${project.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-text mb-1">{project.title}</h3>
                      <p className="text-sm text-brand-accent font-medium">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-secondary-text text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs text-brand-accent font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Features */}
                <div className="p-6">
                  <h4 className="text-primary-text font-semibold mb-3 flex items-center">
                    <FaCode className="text-brand-accent mr-2" />
                    Key Features
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {project.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-secondary-text">
                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-dark-bg/50 rounded-lg text-secondary-text hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub size={18} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-dark-bg/50 rounded-lg text-secondary-text hover:text-brand-accent hover:bg-brand-accent/10 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt size={18} />
                      </motion.a>
                    </div>
                    
                    <motion.button
                      className="text-sm text-brand-accent hover:text-brand-secondary transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      View Details →
                    </motion.button>
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
          <div className="bg-gradient-to-r from-brand-accent/10 to-brand-secondary/10 border border-brand-accent/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
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