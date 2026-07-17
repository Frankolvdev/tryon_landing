import Image from "next/image";

const cards=["look-1.jpg","look-2.jpg","look-3.jpg","look-4.jpg","look-5.jpg"];
export function ExperienceStrip(){
 return <section className="experienceSection" id="features">
  <div className="experienceCopy"><p className="eyebrow">NUEVA GENERACIÓN</p><h2>Impulsado por IA.<br/>Diseñado para <em>ti.</em></h2><p>Nuestro sistema está preparado para trabajar con distintas poses, cuerpos y estilos manteniendo una experiencia rápida y visual.</p><div className="metricGrid"><span><b>IA</b><small>Procesamiento</small></span><span><b>HD</b><small>Resultados</small></span><span><b>24/7</b><small>Disponible</small></span><span><b>SaaS</b><small>Escalable</small></span></div></div>
  <div className="fashionRail" id="gallery">{cards.map((card,index)=><figure key={card} className={index===2?"featured":""}><Image src={`/images/landing/${card}`} alt={`Vista de moda ${index+1}`} fill sizes="(max-width:700px) 42vw, 18vw"/></figure>)}</div>
 </section>
}
