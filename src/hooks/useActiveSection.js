import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in the viewport center.
 * @param {string[]} ids - Array of section element ids to observe
 * @returns {string}     - The currently active section id
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        // rootMargin shrinks the detection zone to the vertical center
        { rootMargin: "-40% 0px -55% 0px" },
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o && o.disconnect());
  }, [ids]);

  return active;
}
