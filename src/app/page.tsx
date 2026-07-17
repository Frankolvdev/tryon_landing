import { PoweredByAiSection } from "../components/landing/powered-by-ai-section";
import { HeroSection } from "../components/landing/hero-section";
import { HowItWorksSection } from "../components/landing/how-it-works-section";
import { SiteHeader } from "../components/landing/site-header";

export default function Home(){
 return <main>
   <div className="landingShell"><SiteHeader/><HeroSection/></div>
   <div className="brandStrip" aria-label="Categorías compatibles"><span>FASHION</span><span>STREETWEAR</span><span>LUXURY</span><span>ACTIVE</span><span>LINGERIE</span><span>CASUAL</span></div>
   <PoweredByAiSection/>
   <HowItWorksSection/>
   <section className="ctaBand" id="pricing"><div><h2>¿Listo para ver la magia?</h2><p>Los planes y precios reales se conectarán al backend en su módulo correspondiente.</p></div><a className="primaryButton" href="#register">Comenzar ahora <span>→</span></a></section>
 </main>
}
