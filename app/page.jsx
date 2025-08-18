import HomeCard from '@/app/home/components/HomeCards';
import AboutUsCards from '@/app/home/components/AboutUsCards';
import ProjectCards from '@/app/home/components/ProjectCards';
import NewsCards from '@/app/home/components/NewsCards';
import MapCards from '@/app/home/components/MapCards';

export const metadata = {
  title: 'Home - TAURUS : WE RENEW',
  description: 'Welcome to Taurus, your partner in interior design, renovation, and custom furniture.',
};

export default function HomePage() {
  return (
    <main>
      <HomeCard />
      <AboutUsCards />
      <ProjectCards />
      <NewsCards />
      <MapCards />
    </main>
  );
}