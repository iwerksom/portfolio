"use client";

/**
 * Prose — lightweight markdown renderer for project descriptions and post bodies.
 *
 * Supports:
 *   ## Heading 2
 *   ### Heading 3
 *   **bold**
 *   _italic_
 *   - unordered list item
 *   1. ordered list item
 *   [link text](url)
 *   `inline code`
 *   blank line = new paragraph
 */

import type { ReactNode } from "react";

// ─── inline parser ────────────────────────────────────────────────────────────

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*(.+?)\*\*|_(.+?)_|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));

    if (m[0].startsWith("**")) {
      nodes.push(
        <strong key={m.index} className="font-medium text-text">
          {m[2]}
        </strong>,
      );
    } else if (m[0].startsWith("`")) {
      nodes.push(
        <code
          key={m.index}
          className="font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded text-c64"
        >
          {m[4]}
        </code>,
      );
    } else if (m[0].startsWith("_")) {
      nodes.push(
        <em key={m.index} className="italic text-text-mid">
          {m[3]}
        </em>,
      );
    } else {
      nodes.push(
        <a
          key={m.index}
          href={m[6]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-c64 underline underline-offset-2 decoration-c64/40 hover:decoration-c64 transition-all duration-150"
        >
          {m[5]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// ─── block parser ─────────────────────────────────────────────────────────────

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function parseBlocks(markdown: string): Block[] {
  const rawLines = markdown.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i].trimEnd();

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      i++;
    } else if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < rawLines.length && /^- /.test(rawLines[i].trimEnd())) {
        items.push(rawLines[i].replace(/^- /, "").trimEnd());
        i++;
      }
      if (items.length) blocks.push({ type: "ul", items });
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < rawLines.length && /^\d+\. /.test(rawLines[i].trimEnd())) {
        items.push(rawLines[i].replace(/^\d+\. /, "").trimEnd());
        i++;
      }
      if (items.length) blocks.push({ type: "ol", items });
    } else if (line.trim() === "") {
      // blank line — skip
      i++;
    } else {
      // paragraph — collect contiguous non-blank, non-special lines
      const lines: string[] = [];
      while (i < rawLines.length) {
        const cur = rawLines[i].trimEnd();
        // stop conditions
        if (
          cur.trim() === "" ||
          cur.startsWith("#") ||
          /^- /.test(cur) ||
          /^\d+\. /.test(cur)
        )
          break;
        lines.push(cur);
        i++; // ← always advances; can never loop forever
      }
      if (lines.length) blocks.push({ type: "p", text: lines.join(" ") });
    }
  }

  return blocks;
}

// ─── renderer ─────────────────────────────────────────────────────────────────

interface ProseProps {
  markdown: string;
  className?: string;
}

export default function Prose({ markdown, className = "" }: ProseProps) {
  // Safety: if parsing somehow throws, render raw text rather than crashing
  let blocks: Block[] = [];
  try {
    blocks = parseBlocks(markdown ?? "");
  } catch {
    return (
      <p className={`text-text-mid text-sm leading-relaxed ${className}`}>
        {markdown}
      </p>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="font-mono text-sm tracking-widest uppercase text-c64 mt-8 first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="font-mono text-xs tracking-widest uppercase text-text-mid mt-6 first:mt-0"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={idx} className="space-y-1.5 pl-4">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative text-text-mid text-sm leading-relaxed before:absolute before:-left-4 before:content-['—'] before:text-c64/60"
                  >
                    {parseInline(item)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="space-y-1.5 pl-4 list-none">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative text-text-mid text-sm leading-relaxed"
                  >
                    <span className="absolute -left-4 font-mono text-c64/60 text-xs">
                      {j + 1}.
                    </span>
                    {parseInline(item)}
                  </li>
                ))}
              </ol>
            );
          case "p":
          default:
            return (
              <p key={idx} className="text-text-mid text-sm leading-relaxed">
                {parseInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
