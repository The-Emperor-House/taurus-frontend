import ProjectCards from '../home/components/ProjectCards';

export default function ProjectsPage() {
  return (
   <div style={{ 
    paddingTop: "var(--nav-h, 40px)",
    backgroundColor: "var(--bg-color, #404040)",
  }}>
      <ProjectCards />
    </div>
  );
}