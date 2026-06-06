import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

const projects = [
  // {
  //   title: "NiyamHub",
  //   subtitle: "AI-Powered Compliance, Legal & Regulatory Management Platform",
  //   // description:
  //   // "An enterprise-grade compliance and legal operations platform that helps professionals automate regulatory workflows, manage documents, track notices, monitor compliance deadlines, and leverage AI-powered assistance for faster decision-making.",
  //   description:
  //   "Designed and developed a full-stack enterprise compliance platform that automates MCA, GST, Income Tax, ROC, and legal compliance workflows. Built secure credential management, compliance tracking, notice management, director & entity management, payment gateway integration, real-time document synchronization, AI-powered compliance assistance, automated workflow automation, dashboard analytics, and user management modules.Securely user management with Fully secure encrypted data, role-based access control, and cloud-ready architecture.",
  //   image: "/Icon.svg",
  //   live: "https://niyamhub.com/", 
  //   tags: [
  //   "React.js",
  //   "Vite",
  //   "Node.js",
  //   "Express.js",
  //   "MySQL",
  //   "REST APIs",
  //   "JWT Authentication",
  //   "CryptoJS Encryption",
  //   "Cashfree Payment Gateway",
  //   "Server-Sent Events (SSE)",
  //   "AI Integration",  
  //   "Role Based Access Control",
  //   "Responsive UI"
  //   ],
  //  impact: [
  //     "AI Compliance Assistant",
  //     "MCA Compliance Automation",
  //     "GST Return Management",
  //     "ROC Compliance Tracking",
  //     "Notice & Order Monitoring",
  //     "Director & Entity Management",
  //     "Document Vault System",
  //     "Credential Management",
  //     "Cashfree Wallet & Payments",
  //     "Real-Time Sync Engine",
  //     "Multi-User Access Control",
  //     "Dashboard Analytics"
  //   ]
  //   // tags: ["React", "Vite", "Node.js", "MySQL", "REST API", "API Integration", "Tailwind CSS"],
  //   // impact: ["TAI Compliance Assistant", "Document Management", "Task Automation", "Notice Tracking", "ROC Compliance", "Dashboard Analytics"],
  // },
  {
  title: "NiyamHub",
  subtitle: "AI-Powered Compliance & Regulatory Management Platform",

  description:
    "Built a full-stack compliance platform for automating MCA, GST, Income Tax, and ROC workflows. Developed secure credential management, document vault, compliance tracking, AI-powered assistance, payment integration, and role-based access control with real-time synchronization.",

  image: "/NiyamHubLogo.jpeg",

  live: "https://niyamhub.com/",

  tags: [
    "React.js",
    "Node.js",
    "Express.js",
    "MySQL",
    "REST APIs",
    "JWT Auth",
    "Cashfree",
    "AI Integration"
  ],

  impact: [
    "MCA & ROC Compliance",
    "GST Management",
    "Income Tax Tracking",
    "AI Assistant",
    "Document Vault",
    "Director Management",
    // "Payments",
      "Cashfree Wallet & Payments",
    "Dashboard Analytics"
  ]
},
  {
    title: "ComplyRelax",
    subtitle: "AI-powered compliance and office management platform",
    description:
      "A centralized product for professionals like CS and CA to manage tasks, documents, compliance work, and productivity-focused workflows.",
    image: "/WebLogoComplyrelax.png",
    live: "https://complyrelax.com",
    tags: ["API Integration", "MySQL", "JavaScript", "PHP", "CodeIgniter", "Bootstrap", "AJAX"],
    impact: ["Task management", "API-backed workflows", "Document workflows", "User authentication", "Responsive UI"],
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
                    // className="max-h-24 max-w-64 object-contain drop-shadow-2xl transition duration-500 group-hover:scale-105"
                      // className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      className={`${
                        project.title === "NiyamHub"
                          ? "w-100 h-40 object-contain"
                          : "w-full h-40 object-contain"
                      }`}
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
