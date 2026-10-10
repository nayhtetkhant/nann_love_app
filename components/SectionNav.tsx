"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "anniversary", label: "Anniversary" },
  { id: "birthday", label: "Birthday" },
  { id: "notes", label: "Notes" },
  { id: "wishes", label: "Wishes" },
  { id: "photos", label: "Photos" },
] as const;

export default function SectionNav() {
  const [active, setActive] = useState<string>("anniversary");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.6] },
    );

    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-40 border-b border-white/60 bg-cream/85 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-4xl items-center justify-center gap-1 overflow-x-auto px-3 py-2.5 sm:gap-2">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition sm:text-sm ${
                active === section.id
                  ? "bg-rose-deep text-white shadow-md"
                  : "text-plum/70 hover:bg-rose/15 hover:text-rose-deep"
              }`}
              aria-current={active === section.id ? "true" : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
