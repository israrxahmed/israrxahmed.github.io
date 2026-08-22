import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation System Configuration
 *
 * Provides consistent animation patterns across the application
 * with support for reduced motion preferences.
 */

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Animation duration constants (in seconds for GSAP)
const DURATIONS = {
  instant: 0.15,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1,
} as const;

// Easing curves
const EASINGS = {
  outExpo: 'expo.out',
  outQuart: 'power2.out',
  outBack: 'back.out(1.7)',
  inOutSine: 'sine.inOut',
  spring: 'elastic.out(1, 0.5)',
} as const;

// Stagger delays (in seconds)
const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

// Scroll trigger defaults
const SCROLL_DEFAULTS = {
  start: 'top 90%',
  end: 'bottom 10%',
  toggleActions: 'play none none reverse' as const,
};

/**
 * Hero character animation
 */
export const animateHeroChars = (
  chars: NodeListOf<Element>,
  options: { stagger?: number; delay?: number } = {}
) => {
  if (prefersReducedMotion()) {
    return gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 });
  }

  return gsap.fromTo(
    chars,
    { opacity: 0, y: 50, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: options.stagger ?? 0.03,
      ease: EASINGS.outBack,
      delay: options.delay ?? 0.5,
    }
  );
};

/**
 * Floating animation
 */
export const floatingAnimation = (
  element: gsap.TweenTarget,
  options: { duration?: number; y?: number } = {}
) => {
  if (prefersReducedMotion()) return;

  return gsap.to(element, {
    y: options.y ?? -15,
    duration: options.duration ?? 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

// Export constants for use in components
export const ANIMATION = {
  DURATIONS,
  EASINGS,
  STAGGER,
  SCROLL_DEFAULTS,
  prefersReducedMotion,
};
