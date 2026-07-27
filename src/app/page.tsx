import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MouseGlow } from '../components/MouseGlow';
import { HeroSection } from '../components/sections/home/HeroSection';
import { TickerSection } from '../components/sections/home/TickerSection';
import { StatsSection } from '../components/sections/home/StatsSection';
import { FeaturedProjectsSection } from '../components/sections/home/FeaturedProjectsSection';
import { ExperienceSection } from '../components/sections/home/ExperienceSection';
import { SkillsSection } from '../components/sections/home/SkillsSection';
import { BlogPreviewSection } from '../components/sections/home/BlogPreviewSection';
import { CTASection } from '../components/sections/home/CTASection';

export default function HomePage() {
  return (
    <div style={{ background: '#09090B', color: '#EDEDEF', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <MouseGlow />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <TickerSection />
        <StatsSection />
        <FeaturedProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
