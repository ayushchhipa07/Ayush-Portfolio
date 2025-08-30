import { motion } from 'framer-motion';
import { FaAward, FaBriefcase, FaCode, FaGraduationCap } from 'react-icons/fa';
import { HiAcademicCap, HiLightBulb, HiUserGroup } from 'react-icons/hi';

const About = () => {
  const stats = [
    { icon: FaBriefcase, label: 'Years Experience', value: '2+', color: 'text-brand-accent' },
    { icon: FaCode, label: 'Projects Completed', value: '10+', color: 'text-brand-secondary' },
    { icon: FaGraduationCap, label: 'Education', value: 'BCA', color: 'text-light-text' },
    { icon: FaAward, label: 'Certifications', value: '3+', color: 'text-neon-cyan' },
  ];

  const skills = [
    'Full Stack Development', 'PHP & CodeIgniter', 'JavaScript & React', 
    'MySQL Database Design', 'RESTful APIs', 'Git & Version Control'
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center pb-12 pt-7 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-accent/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        > 
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6">
            Passionate <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Full Stack Developer</span>
          </h2>
          <p className="text-secondary-text text-lg max-w-3xl mx-auto">
            Transforming ideas into scalable web solutions with modern technologies and best practices
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-6">
                <h3 className="text-xl font-semibold text-primary-text mb-4 flex items-center">
                  <HiAcademicCap className="text-brand-accent mr-3" />
                  Professional Background
                </h3>
                <p className="text-secondary-text leading-relaxed">
                  I am a dedicated Computer Science graduate with a strong foundation in web development technologies. 
                  Currently working as a <span className="text-brand-accent font-semibold">Web Developer at Businessnow Private Limited</span>, 
                  where I contribute to full-stack development using PHP, CodeIgniter, and modern JavaScript frameworks.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-6">
                <h3 className="text-xl font-semibold text-primary-text mb-4 flex items-center">
                  <HiLightBulb className="text-brand-secondary mr-3" />
                  Technical Expertise
                </h3>
                <p className="text-secondary-text leading-relaxed mb-4">
                  Specializing in building scalable web applications with expertise in:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-sm text-secondary-text"
                    >
                      <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-6">
                <h3 className="text-xl font-semibold text-primary-text mb-4 flex items-center">
                  <HiUserGroup className="text-light-text mr-3" />
                  Career Goals
                </h3>
                <p className="text-secondary-text leading-relaxed">
                  Seeking opportunities to leverage my technical skills in a dynamic environment where I can contribute 
                  to innovative projects, collaborate with talented teams, and continue growing as a full-stack developer 
                  while delivering exceptional user experiences.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-6 text-center hover:border-brand-accent/30 transition-all duration-300"
                >
                  <stat.icon className={`text-3xl ${stat.color} mb-3 mx-auto`} />
                  <div className="text-2xl font-bold text-primary-text mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary-text">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-4 flex items-center">
                <FaGraduationCap className="text-brand-accent mr-3" />
                Education
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-brand-accent pl-4">
                  <h4 className="text-primary-text font-semibold">Bachelor of Computer Application</h4>
                  <p className="text-brand-accent text-sm">Rajasthan University Stani Memorial P.G College</p>
                  <p className="text-secondary-text text-sm">2021 - 2024</p>
                </div>
                <div className="border-l-4 border-brand-secondary pl-4">
                  <h4 className="text-primary-text font-semibold">12th Grade</h4>
                  <p className="text-brand-secondary text-sm">RBSE Board Govt. Senior Secondary School</p>
                  <p className="text-secondary-text text-sm">2020 - 2021 • 79.20%</p>
                </div>
              </div>
            </motion.div>

            {/* Achievement Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-4 flex items-center">
                <FaAward className="text-light-text mr-3" />
                Notable Achievement
              </h3>
              <p className="text-secondary-text">
                <span className="text-light-text font-semibold">Top Scorer in Business Communication</span> - 
                Recognized for exceptional communication skills and academic excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;