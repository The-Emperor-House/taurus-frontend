'use client';

import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'TRANFORM',
    description: 'Description for project one with some details about what it does.',
    image: '/home/projects/tranform.webp',
    link: '/projects/1'
  },
  {
    id: 2,
    title: 'DECORATE',
    description: 'Description for project two with some details about what it does.',
    image: '/home/projects/decorate.webp',
    link: '/projects/2'
  },
  {
    id: 3,
    title: 'CONSTRUCTION',
    description: 'Description for project three with some details about what it does.',
    image: '/home/projects/construction.webp',
    link: '/projects/3'
  }
];

export default function ProjectCards() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link 
            href={project.link} 
            key={project.id}
            className="group block overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  <p className="text-white/90 mt-2 line-clamp-2">{project.description}</p>
                </div>
              </div>
            </div>
            {/* <div className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
              <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                <span>View Project</span>
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}