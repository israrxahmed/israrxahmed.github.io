import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ChevronRight, Mail } from 'lucide-react';
import personalData from '@/data/personal.json';
import type { PersonalData } from '@/types/portfolio.types';
import { animateHeroChars, floatingAnimation, ANIMATION } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const data = personalData as PersonalData;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Floating badge word rotator
  const badgeWords = data.hero.badgeTexts;
  const [badgeIndex, setBadgeIndex] = useState(0);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setBadgeIndex(prev => (prev + 1) % badgeWords.length);
    }, 2500);

    return () => clearInterval(flipInterval);
  }, [badgeWords.length]);

  const badgeText = badgeWords[badgeIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character-by-character headline reveal
      const heading = headingRef.current;
      if (heading) {
        const chars = heading.querySelectorAll('.char');
        animateHeroChars(chars, { delay: 0.3 });
      }

      // Tagline fade in
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'expo.out', 
          delay: 0.8 
        }
      );

      // Description fade in
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'expo.out', 
          delay: 1 
        }
      );

      // Summary fade in
      gsap.fromTo(
        summaryRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'expo.out', 
          delay: 1.2 
        }
      );

      // Image reveal with 3D effect
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.5,
        }
      );

      // Badge animation
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 1.4,
        }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'expo.out', 
          delay: 1.4 
        }
      );

      // Scroll indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.8, 
          delay: 1.8 
        }
      );

      // Floating animation for image
      if (!ANIMATION.prefersReducedMotion()) {
        floatingAnimation(imageRef.current, { duration: 4, y: -12 });
      }

      // Scroll-triggered fade out
      if (!ANIMATION.prefersReducedMotion()) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(sectionRef.current, {
              opacity: 1 - progress * 0.7,
              y: progress * 60,
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into characters
  const name = data.name.toUpperCase();
  const nameChars = name.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[hsl(var(--bg-primary))]/60 to-[hsl(var(--bg-primary))] pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Title Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-card mb-8 hover:shadow-glow transition-shadow duration-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-[hsl(var(--primary))] uppercase tracking-wider">
                Available for Opportunities
              </span>
            </div>

            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[hsl(var(--fg-primary))] mb-6 perspective whitespace-nowrap tracking-tight"
              style={{ perspective: '1000px' }}
            >
              {nameChars}
            </h1>

            {/* Subtitle with gradient */}
            <p
              ref={taglineRef}
              className="font-heading text-xl sm:text-2xl md:text-3xl text-gradient mb-6 font-medium"
            >
              {data.hero.tagline}
            </p>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg text-[hsl(var(--fg-secondary))] mb-4 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {data.hero.description}
            </p>

            {/* Summary */}
            <p
              ref={summaryRef}
              className="text-base text-[hsl(var(--fg-tertiary))] mb-10 max-w-xl mx-auto lg:mx-0"
            >
              {data.hero.summary}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleScrollTo('#projects')}
                className="btn-primary group"
              >
                <span>View Experience</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 ease-out-back group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => handleScrollTo('#contact')}
                className="btn-secondary"
              >
                <Mail className="w-5 h-5" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {/* Right Content - Portrait */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-3xl blur-3xl scale-110 opacity-60" />

              {/* Image Container */}
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] rounded-3xl overflow-hidden glass-gradient-border">
                <img
                  src="/hero-portrait.jpg"
                  alt="Israr Ahmed - Principal Electrical Engineer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-primary))]/70 via-transparent to-transparent" />

                {/* Experience Badge */}
                <div className="absolute bottom-5 left-5 right-5 glass-card rounded-2xl p-5 hover-lift">
                  <div className="flex flex-col sm:flex-row items-center justify-between text-center gap-2 sm:gap-0">
                    <div>
                      <div className="font-heading font-bold text-2xl text-[hsl(var(--fg-primary))]">{data.stats.yearsExperience}+</div>
                      <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-0.5">Years Exp.</div>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-[hsl(var(--border-subtle))]" />
                    <div>
                      <div className="font-heading font-bold text-2xl text-[hsl(var(--fg-primary))]">{data.stats.projects}+</div>
                      <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-0.5">Projects</div>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-[hsl(var(--border-subtle))]" />
                    <div>
                      <div className="font-heading font-bold text-2xl text-[hsl(var(--fg-primary))]">{data.stats.countries}+</div>
                      <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-0.5">Countries</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div
                ref={badgeRef}
                className="absolute -top-3 -right-3 min-w-[5.5rem] glass-elevated rounded-2xl flex items-center justify-center animate-float perspective py-2.5 px-4"
              >
                <div
                  key={badgeText}
                  className="flip-text"
                >
                  <span className="font-mono text-sm text-[hsl(var(--primary))] text-center font-semibold">
                    {badgeText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-[hsl(var(--border-default))] flex items-start justify-center p-2">
          <ArrowDown className="w-4 h-4 text-[hsl(var(--primary))] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
