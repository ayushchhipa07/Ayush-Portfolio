import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 antialiased selection:bg-cyan-300/40 selection:text-slate-950 dark:bg-[#050816] dark:text-white">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-lg focus:not-sr-only dark:bg-slate-950 dark:text-white"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <Navbar theme={theme} setTheme={setTheme} />
      <main id="main-content">
        <section id="home" aria-labelledby="home-heading">
          <Hero />
        </section>
        <section id="about" aria-labelledby="about-heading">
          <About />
        </section>
        <section id="experience" aria-labelledby="experience-heading">
          <Experience />
        </section>
        <section id="projects" aria-labelledby="projects-heading">
          <Projects />
        </section>
        <section id="skills" aria-labelledby="skills-heading">
          <Skills />
        </section>
        <section id="contact" aria-labelledby="contact-heading">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default App;
