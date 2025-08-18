import HomeCard from "@/app/home/components/HomeCards";
import AboutUsCards from "@/app/home/components/AboutUsCards";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import ProjectCards from "@/app/home/components/ProjectCards";
import NewsCards from "@/app/home/components/NewsCards";
import MapCards from "@/app/home/components/MapCards";

export const metadata = {
  title: "Home - TAURUS : WE RENEW",
  description:
    "Welcome to Taurus, your partner in interior design, renovation, and custom furniture.",
};

export default function HomePage() {
  return (
    <main>
      <HomeCard />
      <AboutUsCards />

      {/* SECTION พื้นหลัง #404040 */}
      <section
        style={{
          backgroundColor: "var(--bg-color, #404040)",
          color: "#fff",
          padding: "24px 0", // เว้นระยะบน-ล่างนิดหน่อย
        }}
      >
        <AnimatedHeading
          variant="h1"
          sx={{ mb: 4 }}
          title="PROJECT"
          subtitle="RECRAFTING SPACES. REVIVING LIVING."
          align="center"
          titleColor="#ffffffff"
        />
        <ProjectCards />
      </section>

      <NewsCards />
      <MapCards />
    </main>
  );
}
