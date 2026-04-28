import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Code2, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const current = links
        .map((link) => document.querySelector(link.href))
        .filter(Boolean)
        .findLast((section) => window.scrollY + 140 >= section.offsetTop);

      if (current?.id) setActiveSection(current.id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-slate-200 bg-white/80 shadow-lg shadow-slate-200/70 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07111f]/80 dark:shadow-black/30"
            : "border-transparent bg-white/45 backdrop-blur-md dark:bg-white/[0.03]"
        }`}
      >
        <a href="#home" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white shadow-lg shadow-cyan-500/20 dark:bg-white dark:text-slate-950">
            <Code2 size={20} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-tight sm:text-base">Ayush Chhipa</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 sm:block">
              Full stack developer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-slate-950 dark:text-white"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-slate-100 ring-1 ring-slate-200 dark:bg-white/[0.08] dark:ring-white/10"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 dark:border-white/10 dark:bg-white/[0.07] dark:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-cyan-700 dark:bg-white dark:text-slate-950 dark:shadow-cyan-950/30 md:inline-flex"
          >
            <BriefcaseBusiness size={16} />
            Hire Me
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/[0.07] dark:text-white lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07111f]/95 dark:shadow-black/40 lg:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-base font-semibold ${
                  activeSection === link.href.slice(1)
                    ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white dark:bg-white dark:text-slate-950"
            >
              <BriefcaseBusiness size={18} />
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
