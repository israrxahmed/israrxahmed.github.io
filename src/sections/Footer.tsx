import { Linkedin, Mail, ArrowUp } from 'lucide-react';
import navigationData from '@/data/navigation.json';
import personalData from '@/data/personal.json';
import type { NavigationData, PersonalData } from '@/types/portfolio.types';

const navLinks = navigationData as NavigationData;
const personal = personalData as PersonalData;

// Filter out Home and Innovation for footer quick links
const quickLinks = navLinks.filter(link =>
  link.href !== '#hero' && link.href !== '#innovation' && link.href !== '#clients'
);

const socialLinks = [
  { icon: Linkedin, href: personal.contact.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personal.contact.email}`, label: 'Email' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[hsl(var(--bg-primary))] border-t border-[hsl(var(--border-subtle))]" aria-label="Footer">
      {/* Main Footer Content */}
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-glow-mixed">
                <span className="font-heading font-bold text-white text-xl">{personal.initials}</span>
              </div>
              <div>
                <div className="font-heading font-semibold text-[hsl(var(--fg-primary))] text-lg">
                  {personal.name}
                </div>
                <div className="font-mono text-xs text-[hsl(var(--primary))]">
                  {personal.designation}
                </div>
              </div>
            </div>
            <p className="text-[hsl(var(--fg-secondary))] text-sm leading-relaxed max-w-md mb-6">
              Delivering electrical engineering leadership across refinery, petrochemical, 
              gas, and power EPC projects with {personal.stats.yearsExperience}+ years of expertise.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-[hsl(var(--fg-tertiary))] hover:text-[hsl(var(--primary))] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-[hsl(var(--fg-primary))] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[hsl(var(--fg-tertiary))] hover:text-[hsl(var(--primary))] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-[hsl(var(--fg-primary))] mb-6">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${personal.contact.email}`}
                className="flex items-center gap-3 text-[hsl(var(--fg-tertiary))] hover:text-[hsl(var(--primary))] transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{personal.contact.email}</span>
              </a>
              <a
                href={personal.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[hsl(var(--fg-tertiary))] hover:text-[hsl(var(--primary))] transition-colors duration-300 text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span>{personal.contact.linkedin.replace('https://', '')}</span>
              </a>
              <div className="flex items-center gap-3 text-[hsl(var(--fg-tertiary))] text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>{personal.contact.availabilityStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[hsl(var(--border-subtle))]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[hsl(var(--fg-tertiary))] text-sm text-center md:text-left">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[hsl(var(--fg-tertiary))] text-sm">
                {personal.designation}
              </span>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-[hsl(var(--fg-tertiary))] hover:text-[hsl(var(--primary))] transition-all duration-300 hover:shadow-glow"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text — SVG scales the full name to fit any width */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02]" aria-hidden="true">
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="xMidYMax meet"
          className="block w-full"
          role="presentation"
        >
          <text
            x="600"
            y="132"
            textAnchor="middle"
            fill="hsl(var(--fg-primary))"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: '150px', letterSpacing: '-0.02em' }}
          >
            {personal.name.toUpperCase()}
          </text>
        </svg>
      </div>
    </footer>
  );
}
