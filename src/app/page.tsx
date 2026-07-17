import { FaqSection } from "../components/landing/faq-section";
import { HeroSection } from "../components/landing/hero-section";
import { HowItWorksSection } from "../components/landing/how-it-works-section";
import { LiveGallerySection } from "../components/landing/live-gallery-section";
import { PoweredByAiSection } from "../components/landing/powered-by-ai-section";
import { SiteHeader } from "../components/landing/site-header";
import { SocialProofSection } from "../components/landing/social-proof-section";
import { TrustPrivacySection } from "../components/landing/trust-privacy-section";
import { PricingSection } from "../features/pricing/components/pricing-section";

export default function Home() {
  return (
    <main>
      <div className="landingShell">
        <SiteHeader />
        <HeroSection />
      </div>

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
      <PricingSection />
      <FaqSection />

      <section className="ctaBand">
        <div>
          <h2>¿Listo para ver la magia?</h2>
          <p>Selecciona un plan y prepara tu cuenta para comenzar.</p>
        </div>
        <a className="primaryButton" href="#register">
          Crear mi cuenta <span>→</span>
        </a>
      </section>
    </main>
  );
}
