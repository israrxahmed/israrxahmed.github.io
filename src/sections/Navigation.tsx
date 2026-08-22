import { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import navigationData from '@/data/navigation.json';
import personalData from '@/data/personal.json';
import type { NavigationData, PersonalData } from '@/types/portfolio.types';

const navLinks = navigationData as NavigationData;
const personal = personalData as PersonalData;
const sectionIds = [...navLinks].map((link) => link.href.slice(1)).reverse();

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const lastScrollYRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  // Single scroll subscription for the component's lifetime.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      // Show/hide based on scroll direction. Functional updates keep this
      // correct without subscribing to render state (single listener).
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
      setIsScrolled(currentScrollY > 50);

      // Update active section (deepest section whose top passed the threshold)
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu behaviour: Escape to close, body scroll lock, focus management.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';

    firstMenuLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      menuButton?.focus();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'glass-card border-b border-[var(--glass-border)]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav
          className="container-wide mx-auto px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center transition-all duration-300 ease-out-back group-hover:shadow-glow-mixed group-hover:scale-105">
                <span className="font-heading font-bold text-white text-lg">{personal.initials}</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading font-semibold text-foreground text-sm leading-tight transition-colors duration-300">
                  {personal.name}
                </div>
                <div className="font-mono text-xs text-[hsl(var(--fg-tertiary))]">
                  {personal.designation}
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.filter(link => link.href !== '#hero').map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link ${
                    activeSection === link.href.slice(1) ? 'active' : ''
                  }`}
                  aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl text-[hsl(var(--fg-secondary))] hover:text-[hsl(var(--fg-primary))] glass-card hover:bg-[var(--glass-bg-hover)] transition-all duration-300 ease-out-back hover:scale-105"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative p-2.5 rounded-xl text-[hsl(var(--fg-secondary))] hover:text-[hsl(var(--fg-primary))] glass-card hover:bg-[var(--glass-bg-hover)] transition-all duration-300 ease-out-back"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute left-0 top-1/2 w-6 h-0.5 bg-current transform transition-all duration-300 ease-out-back ${
                      isMobileMenuOpen ? 'rotate-45 -translate-y-1/2' : '-translate-y-2'
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 w-6 h-0.5 bg-current transform transition-all duration-300 ease-out-back ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1/2' : 'translate-y-0.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out-expo ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop with blur */}
        <div
          className="absolute inset-0 glass-floating"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <nav className="relative h-full flex flex-col items-center justify-center gap-6 p-8">
          {navLinks.filter(link => link.href !== '#hero').map((link, index) => (
            <a
              key={link.href}
              ref={index === 0 ? firstMenuLinkRef : undefined}
              href={link.href}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-2xl font-heading font-semibold transition-all duration-300 ease-out-back hover:scale-105 ${
                activeSection === link.href.slice(1)
                  ? 'text-[hsl(var(--primary))]'
                  : 'text-[hsl(var(--fg-secondary))] hover:text-[hsl(var(--fg-primary))]'
              }`}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
