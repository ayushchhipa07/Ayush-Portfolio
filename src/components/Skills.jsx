import { motion } from "framer-motion";
import { BadgeCheck, Brain, Code2, Database, Globe2, Hammer } from "lucide-react";

const skillGroups = [
  {
    icon: Code2,
    title: "Languages",
    items: ["JavaScript", "PHP", "SQL", "HTML", "CSS", "C", "C++", "Java", "Node.js"],
  },
  {
    icon: Hammer,
    title: "Frameworks",
    items: ["React", "CodeIgniter MVC", "Bootstrap", "Tailwind CSS", "jQuery"],
  },
  {
    icon: Database,
    title: "Database & Tools",
    items: ["MySQL", "SQL Server", "Git", "GitHub", "Postman", "AJAX", "cURL", "Apache"],
  },
];

const softSkills = [
  { name: "Problem Solving", level: 88 },
  { name: "Fast Learning", level: 95 },
  { name: "Team Collaboration", level: 86 },
  { name: "Communication", level: 82 },
  { name: "Adaptability", level: 90 },
];

const certifications = [
  "HackerRank Certified - Software Engineer Intern",
  "PHP Development certification from Businessnow Private Limited",
  "Top Scorer in Business Communication",
];

const Skills = () => {
  return (
    <div className="relative overflow-hidden bg-white/50 dark:bg-white/[0.02]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-kicker">
            <Globe2 size={14} />
            Skill stack
          </div>
          <h2 className="section-title">A practical toolkit for full-stack delivery.</h2>
          <p className="section-copy mx-auto">
            I combine frontend craft, backend implementation, database thinking, and
            communication skills to move features from idea to production.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="glass-panel rounded-3xl p-6"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <group.icon size={22} />
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <Brain className="text-cyan-600 dark:text-cyan-300" size={24} />
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">Professional Strengths</h3>
            </div>
            <div className="mt-7 space-y-5">
              {softSkills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <BadgeCheck className="text-cyan-600 dark:text-cyan-300" size={24} />
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">Certifications</h3>
            </div>
            <div className="mt-7 space-y-4">
              {certifications.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                  <BadgeCheck className="mt-0.5 shrink-0 text-emerald-500" size={19} />
                  <p className="leading-7 text-slate-600 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
            <a
              href="https://www.hackerrank.com/certificates/iframe/ca4f374cd071"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:border-cyan-400 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              View HackerRank Certificate
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
