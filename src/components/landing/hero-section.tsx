"use client";
import Image from "next/image";
import { TryOnWidget } from "./tryon-widget";
import styles from "./hero-premium.module.css";

export function HeroSection(){
 return <section className={styles.hero} id="top">
  <div className={styles.backdrop}><Image src="/images/landing/hero/hero-model-premium.jpg" alt="Modelo adulta en una experiencia de moda virtual" fill priority sizes="100vw"/></div>
  <div className={styles.overlay}/>
  <button className={`${styles.arrow} ${styles.left}`} aria-label="Anterior">‹</button>
  <button className={`${styles.arrow} ${styles.right}`} aria-label="Siguiente">›</button>
  <div className={styles.content}>
   <p className={styles.eyebrow}>AI VIRTUAL TRY-ON</p>
   <h1>Mírate con<br/>cualquier <span>outfit</span></h1>
   <p className={styles.lead}>Tecnología avanzada de IA que entrega resultados ultrarrealistas en segundos. Encuentra el look perfecto para ti.</p>
   <div className={styles.actions}><a href="#register" className={styles.primary}>Probar ahora <b>→</b></a><a href="#how-it-works" className={styles.secondary}><i>▶</i> Ver demo</a></div>
   <div className={styles.trust}><div className={styles.faces}>{[1,2,3,4,5].map(n=><span key={n}/>)}</div><div><strong>Creado para experiencias de moda</strong><small>Rápido, privado y realista</small></div></div>
  </div>
  <div className={styles.widget}><TryOnWidget/></div>
  <div className={styles.dots}><i/><i/><i/><i/></div>
 </section>
}
