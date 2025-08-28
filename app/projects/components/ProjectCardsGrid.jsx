'use client';

import { memo } from 'react';
import ProjectCard from './ProjectCard';
import { cn } from '@/shared/lib/cn';

function GridBase({ projects = [], className, cardSize = 'md' }) {
  if (!projects.length) {
    return (
      <div className={cn('w-full p-6 text-center text-sm text-neutral-500', className)}>
        ไม่มีโปรเจกต์ที่จะแสดง
      </div>
    );
  }

  return (
    <section
      aria-label="Project cards"
      className={cn(
        // auto-fit + minmax ปรับตามจอ
        'grid w-full p-4 sm:p-6 gap-5 sm:gap-6',
        '[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]',
        'sm:[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]',
        'lg:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]',
        className
      )}
    >
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          title={p.title}
          description={p.description}
          imageSrc={p.image}
          href={p.link}
          size={cardSize}
        />
      ))}
    </section>
  );
}

const ProjectCardsGrid = memo(GridBase);
export default ProjectCardsGrid;
