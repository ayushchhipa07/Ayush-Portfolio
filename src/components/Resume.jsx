import { motion } from 'framer-motion';
import { FaAward, FaBriefcase, FaCode, FaDownload, FaGraduationCap } from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';

const Resume = () => {
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

  return (
    <div className="min-h-screen bg-dark-secondary py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl"></div>
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
          <motion.span
            className="inline-block px-4 py-2 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-full text-brand-accent font-medium text-sm border border-brand-accent/30 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Professional Resume
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-6">
            My <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">Resume</span>
          </h2>
          <p className="text-secondary-text text-lg max-w-3xl mx-auto mb-8">
            Comprehensive overview of my education, experience, and professional achievements
          </p>
          
          {/* Download Button */}
          <motion.a
            href="/Ayush_Chhipa_Resume.pdf"
            download="Ayush_Chhipa_Resume.pdf"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-secondary text-white font-semibold rounded-full hover:shadow-xl hover:shadow-brand-accent/25 transition-all duration-300"
          >
            <FaDownload className="mr-2" />
            Download Full Resume
          </motion.a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Education & Experience */}
          <div className="space-y-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <FaGraduationCap className="text-brand-accent text-2xl mr-3" />
                Education
              </h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-brand-accent pl-4"
                  >
                    <h4 className="text-primary-text font-semibold mb-1">{edu.degree}</h4>
                    <p className="text-brand-accent text-sm mb-1">{edu.institution}</p>
                    <p className="text-secondary-text text-sm mb-1">{edu.period}</p>
                    <p className="text-secondary-text text-sm">{edu.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-dark-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary-text mb-6 flex items-center">
                <FaBriefcase className="text-brand-secondary text-2xl mr-3" />
                Work Experience
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-brand-secondary pl-4"
                  >
                    <h4 className="text-primary-text font-semibold mb-1">{exp.role}</h4>
                    <p className="text-brand-secondary text-sm mb-1">{exp.company}</p>
                    <p className="text-secondary-text text-sm mb-3">{exp.period} • {exp.location}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-sm text-secondary-text">
                          <div className="w-2 h-2 bg-brand-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills & Achievements */}
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
        </div>
      </div>
    </div>
  );
};

export default Resume;