import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

const projects = [
  {
    title: "ComplyRelax",
    subtitle: "AI-powered compliance and office management platform",
    description:
      "A centralized product for professionals like CS and CA to manage tasks, documents, compliance work, and productivity-focused workflows.",
    image: "/complyrelax.png",
    live: "https://complyrelax.com",
    tags: ["API Integration", "MySQL", "JavaScript", "PHP", "CodeIgniter", "Bootstrap", "AJAX"],
    impact: ["Task management", "API-backed workflows", "Document workflows", "User authentication", "Responsive UI"],
  },
  {
    title: "Ayush Portfolio",
    subtitle: "Modern responsive developer portfolio",
    description:
      "A polished React portfolio with dark and light mode, motion design, responsive sections, and a conversion-focused contact experience.",
    image: "/Icon.svg",
    github: "https://github.com/ayushchhipa07/Ayush-Portfolio",
    live: "#home",
    tags: ["React", "Node.js Ready", "API Integration", "Tailwind CSS", "Framer Motion", "Vite"],
    impact: ["Theme switcher", "Animated sections", "SEO-friendly structure", "Fast Vite build", "Mobile-first layout"],
  },
];

const Projects = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <div className="section-kicker">
              <Sparkles size={14} />
              Featured work
            </div>
            <h2 className="section-title">Projects with practical business value.</h2>
            <p className="section-copy">
              A compact showcase of the products and interfaces I have built or improved,
              with focus on usability, performance, and maintainable implementation.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:border-cyan-400 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
          >
            Start a Project
            <ArrowUpRight size={18} />
          </a>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="glass-panel group overflow-hidden rounded-[2rem]"
            >
              <div className="relative min-h-56 overflow-hidden bg-slate-950 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.32),transparent_28%),radial-gradient(circle_at_80%_5%,rgba(129,140,248,0.28),transparent_24%)]" />
                <div className="relative flex h-full min-h-44 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.05] p-8">
                  <img
                    src={project.image}
                    alt={`${project.title} logo`}
                    className="max-h-24 max-w-64 object-contain drop-shadow-2xl transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{project.subtitle}</p>
                <h3 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{project.title}</h3>
                <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {project.impact.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-1 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  <a
                    href={project.live}
                    target={project.live.startsWith("http") ? "_blank" : undefined}
                    rel={project.live.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-700 dark:bg-white dark:text-slate-950"
                  >
                    View Live
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
