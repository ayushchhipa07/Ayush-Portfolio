import { BriefcaseBusiness, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 420);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 hidden px-4 md:block" aria-label="Quick contact actions">
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/90 p-2 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl dark:border-white/10 dark:bg-[#07111f]/90 dark:shadow-black/40">
        <a
          href="#contact"
          data-analytics="sticky-hire-me"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-700 dark:bg-white dark:text-slate-950"
        >
          <BriefcaseBusiness size={16} />
          Hire Me
        </a>
        <a
          href="mailto:ayushchhipa7@gmail.com?subject=Project%20Inquiry%20for%20Ayush%20Chhipa"
          data-analytics="sticky-email"
          aria-label="Email Ayush Chhipa"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
        >
          <Mail size={17} />
        </a>
        <a
          href="/Ayush_Chhipa_Resume.pdf"
          download="Ayush_Chhipa_Resume.pdf"
          data-analytics="sticky-resume"
          aria-label="Download Ayush Chhipa resume"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
        >
          <Download size={17} />
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
