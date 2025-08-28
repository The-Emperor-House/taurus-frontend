'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/shared/lib/cn';
import useIsTouch from '@/shared/hooks/useIsTouch';

/* ================================
 * Variants
 * ================================ */
const cardLift = { rest: { y: 0 }, hover: { y: -3 } };
const titleV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};
const descV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { delay: 0.06, type: 'spring', stiffness: 280, damping: 24 } },
};

/* ================================
 * Presentational
 * ================================ */
const CardVignette = memo(function CardVignette() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(0,0,0,0.45),rgba(0,0,0,0.15)_60%,rgba(0,0,0,0)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0)_30%,rgba(0,0,0,0)_70%,rgba(0,0,0,0.3))]" />
    </>
  );
});

const AnimatedUnderline = memo(function AnimatedUnderline() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-10%', amount: 0.5, once: true });

  return (
    <motion.div
      ref={ref}
      variants={{ rest: { scaleY: 1, opacity: 0.9 }, hover: { scaleY: 1.6, opacity: 1 } }}
      initial={{ scaleX: 0, opacity: 0.7 }}
      animate={inView ? { scaleX: 1, opacity: 0.9 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto my-3 h-[2px] w-[clamp(120px,6vw,180px)] origin-left bg-gradient-to-r from-white/0 via-white/80 to-white/0"
      style={{ transformOrigin: 'left' }}
    />
  );
});

/* ================================
 * Main
 * ================================ */
/**
 * @typedef {'sm' | 'md' | 'lg' | 'xl'} Size
 */

const sizeClass = {
  // สูงขั้นต่ำ + อัตราส่วนภาพ ปรับตามจอ
  sm: 'min-h-[240px] aspect-[3/4] md:min-h-[280px]',
  md: 'min-h-[300px] aspect-[3/4] md:min-h-[360px]',
  lg: 'min-h-[360px] aspect-[3/4] md:min-h-[420px]',
  xl: 'min-h-[420px] aspect-[3/4] md:min-h-[520px]',
};

function ProjectCardBase({
  title,
  description,
  imageSrc,
  href,
  priority = false,
  className,
  size = 'md',
}) {
  const isTouch = useIsTouch();
  const cardInitial = useMemo(() => (isTouch ? 'hover' : 'rest'), [isTouch]);
  const textInitial = useMemo(() => (isTouch ? 'show' : 'hidden'), [isTouch]);

  return (
    <motion.article
      initial={cardInitial}
      animate="rest"
      whileHover="hover"
      variants={cardLift}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl',
        sizeClass[size],
        'bg-neutral-950/70 ring-1 ring-white/10 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)]',
        className
      )}
    >
      {/* shimmer border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl before:absolute before:inset-[-1px] before:rounded-[inherit] before:bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.25)_0deg,rgba(255,255,255,0.03)_120deg,rgba(255,255,255,0.25)_240deg,rgba(255,255,255,0.03)_360deg)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100" />

      <Link href={href} aria-label={title} className="absolute inset-0 block focus:outline-none">
        {/* image */}
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1536px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        <CardVignette />

        {/* centered text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-5 sm:p-6">
          <motion.div initial={textInitial} whileInView="show" viewport={{ once: true, amount: 0.4 }} className="mx-auto max-w-[85%] text-center">
            <motion.h3
              variants={titleV}
              className={cn(
                'text-white font-extrabold uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]',
                'tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.26em]',
                'text-lg sm:text-xl md:text-2xl',
                // กันหัวข้อยาว
                'overflow-hidden text-ellipsis [word-break:break-word]'
              )}
            >
              {title}
            </motion.h3>

            <AnimatedUnderline />

            {description && (
              <motion.p
                variants={descV}
                className={cn(
                  'text-sm sm:text-base font-light text-white/90 drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]',
                  // กันข้อความติดกัน + จำกัดบรรทัด
                  'overflow-hidden [overflow-wrap:break-word] [word-break:break-word] hyphens-auto',
                  'line-clamp-3' // ใช้ Tailwind plugin หรือแทนด้วย -webkit line clamp ด้านล่างถ้าไม่ได้เปิด plugin
                )}
                style={
                  // เผื่อกรณีไม่ได้เปิด plugin line-clamp
                  { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }
                }
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* a11y focus ring */}
        <span className="absolute inset-0 rounded-2xl ring-2 ring-transparent transition focus-visible:ring-white/60" />
      </Link>

      {/* inner glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}

const ProjectCard = memo(ProjectCardBase);
export default ProjectCard;
