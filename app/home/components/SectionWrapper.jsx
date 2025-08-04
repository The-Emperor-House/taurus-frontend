'use client';

import { motion } from "framer-motion";

export default function SectionWrapper({
  children,
  noPadding = false,
  className = "",
  variant = "fade-up",
  transition = {
    duration: 1.0,
    ease: [0.2, 0.65, 0.3, 0.9],
  },
  viewport = { once: true, amount: 0.3 },
}) {
  const animations = {
    "fade-up": {
      initial: { opacity: 0, y: 70 },
      whileInView: { opacity: 1, y: 0 },
    },
    "fade-in": {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
    },
  };

  const selectedAnimation = animations[variant] || animations["fade-up"];

  return (
    <motion.section
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      viewport={viewport}
      transition={transition}
      className={`relative z-10 ${noPadding ? "" : "max-w-7xl mx-auto px-4 md:px-8 py-16"} ${className}`}
    >
      {children}
    </motion.section>
  );
}