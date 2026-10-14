'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
const CoffeeScene = dynamic(() => import('./CoffeeScene'), { ssr: false });
export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const [menuOpen,setMenuOpen] = useState(false);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReady(true);
    if (reduce) return;
    let lenis: any;
    let cleanup = () => {};
    let alive = true;
    Promise.all([import('lenis'),import('gsap'),import('gsap/ScrollTrigger')]).then(([lenisModule,gsapModule,triggerModule]) => {
      if (!alive) return;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      lenis = new lenisModule.default({ duration: 1.15, smoothWheel: true, touchMultiplier: 1 });
      const update = (time:number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      const ctx = gsap.context(() => {
        gsap.fromTo('.hero-enter',{opacity:0,y:24},{opacity:1,y:0,stagger:0.13,duration:1.05,ease:'power3.out',delay:0.12});
        gsap.to('.hero-copy',{y:-32,opacity:0.5,ease:'none',scrollTrigger:{trigger:hero.current,start:'top top',end:'bottom top',scrub:true}});
      },hero);
      cleanup = () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); };
    });
    return () => {alive=false;cleanup();};
  },[]);
  return <main>
    <section ref={hero} className="hero" id="top">
      <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Nocturne home"><span className="brand-mark">N<span>·</span></span><span>NOCTURNE<small>COFFEE ATELIER</small></span></a>
        <div className="nav-links"><a href="#story">OUR PHILOSOPHY</a><a href="#story">THE EXPERIENCE</a><a href="https://crerise.in" target="_blank" rel="noopener noreferrer">ABOUT THE STUDIO <ArrowUpRight size={13}/></a></div>
        <button className="nav-mobile" aria-label={menuOpen?'Close menu':'Open menu'} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
      </nav>
      {menuOpen&&<div className="mobile-panel"><a onClick={()=>setMenuOpen(false)} href="#story">Our philosophy</a><a onClick={()=>setMenuOpen(false)} href="#story">The experience</a><a href="https://crerise.in">About the studio</a></div>}
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow hero-enter"><span className="eyebrow-line"/> THE ART OF SLOW LIVING <span className="eyebrow-number">01 / 06</span></div>
          <h1 className="hero-enter">A moment<br/>worth <em>savouring.</em></h1>
          <p className="hero-desc hero-enter">Not just coffee. A quiet ritual, crafted with intention. Discover the extraordinary in every everyday moment.</p>
          <a className="explore hero-enter" href="#story">EXPLORE THE EXPERIENCE <span><ArrowDownRight size={19}/></span></a>
        </div>
        <div className="visual" aria-label="Animated three-dimensional ceramic cup of coffee"><div className="visual-halo"/><CoffeeScene/><div className="visual-label">THE SIGNATURE LATTE <span>— 001</span></div></div>
        <aside className="side-note hero-enter"><span className="line"/><span>CRAFTED FOR THE<br/>CURIOUS SOUL</span><p>Slow mornings.<br/>Extraordinary coffee.</p></aside>
      </div>
      <div className="hero-footer"><span>EST. 2026 &nbsp; · &nbsp; MADE TO BE SAVOURED</span><span className="scroll-hint">SCROLL TO DISCOVER <span className="scroll-line"/></span><span>AN IMMERSIVE EXPERIENCE BY <a href="https://crerise.in" target="_blank" rel="noopener noreferrer">CRERISE ↗</a></span></div>
    </section>
    <section className="story" id="story"><span>THE EXPERIENCE CONTINUES</span><h2>Every great story<br/><em>begins with a cup.</em></h2><p>Chapter 01 is ready. The ingredient separation, constellation menu, drink detail, customizer and order experience will be added in the next chapters.</p><a href="#top">BACK TO THE BEGINNING ↑</a></section>
  </main>;
}
