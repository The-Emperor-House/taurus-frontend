import HeroSection from '@/app/home/components/HeroSection';
import AboutUsHomePageSection from '@/app/home/components/AboutUsHomePageSection';
import ProjectsHomePageSection from '@/app/home/components/ProjectsHomePageSection';
import OurTeamHomePageSection from '@/app/home/components/OurTeamHomePageSection';

export const metadata = {
  title: 'Home - TAURUS : WE RENEW',
  description: 'Welcome to Taurus, your partner in interior design, renovation, and custom furniture.',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* <AboutUsHomePageSection /> */}
      {/* <ProjectsHomePageSection /> */}
      {/* <OurTeamHomePageSection /> */}
    </main>
  );
}