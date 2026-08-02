import { CalendarCheck2, CheckCircle2, ClipboardList, Rocket, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Scope the outcome",
    text: "We define the business goal, users, required pages or features, integrations, and launch expectations before code starts.",
  },
  {
    icon: CalendarCheck2,
    title: "2. Estimate clearly",
    text: "Pricing depends on scope, urgency, integrations, and support needs. I share a practical timeline and milestone plan.",
  },
  {
    icon: CheckCircle2,
    title: "3. Build in public checkpoints",
    text: "You get progress updates, testable versions, and focused revisions so the project stays aligned with the real workflow.",
  },
  {
    icon: Rocket,
    title: "4. Launch and verify",
    text: "I check responsive behavior, forms, links, metadata, performance basics, deployment configuration, and production readiness.",
  },
  {
    icon: ShieldCheck,
    title: "5. Support after launch",
    text: "I can help with bug fixes, small improvements, backups, security hygiene, and maintenance after release.",
  },
];

const trustSignals = [
  "Open to freelance, contract, and recruiter conversations",
  "Based in Jaipur and available for remote collaboration",
  "Comfortable with React, Node.js, Express, MySQL, PHP, and CodeIgniter",
  "Experience with compliance platforms, authentication, APIs, payments, and deployment",
];

const Process = () => {
  return (
    <div className="relative overflow-hidden bg-white/50 dark:bg-white/[0.02]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Process</div>
          <h2 id="process-heading" className="section-title">
            A clear workflow for websites, dashboards, APIs, and maintenance.
          </h2>
          <p className="section-copy mx-auto">
            The goal is simple: understand the business problem, build the useful parts first, keep the implementation
            maintainable, and launch with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {steps.map((step) => (
            <article
              key={step.title}
              className="glass-panel rounded-3xl p-5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                <step.icon size={21} />
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">Availability</h3>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">
              I am available for selected freelance projects, contract roles, part-time developer work, and full-time
              recruiter discussions. Email is the best first contact channel.
            </p>
            <a
              href="#contact"
              data-analytics="process-contact"
              className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-700 dark:bg-white dark:text-slate-950"
            >
              Start a Conversation
            </a>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">Trust signals</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={19} />
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
