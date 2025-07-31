import { motion } from "framer-motion";

export default function SectionWrapper({ children, noPadding }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative z-10 ${noPadding ? "" : "max-w-7xl mx-auto px-4 md:px-8 py-16"}`}
    >
      {children}
    </motion.section>
  );
}
