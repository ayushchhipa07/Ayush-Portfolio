import { motion } from "framer-motion";
import { FaAward, FaCode } from "react-icons/fa";
import { HiGlobe, HiLightBulb } from "react-icons/hi";

const Skills = () => {
  const skills = [
    {
      category: "Programming Languages",
      items: ["C", "C++", "Java", "PHP", "JavaScript", "HTML", "CSS", "SQL", "Node.js"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["CodeIgniter (MVC)", "Bootstrap", "jQuery", "React"],
    },
    {
      category: "Databases & Tools",
      items: ["MySQL", "SQL Server", "Git", "GitHub", "Postman", "cURL", "AJAX", "Apache"],
    },
  ];

  const achievements = [
    "Awarded as the Top Scorer in Business Communication",
    "Certified in PHP from Businessnow Private Limited (1 Year)",
    "Strong foundation in web development and modern technologies",
  ];

  const softSkills = [
    { name: "Analytical Thinking", level: 90 },
    { name: "Fast Learner", level: 95 },
    { name: "Team Collaboration", level: 85 },
    { name: "Adaptability", level: 90 },
    { name: "Problem Solving", level: 85 },
    { name: "Communication", level: 80 },
  ];

  return (
    <div
      className="min-h-screen 
      bg-white dark:bg-dark-bg 
      text-black dark:text-white 
      pt-10 px-4 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-32 h-32 bg-brand-accent/10 dark:bg-brand-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-brand-secondary/10 dark:bg-brand-secondary/10 rounded-full blur-3xl"></div>
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
          <h2
            className="text-4xl md:text-5xl font-bold 
            text-black dark:text-primary-text mb-6"
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-brand-accent to-brand-secondary bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          <p
            className="text-gray-700 dark:text-secondary-text 
            text-lg max-w-3xl mx-auto"
          >
            Comprehensive skill set in modern web development technologies and frameworks
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="
                rounded-2xl 
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-dark-card/50 
                backdrop-blur-sm 
                p-6 transition-colors duration-300"
            >
              <h3
                className="text-xl font-semibold 
                  text-black dark:text-primary-text 
                  mb-6 flex items-center"
              >
                <FaCode className="text-brand-accent text-2xl mr-3" />
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
                    <h4 className="text-black dark:text-primary-text font-medium mb-2">
                      {skillGroup.category}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 
                          bg-gray-200 dark:bg-brand-accent/10 
                          border border-gray-300 dark:border-brand-accent/20 
                          rounded-full text-xs 
                          text-black dark:text-brand-accent"
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
              transition={{ duration: 0.8 }}
              className="
                rounded-2xl 
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-dark-card/50 
                backdrop-blur-sm p-6"
            >
              <h3
                className="text-xl font-semibold text-black dark:text-primary-text mb-6 flex items-center"
              >
                <FaAward className="text-brand-accent text-2xl mr-3" />
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
                    className="flex items-start text-sm 
                    text-gray-700 dark:text-secondary-text"
                  >
                    <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 mr-3"></div>
                    <span>{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                rounded-2xl 
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-dark-card/50 
                backdrop-blur-sm p-6"
            >
              <h3
                className="text-xl font-semibold 
                text-black dark:text-primary-text mb-6 flex items-center"
              >
                <FaCode className="text-brand-accent text-2xl mr-3" />
                Certifications
              </h3>

              <div className="flex items-center justify-between p-3 bg-gray-200 dark:bg-dark-bg/30 rounded-lg">
                <div>
                  <h4 className="text-black dark:text-primary-text font-medium">
                    PHP Development
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-secondary-text">
                    Businessnow Private Limited
                  </p>
                </div>

                <span className="text-xs text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-full">
                  1 Year
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                rounded-2xl 
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-dark-card/50 
                backdrop-blur-sm p-6"
            >
              <h3
                className="text-xl font-semibold 
                text-black dark:text-primary-text mb-6 flex items-center"
              >
                <HiGlobe className="text-brand-accent text-2xl mr-3" />
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
                      <span className="text-sm text-gray-700 dark:text-secondary-text">
                        {skill.name}
                      </span>
                      <span className="text-xs text-brand-accent">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-gray-300 dark:bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-brand-accent to-brand-secondary h-2 rounded-full"
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

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                rounded-2xl 
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-dark-card/50 
                backdrop-blur-sm p-6"
            >
              <h3
                className="text-xl font-semibold 
                text-black dark:text-primary-text mb-6 flex items-center"
              >
                <HiLightBulb className="text-brand-accent text-2xl mr-3" />
                Key Highlights
              </h3>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700 dark:text-secondary-text">
                  <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                  Proficient in PHP, JavaScript, and modern web technologies
                </div>

                <div className="flex items-center text-sm text-gray-700 dark:text-secondary-text">
                  <div className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></div>
                  Experience with full-stack development using CodeIgniter and React
                </div>

                <div className="flex items-center text-sm text-gray-700 dark:text-secondary-text">
                  <div className="w-2 h-2 bg-light-text rounded-full mr-3"></div>
                  Strong problem-solving and analytical thinking skills
                </div>

                <div className="flex items-center text-sm text-gray-700 dark:text-secondary-text">
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

export default Skills;
