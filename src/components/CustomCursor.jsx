import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "a, button, input, textarea, select, [role='button']";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return undefined;

    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
      setIsInteractive(Boolean(event.target.closest(interactiveSelector)));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.2 }}
      />
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 1.65 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.4 }}
      />
    </>
  );
};

export default CustomCursor;
