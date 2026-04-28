import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Braces,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

const techStack = ["React", "Node.js", "API Integration", "Express.js", "MySQL", "Tailwind CSS", "PHP"];

const metrics = [
  { value: "2+", label: "Years", detail: "hands-on experience" },
  { value: "3+", label: "Certificates", detail: "verified learning" },
  { value: "MCA", label: "AI Specialization", detail: "started in 2026" },
];

const codeLines = [
  "const developer = 'Ayush Chhipa';",
  "stack.build(['React', 'Node.js', 'APIs']);",
  "ship(cleanUI && scalableBackend);",
];

const Hero = () => {
  return (
    <div className="relative isolate min-h-screen overflow-hidden pt-28">
      <div className="aurora absolute inset-0 -z-20" />
      <div className="animated-grid absolute inset-0 -z-10" />
      <div className="hero-scanline absolute inset-x-0 top-24 -z-10 h-px" />

      <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 pt-8 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="section-kicker">
            <Sparkles size={14} />
            Ayush Chhipa Portfolio
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Hi, I am{" "}
            <span className="hero-gradient-text">Ayush Chhipa</span>.
            <span className="block pt-2 text-3xl sm:text-4xl lg:text-5xl">
              I build React, Node.js and API-powered web applications.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            Full-stack web developer from Jaipur focused on React, Node.js,
            API integrations, MySQL, and production-ready web workflows. I also
            work with PHP and CodeIgniter from real product experience.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + index * 0.08 }}
                className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
              >
                <p className="text-3xl font-black text-cyan-700 dark:text-cyan-300">{metric.value}</p>
                <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">{metric.label}</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{metric.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-1 hover:bg-cyan-700 dark:bg-white dark:text-slate-950 dark:shadow-cyan-950/30"
            >
              See My Work
              <ArrowRight size={18} />
            </a>
            <a
              href="/Ayush_Chhipa_Resume.pdf"
              download="Ayush_Chhipa_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.045 }}
                className="chip hover-lift"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <motion.div
            className="absolute -left-3 top-16 hidden rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/80 dark:shadow-black/30 sm:block"
            animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <BadgeCheck size={20} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Status</p>
                <p className="font-black text-slate-950 dark:text-white">Open to work</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-2 bottom-20 hidden rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/80 dark:shadow-black/30 md:block"
            animate={{ y: [0, 12, 0], rotate: [1, -1, 1] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <MapPin size={19} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Based in</p>
                <p className="font-black text-slate-950 dark:text-white">Jaipur, India</p>
              </div>
            </div>
          </motion.div>

          <div className="glass-panel hero-card relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_100%_20%,rgba(236,72,153,0.12),transparent_24%)]" />
            <div className="relative rounded-[1.5rem] border border-white/10 bg-slate-950 p-5 text-white shadow-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                    <Code2 size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Developer Console</p>
                    <p className="mt-1 text-xl font-black">Ayush Chhipa</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="code-window rounded-3xl bg-[#07111f] p-5 ring-1 ring-white/10">
                <div className="mb-4 flex items-center gap-2 text-cyan-300">
                  <Braces size={18} />
                  <span className="text-sm font-bold">portfolio.config.js</span>
                </div>
                <div className="space-y-3 font-mono text-sm leading-7">
                  {codeLines.map((line, index) => (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + index * 0.16 }}
                      className="text-slate-300"
                    >
                      <span className="mr-3 select-none text-slate-600">0{index + 1}</span>
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <a className="hero-social" href="mailto:ayushchhipa7@gmail.com" aria-label="Email Ayush Chhipa">
                  <Mail size={18} />
                  Email
                </a>
                <a className="hero-social" href="https://github.com/ayushchhipa07" target="_blank" rel="noreferrer" aria-label="Ayush Chhipa GitHub">
                  <Github size={18} />
                  GitHub
                </a>
                <a className="hero-social" href="https://www.linkedin.com/in/ayush-chhipa/" target="_blank" rel="noreferrer" aria-label="Ayush Chhipa LinkedIn">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
