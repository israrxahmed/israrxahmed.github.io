import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  Settings,
  Users,
  HardHat,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import servicesData from '@/data/services.json';
import type { ServicesData } from '@/types/portfolio.types';
import { ANIMATION } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  FileText,
  Settings,
  Users,
  HardHat,
  Cpu,
};

const data = servicesData as ServicesData;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

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

      // Services cards animation
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.normal,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Process timeline animation
      const processItems = processRef.current?.querySelectorAll('.process-item');
      if (processItems) {
        gsap.fromTo(
          processItems,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.slow,
            ease: ANIMATION.EASINGS.outBack,
            scrollTrigger: {
              trigger: processRef.current,
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
      id="services"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Services section"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / Services
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-6 tracking-tight">
            Engineering <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-lg text-[hsl(var(--fg-secondary))] max-w-2xl mx-auto leading-relaxed">
            Comprehensive electrical engineering services for EPC and PMC projects worldwide
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="service-card glass-card rounded-2xl p-6 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-500">
                  <IconComponent className="w-7 h-7 text-[hsl(var(--primary))]" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-[hsl(var(--fg-primary))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[hsl(var(--fg-secondary))] text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2.5 text-sm text-[hsl(var(--fg-tertiary))]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]/70 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <div className="mt-5 flex items-center gap-2 text-[hsl(var(--primary))] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Timeline */}
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="font-heading font-semibold text-2xl text-[hsl(var(--fg-primary))] mb-3">
              Engineering Process
            </h3>
            <p className="text-[hsl(var(--fg-secondary))]">
              A structured approach to delivering excellence
            </p>
          </div>

          {/* Timeline with connecting lines */}
          <div ref={processRef} className="relative">
            <div className="grid md:grid-cols-4 gap-8">
              {data.processSteps.map((step, index) => (
                <div
                  key={index}
                  className="process-item relative group"
                >
                  {/* Connector segment to the next step (between circles only) */}
                  {index < data.processSteps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute top-8 h-px bg-gradient-to-r from-[hsl(var(--primary))]/30 via-[hsl(var(--secondary))]/50 to-[hsl(var(--primary))]/30"
                      style={{ left: 'calc(50% + 40px)', width: 'calc(100% - 48px)' }}
                    />
                  )}
                  <div className="text-center">
                    {/* Step Number */}
                    <div className="relative z-10 w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4 border border-[hsl(var(--primary))]/30 backdrop-blur-sm group-hover:shadow-glow transition-shadow duration-500">
                      <span className="font-heading font-bold text-xl text-[hsl(var(--primary))]">
                        {step.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-semibold text-[hsl(var(--fg-primary))] mb-2">
                      {step.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-[hsl(var(--fg-tertiary))]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[hsl(var(--fg-secondary))] mb-6">
            Looking for electrical engineering expertise for your next project?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary group"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out-back group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
