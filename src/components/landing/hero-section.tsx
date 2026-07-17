import Image from "next/image";
import { TryOnWidget } from "./tryon-widget";

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="heroGlow"/>
      <div className="heroImageWrap"><Image className="heroImage" src="/images/landing/hero-main.jpg" alt="Modelo adulta mostrando una experiencia virtual de moda" fill priority sizes="(max-width: 900px) 100vw, 64vw"/></div>
      <div className="heroShade"/>
      <div className="heroContent">
        <p className="eyebrow">AI VIRTUAL TRY-ON</p>
        <h1>Mírate con<br/>cualquier <span>outfit</span></h1>
        <p className="heroLead">Tecnología de inteligencia artificial para visualizar prendas con resultados realistas en segundos.</p>
        <div className="heroCtas"><a className="primaryButton" href="#register">Probar ahora <span>→</span></a><a className="secondaryButton" href="#how-it-works"><b>▶</b> Ver demo</a></div>
        <div className="trustRow"><div className="avatars"><span/><span/><span/><span/><span/></div><div><strong>Experiencia creada para moda digital</strong><small>Privacidad, velocidad y control</small></div></div>
      </div>
      <div className="heroWidget"><TryOnWidget/></div>
      <div className="sliderDots" aria-hidden="true"><i/><i/><i/><i/></div>
    </section>
  );
}
