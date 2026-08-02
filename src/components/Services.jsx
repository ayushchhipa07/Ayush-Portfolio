import { ArrowUpRight, Code2, DatabaseZap, Globe2, LifeBuoy, ServerCog, Sparkles } from "lucide-react";

const services = [
  {
    icon: Globe2,
    title: "Business Website Development",
    intent: "For founders, local businesses, and professionals who need a fast, credible website.",
    deliverables: ["Responsive React UI", "SEO-ready pages", "Lead-focused sections", "Launch support"],
  },
  {
    icon: ServerCog,
    title: "Full-Stack Web Applications",
    intent: "For dashboards, admin panels, portals, CRM-style tools, and internal workflows.",
    deliverables: ["React frontend", "Node.js and Express APIs", "Authentication", "Role-based access"],
  },
  {
    icon: DatabaseZap,
    title: "API Integration and Automation",
    intent: "For teams that want cleaner data flow between payments, forms, CRMs, and product systems.",
    deliverables: ["REST API integration", "MySQL workflows", "Webhook handling", "Testing with Postman"],
  },
  {
    icon: LifeBuoy,
    title: "Maintenance and Bug Fixing",
    intent: "For existing React, PHP, CodeIgniter, JavaScript, or MySQL websites that need reliable care.",
    deliverables: ["Bug diagnosis", "Performance fixes", "Security review", "Deployment support"],
  },
];

const quickFacts = [
  ["Primary role", "Full-stack web developer"],
  ["Location", "Jaipur, Rajasthan, India"],
  ["Core stack", "React, Node.js, Express.js, MySQL, JavaScript, PHP, CodeIgniter"],
  ["Best-fit work", "Business websites, dashboards, API integrations, compliance workflows, maintenance"],
  ["Engagement style", "Freelance, contract, remote, part-time, and recruiter conversations"],
  ["Contact", "ayushchhipa7@gmail.com"],
];

const Services = () => {
  return (
    <div className="relative overflow-hidden bg-white/50 dark:bg-white/[0.02]">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="section-kicker">
              <Sparkles size={14} />
              Services
            </div>
            <h2 id="services-heading" className="section-title">
              Hire a developer for practical web products, not just pretty screens.
            </h2>
            <p className="section-copy">
              I help with React websites, Node.js APIs, MySQL-backed dashboards, PHP and CodeIgniter maintenance,
              business automation, and production workflows for companies in Jaipur, India, and remote teams.
            </p>
          </div>
          <a
            href="mailto:ayushchhipa7@gmail.com?subject=Project%20Inquiry%20for%20Ayush%20Chhipa"
            data-analytics="services-email-inquiry"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-700 dark:bg-white dark:text-slate-950"
          >
            Email Project Brief
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="glass-panel rounded-3xl p-6 sm:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                  <service.icon size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{service.intent}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside
          className="mt-6 glass-panel rounded-3xl p-6 sm:p-8"
          aria-labelledby="quick-facts-heading"
        >
          <div className="flex items-center gap-3">
            <Code2 className="text-cyan-600 dark:text-cyan-300" size={24} />
            <h3 id="quick-facts-heading" className="text-2xl font-black text-slate-950 dark:text-white">
              Quick facts for recruiters and clients
            </h3>
          </div>
          <dl className="mt-7 grid gap-3 md:grid-cols-2">
            {quickFacts.map(([term, value]) => (
              <div
                key={term}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                  {term}
                </dt>
                <dd className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
};

export default Services;
