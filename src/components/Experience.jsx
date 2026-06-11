import { motion } from "framer-motion";
import { BriefcaseBusiness, CheckCircle2, Database, Globe2, ServerCog, Users } from "lucide-react";

// const responsibilities = [
//   "Built and improved product workflows with React-style UI thinking, JavaScript, APIs, PHP, and CodeIgniter.",
//   "Handled user queries and improved workflows for smoother user experience.",
//   "Developed API-backed features that reduce manual effort and processing time.",
//   "Worked on server setup, deployment, SSL integration, backups, and uptime monitoring.",
// ];
const responsibilities = [
  "Developed and enhanced Comply Relax and NiyamHub, a compliance and regulatory management platform, using React, Node.js, PHP, CodeIgniter, and modern web technologies.",
  
  "Designed and integrated secure REST APIs, third-party services, and compliance workflows including MCA, GST, and regulatory automation processes.",
  
  "Built AI-assisted features and intelligent workflow automation to improve compliance tracking, document management, and operational efficiency.",
  
  "Implemented authentication, role-based access control, database optimization, deployment automation, SSL configuration, backups, and production monitoring.",
];

// const achievements = [
//   { icon: Globe2, label: "Product Website", text: "ComplyRelax.com" },
//   { icon: Database, label: "Database", text: "MySQL optimization" },
//   { icon: ServerCog, label: "Backend", text: "REST APIs and logic" },
//   { icon: Users, label: "Team", text: "Collaboration" },
// ];
const achievements = [
  {
    icon: Globe2,
    label: "Platforms",
    text: "ComplyRelax & NiyamHub",
  },
  {
    icon: Database,
    label: "Database",
    text: "MySQL & Query Optimization",
  },
  {
    icon: ServerCog,
    label: "Backend",
    text: "REST APIs & Automation",
  },
  {
    icon: Users,
    label: "Domain",
    text: "Compliance & Regulatory Tech",
  },
];

const Experience = () => {
  return (
    <div className="relative overflow-hidden bg-white/50 dark:bg-white/[0.02]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-kicker">Experience</div>
          <h2 id="experience-heading" className="section-title">Real product work, not just portfolio screens.</h2>
          <p className="section-copy mx-auto">
            My professional work now leans strongly toward React, Node.js-ready
            workflows, API integration, frontend improvements, database logic, and
            production maintenance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="mt-12 glass-panel overflow-hidden rounded-[2rem]"
        >
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-slate-200 p-6 sm:p-8 dark:border-white/10 lg:border-b-0 lg:border-r">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                <BriefcaseBusiness size={18} />
                Dec 2022 - Present
              </div>
              <h3 className="mt-7 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
                Full Stack Developer – AI & Automation
              </h3>
              <p className="mt-2 text-lg font-bold text-cyan-700 dark:text-cyan-300">
                Businessnow Private Limited
              </p>
              {/* <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                I contribute to full-stack development, API-backed feature delivery,
                user support, performance improvements, and the technical care needed
                to keep a web product dependable in production. PHP and CodeIgniter
                are part of my base experience, while React, Node.js, and API
                integration are my current growth focus.
              </p> */}
              {/* <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                Contributing to the development of Comply Relax and NiyamHub, an AI-powered compliance and
                regulatory management platform. My work includes full-stack development,
                API integrations, compliance workflow automation, database optimization,
                authentication systems, and production deployment. I actively build
                scalable solutions involving GST, MCA, legal compliance processes,
                document management, and AI-assisted business workflows.
              </p> */}
              
<p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
  Contributing to the development and enhancement of ComplyRelax and NiyamHub, innovative compliance and regulatory management platforms. My work includes full-stack development, REST API integrations, workflow automation, database optimization, authentication and authorization systems, and production deployments. I develop scalable solutions for GST, MCA, legal compliance, document management, and AI-powered business automation while ensuring high performance, security, and reliability.
</p>



              <div className="mt-8 grid grid-cols-2 gap-3">
                {achievements.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <item.icon className="text-cyan-600 dark:text-cyan-300" size={20} />
                    <p className="mt-3 text-sm font-black text-slate-950 dark:text-white">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h4 className="text-xl font-black text-slate-950 dark:text-white">Key Responsibilities</h4>
              <div className="mt-6 space-y-4">
                {responsibilities.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={20} />
                    <p className="leading-7 text-slate-600 dark:text-slate-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
