import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ANIMATION } from "@/lib/animations";

import projectsData from "@/data/projects.json";
import type {
  ProjectsData,
  Project,
  ProjectCategory,
} from "@/types/portfolio.types";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const data = projectsData as ProjectsData;

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? data.items
      : data.items.filter((p) => p.category === activeFilter);

  // Initial scroll animation
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
            start: "top 90%",
          },
        }
      );

      // Filters animation
      const filterButtons = filtersRef.current?.querySelectorAll("button");
      if (filterButtons) {
        gsap.fromTo(
          filterButtons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION.DURATIONS.normal,
            stagger: ANIMATION.STAGGER.fast,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 90%",
            },
          }
        );
      }

      // Grid animation
      const gridItems = gridRef.current?.querySelectorAll(".project-card");
      if (gridItems) {
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.DURATIONS.slow,
            stagger: ANIMATION.STAGGER.normal,
            ease: ANIMATION.EASINGS.outExpo,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter transition animation
  useEffect(() => {
    const gridItems = gridRef.current?.querySelectorAll(".project-card");

    if (gridItems) {
      gsap.fromTo(
        gridItems,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: ANIMATION.DURATIONS.normal,
          stagger: ANIMATION.STAGGER.fast,
          ease: ANIMATION.EASINGS.outBack,
        }
      );
    }
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Projects section"
    >
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-violet-500/5 to-transparent pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Header */}
        <div ref={headingRef} className="mb-12">
          <span className="font-mono text-sm text-[hsl(var(--primary))] uppercase tracking-wider mb-4 block">
            / Portfolio
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--fg-primary))] mb-4 tracking-tight">
                Engineering{" "}
                <span className="text-gradient">Milestones</span>
              </h2>

              <p className="text-lg text-[hsl(var(--fg-secondary))] max-w-2xl leading-relaxed">
                A selection of major EPC projects spanning refinery, gas processing, power generation, and pipeline infrastructure across global markets.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div ref={filtersRef} className="flex flex-wrap gap-3 mb-12" role="group" aria-label="Filter projects by category">
          {data.categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              aria-pressed={activeFilter === category.value}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out-back hover:scale-105 ${
                activeFilter === category.value
                  ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-glow"
                  : "glass-card text-[hsl(var(--fg-secondary))] hover:text-[hsl(var(--fg-primary))]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card glass-card rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-label={`View details for ${project.name}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-56 object-cover transition-all duration-700 ease-out-expo group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg-primary))]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6">
                <h3 className="font-heading font-semibold text-[hsl(var(--fg-primary))] mb-3 group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {project.name}
                </h3>

                <div className="flex items-center gap-2 text-[hsl(var(--fg-tertiary))] text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-2xl glass-floating border-[var(--glass-border-strong)]">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-[hsl(var(--primary))] text-sm font-mono mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProject.location}</span>
                </div>

                <DialogTitle className="font-heading text-2xl md:text-3xl text-[hsl(var(--fg-primary))]">
                  {selectedProject.name}
                </DialogTitle>

                <DialogDescription className="text-[hsl(var(--fg-secondary))] leading-relaxed">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider mb-3">
                    Role
                  </h4>
                  <p className="text-[hsl(var(--fg-secondary))]">
                    {selectedProject.role}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider mb-3">
                    Scope
                  </h4>

                  <div className="grid gap-2">
                    {selectedProject.scope.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg glass-card"
                      >
                        <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] shadow-glow" />
                        <span className="text-[hsl(var(--fg-secondary))] text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[hsl(var(--fg-tertiary))] uppercase tracking-wider">
                    Category:
                  </span>

                  <span className="px-3 py-1.5 rounded-full glass-card text-sm text-[hsl(var(--primary))] capitalize border border-[hsl(var(--primary))]/20">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
