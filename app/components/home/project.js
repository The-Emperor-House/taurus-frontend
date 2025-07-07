"use client";

import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "TRANSFORM",
    description: "ปรับปรุง ต่อเติม",
    image: "/home/projects/transform.webp",
    link: "/projects/1",
  },
  {
    id: 2,
    title: "DECORATE",
    description: "ตกแต่งภายใน",
    image: "/home/projects/decorate.webp",
    link: "/projects/2",
  },
  {
    id: 3,
    title: "CONSTRUCTION",
    description: "การก่อสร้าง",
    image: "/home/projects/construction.webp",
    link: "/projects/3",
  },
];

export default function ProjectCards() {
  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          >
            <Link href={project.link} className="block h-full relative">
              {/* ภาพพื้นหลัง */}
              <div className="relative w-full max-w-4xl aspect-[4/3] h-auto rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 hover:shadow-lg"
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 30vw"
                  priority={project.id <= 3}
                />
              </div>

              {/* hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h3>
                <div className="w-12 h-0.5 bg-white my-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                <p className="text-white/90 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  {project.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}