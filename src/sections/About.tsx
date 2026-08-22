import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Zap, Globe } from 'lucide-react';
import personalData from '@/data/personal.json';
import type { PersonalData } from '@/types/portfolio.types';
import { ANIMATION } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Globe,
  Zap,
  Users,
  Award,
};

const data = personalData as PersonalData;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.DURATIONS.slow,
          ease: ANIMATION.EASINGS.outExpo,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
          },
        }
      );

      // Image animation with clip-path reveal
      if (!ANIMATION.prefersReducedMotion()) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 90%',
            },
          }
        );
      } else {
        gsap.set(imageRef.current, { opacity: 1 });
      }

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: ANIMATION.DURATIONS.slow,
          ease: ANIMATION.EASINGS.outExpo,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
          },
        }
      );

      // Stats stagger animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && !ANIMATION.prefersReducedMotion()) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.fast,
            ease: ANIMATION.EASINGS.outBack,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Achievements stagger animation
      const achievementCards = achievementsRef.current?.querySelectorAll('.achievement-card');
      if (achievementCards) {
        gsap.fromTo(
          achievementCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.normal,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="About section"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / About Me
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-6 tracking-tight">
            Professional <span className="text-gradient">Profile</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden glass-gradient-border">
              {/* Main Image */}
              <div className="aspect-[4/3] relative">
                <img
                  src="/about-image.jpg"
                  alt="Engineer reviewing blueprints at industrial site"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-primary))]/80 via-transparent to-transparent" />
              </div>

              {/* Signature Element */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card rounded-xl p-4 hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-glow-mixed">
                      <span className="font-heading font-bold text-white">{data.initials}</span>
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-[hsl(var(--fg-primary))]">{data.name}</div>
                      <div className="font-mono text-xs text-[hsl(var(--primary))]">{data.designation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-[hsl(var(--primary))]/20 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[hsl(var(--secondary))]/20 rounded-xl -z-10" />
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:pt-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-[hsl(var(--fg-secondary))] leading-relaxed mb-6">
                Principal Electrical Engineer with over <span className="text-[hsl(var(--primary))] font-semibold">{data.stats.yearsExperience} years</span> of experience delivering proposal, FEED, and detail engineering for refinery, petrochemical, gas processing, and power sector projects.
              </p>
              <p className="text-base text-[hsl(var(--fg-tertiary))] leading-relaxed mb-6">
                {data.about.extendedDescription}
              </p>
            </div>

            {/* Key Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-8">
              <div className="stat-item glass-card rounded-xl p-4 text-center hover-lift">
                <div className="font-heading font-bold text-3xl text-[hsl(var(--primary))]">{data.stats.yearsExperience}+</div>
                <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-1">Years Exp.</div>
              </div>
              <div className="stat-item glass-card rounded-xl p-4 text-center hover-lift">
                <div className="font-heading font-bold text-3xl text-[hsl(var(--secondary))]">{data.stats.projects}+</div>
                <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-1">Projects</div>
              </div>
              <div className="stat-item glass-card rounded-xl p-4 text-center hover-lift">
                <div className="font-heading font-bold text-3xl text-[hsl(var(--primary))]">{data.stats.countries}+</div>
                <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-1">Countries</div>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-[hsl(var(--primary))] pl-6 py-2 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-transparent rounded-r-xl">
              <p className="text-[hsl(var(--fg-secondary))] italic text-base leading-relaxed">
                &ldquo;{data.about.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Achievements Grid */}
        <div ref={achievementsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.achievements.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="achievement-card glass-card rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-500">
                  <IconComponent className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="font-heading font-semibold text-[hsl(var(--fg-primary))] mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-[hsl(var(--fg-tertiary))] leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
