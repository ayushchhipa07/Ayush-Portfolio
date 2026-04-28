import { motion } from "framer-motion";
import { Award, Briefcase, Code2, GraduationCap, Layers3, Lightbulb, Rocket } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    title: "Production Experience",
    text: "Working as a Web Developer at Businessnow Private Limited, contributing to full-stack product development and daily business workflows.",
  },
  {
    icon: Layers3,
    title: "Full-Stack Mindset",
    text: "Comfortable across UI, backend logic, databases, APIs, deployment, SSL setup, backups, and performance-focused maintenance.",
  },
  {
    icon: Lightbulb,
    title: "Product Thinking",
    text: "I focus on practical interfaces, reliable data flows, and features that reduce effort for real users.",
  },
];

const highlights = [
  { icon: Code2, value: "2+", label: "Projects Delivered" },
  { icon: GraduationCap, value: "BCA", label: "Computer Applications" },
  { icon: Award, value: "3+", label: "Achievements" },
  { icon: Rocket, value: "Fast", label: "Learning Curve" },
];

const About = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="section-kicker">About me</div>
          <h2 className="section-title">
            A developer who connects clean UI with dependable backend systems.
          </h2>
          <p className="section-copy">
            I am a Computer Applications graduate from Jaipur, currently building and
            improving web products with PHP, CodeIgniter, JavaScript, React, MySQL,
            and modern tooling. My strength is turning business requirements into
            usable, stable, and responsive product experiences.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/60 dark:hover:border-cyan-300/30"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <card.icon size={22} />
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="glass-panel rounded-3xl p-5"
            >
              <item.icon className="text-cyan-600 dark:text-cyan-300" size={22} />
              <p className="mt-5 text-3xl font-black text-slate-950 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass-panel rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">Education</h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                Bachelor of Computer Application from Rajasthan University Stani
                Memorial P.G College, with a strong foundation in programming,
                databases, and web application development.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="font-black text-slate-950 dark:text-white">Bachelor of Computer Application</p>
                <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">2021 - 2024</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="font-black text-slate-950 dark:text-white">12th Grade, RBSE Board</p>
                <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">79.20%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
