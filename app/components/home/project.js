'use client';

import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'TRANFORM',
    description: 'ปรับปรุง ต่อเติม',
    image: '/home/projects/tranform.webp',
    link: '/projects/1'
  },
  {
    id: 2,
    title: 'DECORATE',
    description: 'ตกแต่งภายใน',
    image: '/home/projects/decorate.webp',
    link: '/projects/2'
  },
  {
    id: 3,
    title: 'CONSTRUCTION',
    description: 'การก่อสร้าง',
    image: '/home/projects/construction.webp',
    link: '/projects/3'
  }
];

export default function ProjectCards() {
  return (
    <div className="w-full px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <Link 
            href={project.link} 
            key={project.id}
            className="group block overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full"
          >
            <div className="relative h-80 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay with Animation */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center px-8">
                  {/* Title with Underline Animation */}
                  <h3 className="text-white text-2xl font-light tracking-widest">
                    {project.title}
                    {/* Animated Underline */}
                    <span className="block h-0.5 bg-white w-0 mx-auto mt-3 group-hover:w-16 transition-all duration-500 ease-out"></span>
                  </h3>
                  
                  {/* Description with Fade-in Animation */}
                  <p className="text-white text-lg mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}