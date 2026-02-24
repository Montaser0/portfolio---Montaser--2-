import { Navigation } from "@/components/portfolio/navigation";
import { HeroSection } from "@/components/portfolio/hero-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { Footer } from "@/components/portfolio/footer";
import { ExperienceSection1 } from "@/components/portfolio/exp";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection1 />
      <ExperienceSection />
      <Footer />
    </main>
  );
}
