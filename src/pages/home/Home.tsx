import { HeroSection } from '../../components/layout/hero-section';
import { Features } from '../../components/sections/features';
import { Stats } from '../../components/sections/stats';
import { Testimonials } from '../../components/sections/testimonials';
import { VinMakes } from '../../components/sections/vin-makes';
import { FAQ } from '../../components/sections/faq';
import { CTA } from '../../components/sections/cta';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <Stats />
      <Testimonials />
      <VinMakes />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
