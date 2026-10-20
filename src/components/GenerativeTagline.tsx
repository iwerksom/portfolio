"use client";

import { useEffect, useState } from "react";

/**
 * GenerativeTagline
 *
 * Drops into the Hero section. On mount it fetches /api/tagline,
 * which calls Claude server-side and returns one sentence.
 *
 * Shows a subtle pulse while loading, fades the sentence in when ready.
 * Falls back gracefully if the API is unavailable.
 *
 * Usage in Nav.tsx:
 *   import GenerativeTagline from '@/components/GenerativeTagline'
 *   <GenerativeTagline />
 */

export default function GenerativeTagline() {
  const [tagline, setTagline] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/tagline")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) {
          setTagline(data.tagline ?? null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex items-center gap-2 min-h-[20px]">
      {/* live indicator dot */}
      <span
        className={`
          inline-block w-1.5 h-1.5 rounded-full shrink-0
          ${loading ? "bg-ink-dim animate-pulse" : "bg-c64"}
        `}
        style={
          !loading
            ? {
                boxShadow: "0 0 0 0 rgba(29,158,117,0)",
                animation: "ping 2.5s ease-out infinite",
              }
            : undefined
        }
      />

      {loading ? (
        <span className="font-mono text-[10px] tracking-widest text-ink-dim animate-pulse">
          // loading
        </span>
      ) : tagline ? (
        <span
          className="font-mono text-[11px] tracking-wide text-ink-dim italic transition-opacity duration-700"
          style={{ opacity: tagline ? 1 : 0 }}
        >
          {tagline}
        </span>
      ) : null}

      <style>{`
        @keyframes ping {
          0%   { box-shadow: 0 0 0 0 rgba(29,158,117,0.6); }
          70%  { box-shadow: 0 0 0 5px rgba(29,158,117,0); }
          100% { box-shadow: 0 0 0 0 rgba(29,158,117,0); }
        }
      `}</style>
    </div>
  );
}
