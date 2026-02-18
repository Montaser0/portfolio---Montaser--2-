"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type Line = { t: string; k?: string };

function useTypewriter(lines: Line[], speed = 28, pause = 500) {
  const [display, setDisplay] = useState<string[]>([]);
  useEffect(() => {
    let li = 0;
    let ci = 0;
    let buf = "";
    let timeout: any;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const line = lines[li].t;
      if (ci < line.length) {
        buf += line[ci];
        ci += 1;
        setDisplay((d) => [...d.slice(-9), buf]);
        timeout = setTimeout(tick, speed);
      } else {
        setDisplay((d) => [...d.slice(-9), line]);
        li = (li + 1) % lines.length;
        ci = 0;
        buf = "";
        timeout = setTimeout(tick, pause);
      }
    };
    timeout = setTimeout(tick, 200);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [lines, speed, pause]);
  return display;
}

function highlight(line: string): ReactNode[] {
  const spans: ReactNode[] = [];
  const regex =
    /(`[^`]*`|"[^"]*"|'[^']*'|\b(?:const|let|var|function|async|await|return|import|from|type|interface|new|if|else|for|while|class|extends)\b|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(line)) !== null) {
    if (m.index > last) {
      spans.push(<span key={`t-${key++}`}>{line.slice(last, m.index)}</span>);
    }
    const tok = m[0];
    let cls = "";
    if (/^["'`]/.test(tok)) cls = "text-emerald-400";
    else if (/^\b\d/.test(tok)) cls = "text-amber-400";
    else if (
      /\b(const|let|var|function|async|await|return|import|from|type|interface|new|if|else|for|while|class|extends)\b/.test(
        tok
      )
    )
      cls = "text-sky-400";
    else if (/^\b[A-Z]/.test(tok)) cls = "text-fuchsia-400";
    else cls = "text-foreground";
    spans.push(
      <span key={`t-${key++}`} className={cls}>
        {tok}
      </span>
    );
    last = regex.lastIndex;
  }
  if (last < line.length) spans.push(<span key={`t-${key++}`}>{line.slice(last)}</span>);
  return spans;
}

export function CodeScene3D() {
  const code = useMemo<Line[]>(
    () => [
      { t: "import { Agent } from \"ai-kit\";" },
      { t: "const skills = [\"search\", \"reason\", \"act\"];" },
      { t: "const agent = new Agent({ skills });" },
      { t: "type User = { id: string; name: string }" },
      { t: "const cache = new Map<string, User>();" },
      { t: "async function getUser(id: string) {" },
      { t: "  if (cache.has(id)) return cache.get(id)!" },
      { t: "  const res = await fetch(`/api/users/${id}`);" },
      { t: "  const json = await res.json();" },
      { t: "  cache.set(id, json); return json" },
      { t: "}" },
      { t: "await agent.run(\"build portfolio with Next.js & Tailwind\");" },
    ],
    []
  );
  const typed = useTypewriter(code);
  const [entered, setEntered] = useState<Set<number>>(new Set());
  useEffect(() => {
    const i = typed.length - 1;
    if (i >= 0) {
      const to = setTimeout(() => {
        setEntered((prev) => {
          const n = new Set(prev);
          n.add(i);
          return n;
        });
      }, 10);
      return () => clearTimeout(to);
    }
  }, [typed.length]);
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-full">
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-cyan-500/10 to-transparent blur-3xl rounded-3xl" />
      <div className="relative h-full rounded-xl border border-border/70 bg-background/40 backdrop-blur-md shadow-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/60 bg-muted/30">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs text-muted-foreground">app.ts</span>
        </div>
        <pre dir="ltr" className="p-6 text-left text-[13px] md:text-[14px] leading-6 font-mono text-muted-foreground">
          {typed.map((l, i) => (
            <div
              key={i}
              className={`whitespace-pre flex items-baseline transform transition-all duration-500 ${
                entered.has(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
            >
              <span className="w-8 text-right pr-3 text-muted-foreground/40 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground flex-1">{highlight(l)}</span>
              {i === typed.length - 1 ? <span className="animate-pulse">▍</span> : null}
            </div>
          ))}
        </pre>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-xl" />
      </div>
    </div>
  );
}
