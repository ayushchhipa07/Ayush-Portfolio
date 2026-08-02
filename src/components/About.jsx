import { Award, Briefcase, Code2, GraduationCap, Layers3, Lightbulb, Rocket } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    title: "Production Experience",
    text: "Working as a Web Developer at Businessnow Private Limited, contributing to React, Node.js, API integration, and full-stack product workflows.",
  },
  {
    icon: Layers3,
    title: "API-First Full-Stack Mindset",
    text: "Comfortable across modern UI, Node.js backend logic, API integrations, databases, deployment, and performance-focused maintenance.",
  },
  {
    icon: Lightbulb,
    title: "Product Thinking",
    text: "I focus on practical interfaces, reliable data flows, and features that reduce effort for real users.",
  },
];

const highlights = [
  { icon: Code2, value: "3+", label: "Projects Delivered" },
  { icon: GraduationCap, value: "MCA", label: "AI Specialization" },
  { icon: Award, value: "3+", label: "Achievements" },
  { icon: Rocket, value: "Fast", label: "Learning Curve" },
];

const About = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="section-shell">
        <div className="max-w-3xl">
          <div className="section-kicker">About me</div>
          <h2 id="about-heading" className="section-title">
            A developer who connects clean UI with dependable backend systems.
          </h2>
          <p className="section-copy">
            I am a Computer Applications graduate from Jaipur and currently pursuing
            MCA with AI specialization from 2026. My current focus is React, Node.js,
            API integration, MySQL, and modern product workflows, while PHP and
            CodeIgniter remain part of my production experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/60 dark:hover:border-cyan-300/30"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <card.icon size={22} />
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="glass-panel rounded-3xl p-5"
            >
              <item.icon className="text-cyan-600 dark:text-cyan-300" size={22} />
              <p className="mt-5 text-3xl font-black text-slate-950 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-panel rounded-3xl p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white">Education</h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                My foundation started with BCA, and I am now advancing into MCA
                with AI specialization from 2026 to strengthen my software
                engineering and AI-focused product development skills.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-cyan-300/50 bg-cyan-50 p-5 dark:border-cyan-300/20 dark:bg-cyan-300/[0.06]">
                <p className="font-black text-slate-950 dark:text-white">MCA in AI Specialization</p>
                <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">2026 - Present</p>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default About;
