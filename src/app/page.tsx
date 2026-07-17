import { ExperienceStrip } from "../components/landing/experience-strip";
import { HeroSection } from "../components/landing/hero-section";
import { SiteHeader } from "../components/landing/site-header";

export default function Home(){
 return <main>
   <div className="landingShell"><SiteHeader/><HeroSection/></div>
   <div className="brandStrip" aria-label="Categorías compatibles"><span>FASHION</span><span>STREETWEAR</span><span>LUXURY</span><span>ACTIVE</span><span>LINGERIE</span><span>CASUAL</span></div>
   <ExperienceStrip/>
   <section className="stepsSection" id="how-it-works"><p className="sectionKicker">CÓMO FUNCIONA</p><div className="stepsGrid">{[["01","Sube","Carga una fotografía de forma segura."],["02","Elige","Selecciona el estilo o prenda."],["03","Procesa","La IA prepara una vista realista."],["04","Disfruta","Descarga o comparte tu resultado."]].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
   <section className="ctaBand" id="pricing"><div><h2>¿Listo para ver la magia?</h2><p>Los planes y precios reales se conectarán al backend en su módulo correspondiente.</p></div><a className="primaryButton" href="#register">Comenzar ahora <span>→</span></a></section>
 </main>
}
