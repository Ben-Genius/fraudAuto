import { HeroSection } from '../../components/layout/hero-section';
import { Features } from '../../components/sections/features';
import { RiskCapabilities } from '../../components/sections/risk-capabilities';
import { DvlaIntegrity } from '../../components/sections/dvla-integrity';
import { AfcftaCta } from '../../components/sections/afcfta-cta';
import { Testimonials } from '../../components/sections/testimonials';
import { VinMakes } from '../../components/sections/vin-makes';
import { FAQ } from '../../components/sections/faq';
import { CTA } from '../../components/sections/cta';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle("Home");
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <RiskCapabilities />
      <DvlaIntegrity />
      <VinMakes />
      <AfcftaCta />
      <Testimonials />
      <CTA />
      <FAQ />
    </div>
  );
};

export default Home;
