"use client";

import { useMemo } from "react";

/** Decorative hearts drifting up behind the content. */
export default function FloatingHearts() {
  // Fixed set so server and client render identical markup.
  const hearts = useMemo(
    () => [
      { left: 6, delay: 0, duration: 17, size: 16, opacity: 0.5 },
      { left: 17, delay: 6, duration: 21, size: 11, opacity: 0.4 },
      { left: 29, delay: 11, duration: 19, size: 20, opacity: 0.35 },
      { left: 41, delay: 3, duration: 23, size: 13, opacity: 0.45 },
      { left: 53, delay: 14, duration: 18, size: 17, opacity: 0.4 },
      { left: 66, delay: 8, duration: 24, size: 10, opacity: 0.5 },
      { left: 78, delay: 2, duration: 20, size: 18, opacity: 0.35 },
      { left: 89, delay: 12, duration: 22, size: 14, opacity: 0.45 },
    ],
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((heart, index) => (
        <svg
          key={index}
          className="heart"
          viewBox="0 0 24 24"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
          fill="#f9a8d4"
        >
          <path d="M12 21s-7.5-4.7-9.4-9.1C1.1 8.4 3 5 6.4 5c2 0 3.4 1.1 4.3 2.4l1.3 1.8 1.3-1.8C14.2 6.1 15.6 5 17.6 5 21 5 22.9 8.4 21.4 11.9 19.5 16.3 12 21 12 21z" />
        </svg>
      ))}
    </div>
  );
}
