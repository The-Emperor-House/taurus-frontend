"use client";

import Link from "next/link";         
import Image from "next/image";
import { motion } from "framer-motion"; 
import { cn } from "@/lib/cn";
import useIsTouch from "@/hooks/useIsTouch";


const titleVariants = {
hidden: { opacity: 0, y: 8 },
show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};
const descVariants = {
hidden: { opacity: 0, y: 8 },
show: { opacity: 1, y: 0, transition: { delay: 0.06, type: "spring", stiffness: 280, damping: 24 } },
};


function CardVignette() {
return (
<>
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(0,0,0,0.45),rgba(0,0,0,0.15)_60%,rgba(0,0,0,0)_85%)]" />
<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0)_30%,rgba(0,0,0,0)_70%,rgba(0,0,0,0.3))]" />
</>
);
}


function AnimatedUnderline({ isTouch }) {
return (
<motion.div
initial={isTouch ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.8 }}
whileHover={!isTouch ? { scaleX: 1, opacity: 1 } : undefined}
transition={{ duration: 0.45, ease: "easeOut" }}
className="mx-auto my-3 h-[2px] w-2/5 origin-left bg-gradient-to-r from-white/0 via-white/80 to-white/0"
/>
);
}


export default function ProjectCard({ title, description, imageSrc, href, className }) {
const isTouch = useIsTouch();


return (
<motion.article
whileHover={!isTouch ? { y: -3 } : undefined}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
className={cn(
"group relative w-full aspect-[3/4] overflow-hidden rounded-2xl",
"bg-neutral-950/70 ring-1 ring-white/10 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)]",
className
)}
>
{/* shimmer border */}
<div className="pointer-events-none absolute inset-0 rounded-2xl before:absolute before:inset-[-1px] before:rounded-[inherit] before:bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.25)_0deg,rgba(255,255,255,0.03)_120deg,rgba(255,255,255,0.25)_240deg,rgba(255,255,255,0.03)_360deg)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100" />


<Link href={href} className="absolute inset-0 block focus:outline-none" aria-label={title}>
<div className="absolute inset-0">
<Image
src={imageSrc}
alt={title}
fill
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
className={cn("object-cover transition-transform duration-700", "group-hover:scale-[1.02]")}
priority={false}
/>
</div>


<CardVignette />


{/* Centered text */}
<div className="absolute inset-0 z-10 flex items-center justify-center p-5 sm:p-6">
<motion.div initial={isTouch ? "show" : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[85%] text-center">
<motion.h3
variants={titleVariants}
className={cn(
"text-white font-extrabold uppercase",
"tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.26em]",
"text-lg sm:text-xl md:text-2xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
)}
>
{title}
</motion.h3>
<AnimatedUnderline isTouch={isTouch} />
<motion.p variants={descVariants} className="text-white/90 text-sm sm:text-base font-light drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]">
{description}
</motion.p>
</motion.div>
</div>


{/* a11y focus ring */}
<span className="absolute inset-0 rounded-2xl ring-2 ring-transparent transition focus-visible:ring-white/60" />
</Link>


{/* inner border on hover */}
<div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />
</motion.article>
);
}