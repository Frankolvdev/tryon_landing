import { FaqSection } from "../components/landing/faq-section";
import { FinalCtaSection } from "../components/landing/final-cta-section";
import { HeroSection } from "../components/landing/hero-section";
import { HowItWorksSection } from "../components/landing/how-it-works-section";
import { LiveGallerySection } from "../components/landing/live-gallery-section";
import { PoweredByAiSection } from "../components/landing/powered-by-ai-section";
import { SocialProofSection } from "../components/landing/social-proof-section";
import { TrustPrivacySection } from "../components/landing/trust-privacy-section";
import { PricingSection } from "../features/pricing/components/pricing-section";
import { TokenSection } from "../features/tokens/components/token-section";

export default function Home() {
  return (
    <main id="main-content" className="landing-page">
      <section className="landingShell" aria-label="Presentación de TRYON">
        <HeroSection />
      </section>

      <div className="brandStrip" aria-label="Categorías compatibles">
        <span>FASHION</span>
        <span>STREETWEAR</span>
        <span>LUXURY</span>
        <span>ACTIVE</span>
        <span>LINGERIE</span>
        <span>CASUAL</span>
      </div>

      <PoweredByAiSection />
      <HowItWorksSection />
      <LiveGallerySection />
      <TrustPrivacySection />
      <SocialProofSection />
      <TokenSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
