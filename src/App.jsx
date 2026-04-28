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
      <CustomCursor />
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default App;
