import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cable,
  Lightbulb,
  Shield,
  History,
  FolderOpen,
  CalendarCheck,
  TrendingUp,
  Zap,
  Award,
} from 'lucide-react';
import innovationsData from '@/data/innovations.json';
import type { InnovationsData } from '@/types/portfolio.types';
import { ANIMATION } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Cable,
  Lightbulb,
  Shield,
  History,
  FolderOpen,
  CalendarCheck,
  TrendingUp,
  Zap,
  Award,
};

const data = innovationsData as InnovationsData;

export default function Innovation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.innovation-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.normal,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.normal,
            ease: ANIMATION.EASINGS.outBack,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Metric counter animation
      if (!ANIMATION.prefersReducedMotion()) {
        const metricValues = sectionRef.current?.querySelectorAll('.metric-value');
        if (metricValues) {
          metricValues.forEach((metric) => {
            const targetValue = metric.getAttribute('data-value');
            if (targetValue) {
              const numericValue = parseInt(targetValue);
              const obj = { value: 0 };
              gsap.to(obj, {
                value: numericValue,
                duration: ANIMATION.DURATIONS.slower,
                ease: ANIMATION.EASINGS.outExpo,
                scrollTrigger: {
                  trigger: metric,
                  start: 'top 90%',
                },
                onUpdate: () => {
                  metric.textContent = Math.round(obj.value).toString();
                },
              });
            }
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="innovation"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Engineering Innovation section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / Engineering Innovation
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-6 tracking-tight">
            Automation <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-lg text-[hsl(var(--fg-secondary))] max-w-3xl mx-auto leading-relaxed">
            Developed proprietary automation tools that deliver measurable productivity gains 
            and engineering efficiency improvements across EPC projects
          </p>
        </div>

        {/* Innovation Cards Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.innovations.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const colorClass = item.color === 'cyan' ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--secondary))]';
            
            return (
              <div
                key={index}
                className="innovation-card glass-card rounded-2xl p-6 group relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle, ${item.color === 'cyan' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(112, 0, 255, 0.1)'} 0%, transparent 70%)`,
                    opacity: 0.5
                  }}
                />
                
                {/* Icon */}
                <div 
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-shadow duration-500 group-hover:shadow-glow"
                  style={{ 
                    background: `linear-gradient(135deg, ${item.color === 'cyan' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(112, 0, 255, 0.2)'} 0%, ${item.color === 'cyan' ? 'rgba(0, 240, 255, 0.05)' : 'rgba(112, 0, 255, 0.05)'} 100%)`
                  }}
                >
                  <IconComponent className={`w-7 h-7 ${colorClass}`} />
                </div>

                {/* Metric Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-4xl font-heading font-bold ${colorClass}`}>
                    <span className="metric-value" data-value={parseInt(item.metric)}>
                      {ANIMATION.prefersReducedMotion() ? item.metric.replace('%', '') : '0'}
                    </span>
                    <span>%</span>
                  </div>
                  <div 
                    className="h-10 w-px"
                    style={{ backgroundColor: `rgba(${item.color === 'cyan' ? '0, 240, 255' : '112, 0, 255'}, 0.3)` }}
                  />
                  <div className="text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider leading-tight">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-lg text-[hsl(var(--fg-primary))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[hsl(var(--fg-secondary))] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Overall Stats */}
        <div ref={statsRef} className="glass-card rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="font-heading font-semibold text-2xl text-[hsl(var(--fg-primary))] mb-2">
              Measurable Engineering Impact
            </h3>
            <p className="text-[hsl(var(--fg-secondary))]">
              Quantifiable results from automation-driven productivity initiatives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.overallStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="stat-item text-center p-6 rounded-xl glass-card group"
                >
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-500">
                    <IconComponent className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="font-heading font-bold text-3xl text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <Zap className="w-5 h-5 text-[hsl(var(--primary))]" />
            <span className="text-[hsl(var(--fg-secondary))] text-sm">
              Continuously developing new automation solutions for engineering efficiency
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
