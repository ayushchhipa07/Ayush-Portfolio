import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { HiGlobe } from 'react-icons/hi';

import { FaAward } from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';
// const Resume = () => {
  const education = [
    {
      degree: "Bachelor of Computer Application",
      institution: "Rajasthan University Stani Memorial P.G College",
      period: "2021 - 2024",
      details: "Computer Science & Applications"
    },
    {
      degree: "12th Grade (Arts)",
      institution: "RBSE Board Govt. Senior Secondary School",
      period: "2020 - 2021",
      details: "Percentage: 79.20%"
    },
    {
      degree: "10th Grade",
      institution: "RBSE Board Govt. Senior Secondary School",
      period: "2018 - 2019",
      details: "Percentage: 53.76%"
    }
  ];

  const experience = [
    {
      role: "Web Developer",
      company: "Businessnow Private Limited",
      period: "Dec 2022 - Present",
      location: "Jaipur, Rajasthan",
      achievements: [
        "Contributed to full-stack development of ComplyRelax.com using Core PHP and CodeIgniter (MVC)",
        "Designed and maintained backend logic, REST APIs, and database operations using MySQL",
        "Enhanced website functionality and user experience through active participation in design and development",
        "Implemented new features and optimized existing functionalities"
      ]
    }
  ];

  const skills = [
    { category: "Programming Languages", items: ["C", "C++", "Java", "PHP", "JavaScript", "HTML", "CSS", "SQL", "Node.js"] },
    { category: "Frameworks & Libraries", items: ["CodeIgniter (MVC)", "Bootstrap", "jQuery", "React"] },
    { category: "Databases & Tools", items: ["MySQL", "SQL Server", "Git", "GitHub", "Postman", "cURL", "AJAX", "Apache"] }
  ];

  const achievements = [
    "Awarded as the Top Scorer in Business Communication",
    "Certified in PHP from Businessnow Private Limited (1 Year)",
    "Strong foundation in web development and modern technologies"
  ];
