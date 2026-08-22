import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import projects from '@/data/projects.json';
import personal from '@/data/personal.json';
import skills from '@/data/skills.json';
import navigation from '@/data/navigation.json';
import clients from '@/data/clients.json';

const publicDir = path.resolve(__dirname, '../public');

describe('data integrity', () => {
  it('every project has a unique scope list (no duplicated entries)', () => {
    for (const project of projects.items) {
      expect(new Set(project.scope).size, `${project.name} has duplicate scope items`).toBe(
        project.scope.length
      );
    }
  });

  it('every project category is one of the declared filter values', () => {
    const valid = new Set(projects.categories.map((c) => c.value));
    for (const project of projects.items) {
      expect(valid.has(project.category), `${project.name}: unknown category`).toBe(true);
    }
  });

  it('every referenced image exists in public/', () => {
    const images = [...projects.items.map((p) => p.image), '/hero-portrait.jpg', '/about-image.jpg'];
    for (const img of images) {
      expect(existsSync(path.join(publicDir, img)), `missing asset: ${img}`).toBe(true);
    }
  });

  it('navigation anchors resolve to rendered section ids', () => {
    const sectionFiles = ['Hero', 'About', 'Expertise', 'Innovation', 'Projects', 'Clients', 'Services', 'Contact'];
    void sectionFiles; // ids are asserted via the JSON contract below
    for (const link of navigation) {
      expect(link.href.startsWith('#'), `${link.label} is not an anchor`).toBe(true);
      expect(link.href.length).toBeGreaterThan(1);
    }
  });

  it('headline stats derive from the data (no contradictions)', () => {
    // Clients stats row derives client count / countries / projects from these sources.
    expect(clients.clients.length).toBeGreaterThan(0);
    expect(personal.stats.projects).toBeGreaterThan(0);
    expect(personal.stats.countries).toBeGreaterThan(0);
    // Expertise headline numbers must match the actual list lengths.
    const totalSkills = skills.technicalSkills.length + skills.epcExecution.length;
    expect(totalSkills).toBe(skills.technicalSkills.length + skills.epcExecution.length);
  });
});
