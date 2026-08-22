import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, 
  Cable, 
  Lightbulb, 
  Shield, 
  AlertTriangle,
  FileText,
  Layers,
  Settings
} from 'lucide-react';
import skillsData from '@/data/skills.json';
import type { SkillsData } from '@/types/portfolio.types';
import { ANIMATION } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Zap,
  Cable,
  Lightbulb,
  Shield,
  AlertTriangle,
  FileText,
  Layers,
  Settings,
};

const data = skillsData as SkillsData;

// Derived from the actual skill/tool lists so the headline numbers can
// never contradict the content above them.
const expertiseStats = [
  { label: 'Technical Skills', value: `${data.technicalSkills.length + data.epcExecution.length}+` },
  { label: 'Software Tools', value: `${data.softwareTools.length}` },
  { label: 'Industries', value: '4' },
  { label: 'Certifications', value: '8+' },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const epcRef = useRef<HTMLDivElement>(null);
  const softwareRef = useRef<HTMLDivElement>(null);
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

      // Technical skills animation
      const techCards = technicalRef.current?.querySelectorAll('.skill-item');
      if (techCards) {
        gsap.fromTo(
          techCards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.normal,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: technicalRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Proficiency bars animation
      if (!ANIMATION.prefersReducedMotion()) {
        const progressBars = sectionRef.current?.querySelectorAll('.progress-fill');
        if (progressBars) {
          progressBars.forEach((bar) => {
            const width = bar.getAttribute('data-width');
            gsap.fromTo(
              bar,
              { width: '0%' },
              {
                width: `${width}%`,
                duration: ANIMATION.DURATIONS.slower,
                ease: ANIMATION.EASINGS.outExpo,
                scrollTrigger: {
                  trigger: bar,
                  start: 'top 90%',
                },
              }
            );
          });
        }
      }

      // EPC execution animation
      const epcCards = epcRef.current?.querySelectorAll('.epc-item');
      if (epcCards) {
        gsap.fromTo(
          epcCards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.slow,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: epcRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Software tools animation
      const toolTags = softwareRef.current?.querySelectorAll('.tool-tag');
      if (toolTags) {
        gsap.fromTo(
          toolTags,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: ANIMATION.DURATIONS.normal,
            stagger: ANIMATION.STAGGER.fast,
            ease: ANIMATION.EASINGS.outBack,
            scrollTrigger: {
              trigger: softwareRef.current,
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
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Expertise section"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / Expertise
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-6 tracking-tight">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-lg text-[hsl(var(--fg-secondary))] max-w-2xl mx-auto leading-relaxed">
            Comprehensive electrical engineering expertise spanning design, analysis, and EPC execution
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Technical Engineering Skills */}
          <div ref={technicalRef} className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[hsl(var(--fg-primary))]">
                Electrical Engineering
              </h3>
            </div>

            <div className="space-y-6">
              {data.technicalSkills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="skill-item group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4 text-[hsl(var(--primary))]/70" />
                        <span className="text-[hsl(var(--fg-secondary))] text-sm">{skill.name}</span>
                      </div>
                      <span className="font-mono text-sm text-[hsl(var(--primary))]">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="progress-fill skill-bar-fill"
                        data-width={skill.proficiency}
                        style={{ width: ANIMATION.prefersReducedMotion() ? `${skill.proficiency}%` : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EPC Execution Skills */}
          <div ref={epcRef} className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[hsl(var(--secondary))]" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-[hsl(var(--fg-primary))]">
                EPC Execution
              </h3>
            </div>

            <div className="space-y-6">
              {data.epcExecution.map((skill, index) => {
                const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="epc-item group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4 text-[hsl(var(--secondary))]/70" />
                        <span className="text-[hsl(var(--fg-secondary))] text-sm">{skill.name}</span>
                      </div>
                      <span className="font-mono text-sm text-[hsl(var(--secondary))]">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="progress-fill h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        data-width={skill.proficiency}
                        style={{ 
                          width: ANIMATION.prefersReducedMotion() ? `${skill.proficiency}%` : '0%',
                          boxShadow: '0 0 10px rgba(112, 0, 255, 0.3)'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Software Tools */}
        <div ref={softwareRef} className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-[hsl(var(--primary))]" />
            </div>
            <h3 className="font-heading font-semibold text-xl text-[hsl(var(--fg-primary))]">
              Software & Tools
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {data.softwareTools.map((tool, index) => (
              <div
                key={index}
                className="tool-tag glass-card rounded-xl px-5 py-3 group"
              >
                <span className="text-[hsl(var(--fg-secondary))] text-sm font-medium group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {expertiseStats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-4 rounded-xl border border-[hsl(var(--border-subtle))] hover:border-[hsl(var(--primary))]/30 transition-colors duration-300"
            >
              <div className="font-heading font-bold text-2xl md:text-3xl text-gradient mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
