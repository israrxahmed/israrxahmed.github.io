import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import Innovation from "./sections/Innovation";
import Projects from "./sections/Projects";
import Clients from "./sections/Clients";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

import ParticleBackground from "./components/ParticleBackground";
import { ThemeProvider } from "./context/ThemeContext";

// Register GSAP plugin once at module load
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Controls loading screen state
  const [isLoading, setIsLoading] = useState(true);

  // Ref used by GSAP context for scoped animations
  const mainRef = useRef<HTMLDivElement>(null);

  /*
    ---------------------------------------------------
    LOADING GATE
    ---------------------------------------------------
    Shows the branded loading screen only while web fonts
    are still loading, capped at 800 ms so a slow/blocked
    font host can never hold the page hostage.
  */
  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) setIsLoading(false);
    };
    const cap = setTimeout(finish, 800);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        clearTimeout(cap);
        finish();
      });
    }
    return () => {
      cancelled = true;
      clearTimeout(cap);
    };
  }, []);

  /*
    ---------------------------------------------------
    GSAP SCROLL INIT
    ---------------------------------------------------
    Runs only AFTER loading completes.
    Uses GSAP context for proper cleanup.
  */
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, [isLoading]);

  /*
    ---------------------------------------------------
    IMPORTANT ARCHITECTURE NOTE
    ---------------------------------------------------
    ThemeProvider wraps EVERYTHING — including loading UI.

    This prevents:
    "useTheme must be used within a ThemeProvider"
    runtime crashes.
  */
  return (
    <ThemeProvider>
      {isLoading ? (
        /*
          ----------------------------
          LOADING SCREEN
          ----------------------------
          Safe because provider exists above.
        */
        <div className="fixed inset-0 bg-void flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-pulse" />
              <div className="absolute inset-2 border-2 border-t-cyan-500 border-r-transparent border-b-violet-500 border-l-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading font-bold text-2xl text-gradient">
                  IA
                </span>
              </div>
            </div>

            <div className="font-mono text-sm text-cyan-500/70 animate-pulse">
              INITIALIZING...
            </div>
          </div>
        </div>
      ) : (
        /*
          ----------------------------
          MAIN APPLICATION
          ----------------------------
        */
        <div
          ref={mainRef}
          className="relative min-h-screen bg-void text-foreground overflow-x-hidden"
        >
          {/* Decorative particle layer */}
          <ParticleBackground />

          {/* Navigation uses ThemeContext safely */}
          <Navigation />

          {/* Main content sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Expertise />
            <Innovation />
            <Projects />
            <Clients />
            <Services />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
