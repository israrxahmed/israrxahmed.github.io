import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Building2 } from 'lucide-react';
import clientsData from '@/data/clients.json';
import personalData from '@/data/personal.json';
import type { ClientsData, PersonalData } from '@/types/portfolio.types';
import { ANIMATION } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const data = clientsData as ClientsData;
const profile = personalData as PersonalData;

// Single source of truth: derive headline numbers instead of hardcoding
// values that drift out of sync with the underlying data.
const clientStats = [
  { value: `${data.clients.length}+`, label: 'Major Clients' },
  { value: `${profile.stats.countries}`, label: 'Countries' },
  { value: `${profile.stats.projects}+`, label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
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

      // Logos animation
      const logoItems = logosRef.current?.querySelectorAll('.client-logo');
      if (logoItems) {
        gsap.fromTo(
          logoItems,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.DURATIONS.normal,
            stagger: ANIMATION.STAGGER.fast,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: logosRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Testimonials animation
      const testimonialCards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
      if (testimonialCards) {
        gsap.fromTo(
          testimonialCards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.slow,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: testimonialsRef.current,
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
      id="clients"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Clients section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / Industry Partners
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-6 tracking-tight">
            Trusted by <span className="text-gradient">Global Leaders</span>
          </h2>
          <p className="text-lg text-[hsl(var(--fg-secondary))] max-w-2xl mx-auto leading-relaxed">
            Collaborated with leading EPC contractors and operators across the energy sector
          </p>
        </div>

        {/* Client Logos Grid */}
        <div
          ref={logosRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20"
        >
          {data.clients.map((client, index) => (
            <div
              key={index}
              className="client-logo glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[120px] group"
            >
              <Building2 className="w-8 h-8 text-[hsl(var(--fg-tertiary))] group-hover:text-[hsl(var(--primary))] transition-colors duration-300 mb-3" />
              <div className="font-heading font-semibold text-[hsl(var(--fg-primary))] text-sm group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                {client.name}
              </div>
              <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))] mt-1">
                {client.country}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="font-heading font-semibold text-2xl text-[hsl(var(--fg-primary))] text-center mb-10">
            What Colleagues Say
          </h3>
          <div
            ref={testimonialsRef}
            className="grid md:grid-cols-3 gap-6"
          >
            {data.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card glass-card rounded-2xl p-6 relative group"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-glow">
                  <Quote className="w-4 h-4 text-white" />
                </div>

                <blockquote className="text-[hsl(var(--fg-secondary))] text-sm leading-relaxed mb-6 pt-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="border-t border-[hsl(var(--border-subtle))] pt-4">
                  <div className="font-heading font-semibold text-[hsl(var(--fg-primary))] text-sm">
                    {testimonial.author}
                  </div>
                  <div className="font-mono text-xs text-[hsl(var(--primary))]/70 mt-1">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clientStats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-6 rounded-xl glass-card"
            >
              <div className="font-heading font-bold text-3xl text-gradient mb-2">
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