// }
const Skills = () => {
  const skillCategories = [
    // {
    //   title: "Programming Languages",
    //   icon: HiCode,
    //   color: "text-brand-accent",
    //   skills: [
    //     { name: 'C', icon: FaCode, level: 80 },
    //     { name: 'C++', icon: FaCode, level: 75 },
    //     { name: 'Java', icon: FaJava, level: 80 },
    //     { name: 'PHP', icon: FaPhp, level: 90 },
    //     { name: 'JavaScript', icon: SiJavascript, level: 85 },
    //     { name: 'HTML', icon: FaHtml5, level: 95 },
    //     { name: 'CSS', icon: FaCss3Alt, level: 90 },
    //     { name: 'SQL', icon: FaDatabase, level: 85 },
    //     { name: 'Node.js', icon: FaNodeJs, level: 75 }
    //   ]
    // },
    // {
    //   title: "Frameworks & Libraries",
    //   icon: HiServer,
    //   color: "text-brand-secondary",
    //   skills: [
    //     { name: 'CodeIgniter (MVC)', icon: SiCodeigniter, level: 85 },
    //     { name: 'Bootstrap', icon: FaBootstrap, level: 90 },
    //     { name: 'jQuery', icon: SiJquery, level: 85 },
    //     { name: 'React', icon: FaReact, level: 80 }
    //   ]
    // },
    // {
    //   title: "Databases & Tools",
    //   icon: HiDatabase,
    //   color: "text-light-text",
    //   skills: [
    //     { name: 'MySQL', icon: SiMysql, level: 85 },
    //     { name: 'SQL Server', icon: FaDatabase, level: 80 },
    //     { name: 'Git', icon: FaGitAlt, level: 85 },
    //     { name: 'GitHub', icon: FaGithub, level: 90 },
    //     { name: 'Postman', icon: SiPostman, level: 80 },
    //     { name: 'cURL', icon: SiCurl, level: 75 },
    //     { name: 'AJAX', icon: FaCode, level: 80 },
    //     { name: 'Apache', icon: SiApache, level: 75 }
    //   ]
    // }
  ];

  const softSkills = [
    { name: 'Analytical Thinking', level: 90 },
    { name: 'Fast Learner', level: 95 },
    { name: 'Team Collaboration', level: 85 },
    { name: 'Adaptability', level: 90 },
    { name: 'Problem Solving', level: 85 },
    { name: 'Communication', level: 80 }
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-10 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        > 
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6">
            Skills & <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-secondary-text text-lg max-w-3xl mx-auto">
            Comprehensive skill set in modern web development technologies and frameworks
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Technical Skills */}
             <div className="space-y-8">
                        {/* Technical Skills */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                        >
                          <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                            <FaCode className="text-light-text text-2xl mr-3" />
                            Technical Skills
                          </h3>
                          <div className="space-y-4">
                            {skills.map((skillGroup, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <h4 className="text-primary-text font-medium mb-2">{skillGroup.category}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {skillGroup.items.map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs text-brand-accent"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
            
                        {/* Achievements */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="bg-gradient-to-r from-brand-accent/10 to-brand-secondary/10 border border-brand-accent/20 rounded-2xl p-6"
                        >
                          <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                            <FaAward className="text-light-text text-2xl mr-3" />
                            Achievements & Certifications
                          </h3>
                          <div className="space-y-3">
                            {achievements.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start text-sm text-secondary-text"
                              >
                                <div className="w-2 h-2 bg-light-text rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
            
                        {/* Key Highlights */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                        >
                          <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                            <HiLightBulb className="text-brand-accent text-2xl mr-3" />
                            Key Highlights
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm text-secondary-text">
                              <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                              Proficient in PHP, JavaScript, and modern web technologies
                            </div>
                            <div className="flex items-center text-sm text-secondary-text">
                              <div className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></div>
                              Experience with full-stack development using CodeIgniter and React
                            </div>
                            <div className="flex items-center text-sm text-secondary-text">
                              <div className="w-2 h-2 bg-light-text rounded-full mr-3"></div>
                              Strong problem-solving and analytical thinking skills
                            </div>
                            <div className="flex items-center text-sm text-secondary-text">
                              <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                              Team collaboration and fast learning capabilities
                            </div>
                          </div>
                        </motion.div>
                      </div>

          {/* Right Column - Soft Skills & Certifications */}
          <div className="space-y-8">
            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <HiGlobe className="text-light-text text-2xl mr-3" />
                Soft Skills
              </h3>
              <div className="space-y-4">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary-text">{skill.name}</span>
                      <span className="text-xs text-brand-accent">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-light-text to-brand-accent h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-brand-accent/10 to-brand-secondary/10 border border-brand-accent/20 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <FaCode className="text-brand-accent text-2xl mr-3" />
                Certifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-dark-bg/30 rounded-lg">
                  <div>
                    <h4 className="text-primary-text font-medium">PHP Development</h4>
                    <p className="text-sm text-secondary-text">Businessnow Private Limited</p>
                  </div>
                  <span className="text-xs text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">1 Year</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-bg/30 rounded-lg">
                  <div>
                    <h4 className="text-primary-text font-medium">Web Development</h4>
                    <p className="text-sm text-secondary-text">Self-Certified</p>
                  </div>
                  <span className="text-xs text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded-full">Current</span>
                </div>
              </div>
            </motion.div>

            {/* Key Highlights */}
            {/* <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <HiGlobe className="text-light-text text-2xl mr-3" />
                Key Highlights
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-secondary-text">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                  Proficient in PHP, JavaScript, and modern web technologies
                </div>
                <div className="flex items-center text-sm text-secondary-text">
                  <div className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></div>
                  Experience with full-stack development using CodeIgniter and React
                </div>
                <div className="flex items-center text-sm text-secondary-text">
                  <div className="w-2 h-2 bg-light-text rounded-full mr-3"></div>
                  Strong problem-solving and analytical thinking skills
                </div>
                <div className="flex items-center text-sm text-secondary-text">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                  Team collaboration and fast learning capabilities
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;