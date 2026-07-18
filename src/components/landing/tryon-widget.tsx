"use client";
import Image from "next/image";
import {useId,useState} from "react";
import styles from "./tryon-widget.module.css";
const looks=["after-red.jpg","look-1.jpg","look-2.jpg","look-3.jpg","look-4.jpg","look-5.jpg"];
export function TryOnWidget(){const id=useId();const [split,setSplit]=useState(50);const [selected,setSelected]=useState(0);return <section className={styles.card} aria-label="Comparador virtual interactivo">
 <header><strong>Live Try-On <em>AI</em></strong><span><i/> Tiempo real</span></header>
 <div className={styles.stage} style={{"--split":`${split}%`} as React.CSSProperties}>
  <Image src="/images/landing/hero/before.jpg" alt="Antes del cambio de ropa" fill priority sizes="420px"/>
  <div className={styles.reveal}><Image src={`/images/landing/hero/${looks[selected]}`} alt="Después del cambio de ropa" fill sizes="420px"/></div>
  <b className={styles.before}>Antes</b><b className={styles.after}>Después</b><span className={styles.divider}><i>↔</i></span>
  <label className={styles.sr} htmlFor={id}>Deslizar comparación</label><input id={id} type="range" min="5" max="95" value={split} onChange={e=>setSplit(+e.target.value)} />
 </div>
 <div className={styles.rail}>{looks.map((look,i)=><button key={look} onClick={()=>setSelected(i)} className={selected===i?styles.active:""} aria-label={`Ejemplo ${i+1}`}><Image src={`/images/landing/hero/${look}`} alt="" fill sizes="64px"/></button>)}</div>
 <div className={styles.actions}><a href="#register">Generar <b>✦</b></a><button type="button">Ajustar <b>☷</b></button></div>
 </section>}
