import { useEffect, useState } from "react";
import { Lightbulb, PenTool, Code2, Rocket, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: Lightbulb, t: "Idea", log: "> brief received from client" },
  { icon: PenTool, t: "Design", log: "> wireframes + UI ready" },
  { icon: Code2, t: "Develop", log: "> npm run build ✓" },
  { icon: Rocket, t: "Launch", log: "> deployed to yourbrand.com" },
  { icon: CheckCircle2, t: "Delivered", log: "> client: \"love it!\" ★★★★★" },
];

export function BuildProcess() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x + 1) % (STEPS.length + 1)), 1800);
    return () => clearInterval(t);
  }, []);
  const step = Math.min(s, STEPS.length - 1);
  const pct = Math.round((Math.min(s, STEPS.length - 1) / (STEPS.length - 1)) * 100);
  const show = (n: number) => `transition-all duration-700 ${s >= n ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`;

  return (
    <div className="relative mx-auto w-full max-w-[480px] [perspective:1200px]" aria-label="Website building process: idea, design, develop, launch, delivered">
      <div className="absolute -inset-8 rounded-full bg-cyan/10 blur-3xl" />
      <div className="relative animate-float [transform:rotateY(-10deg)_rotateX(6deg)]">
        {/* browser */}
        <div className="glass glow overflow-hidden rounded-2xl">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive" /><span className="h-2.5 w-2.5 rounded-full bg-silver" /><span className="h-2.5 w-2.5 rounded-full bg-cyan" />
            <span className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">https://yourbrand.com</span>
          </div>
          <div className="relative h-56 p-4 sm:h-64">
            <div className={`flex items-center justify-between ${show(1)}`}>
              <div className="h-3 w-16 rounded bg-brand" />
              <div className="flex gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-2 w-8 rounded bg-muted" />)}</div>
            </div>
            <div className={`mt-6 space-y-2 ${show(2)}`}>
              <div className="h-5 w-3/4 rounded bg-silver/80" />
              <div className="h-5 w-1/2 rounded bg-brand" />
              <div className="h-2 w-2/3 rounded bg-muted" />
              <div className="h-7 w-24 rounded-full bg-cyan/80 mt-3" />
            </div>
            <div className={`mt-5 grid grid-cols-3 gap-2 ${show(3)}`}>
              {[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-lg border border-border bg-secondary" />)}
            </div>
            {s === 0 && (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
                <span className="animate-pulse">waiting for your idea…</span>
              </div>
            )}
            {s >= STEPS.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-in fade-in zoom-in-90 duration-500">
                <div className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-semibold text-primary-foreground glow">
                  <CheckCircle2 className="h-5 w-5" /> Delivered to client
                </div>
              </div>
            )}
          </div>
          <div className="h-1 bg-muted"><div className="h-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} /></div>
        </div>

        {/* terminal */}
        <div className="glass absolute -bottom-10 -left-4 w-60 rounded-xl p-3 font-mono text-[11px] sm:-left-10 [transform:translateZ(60px)]">
          {STEPS.slice(0, step + 1).slice(-3).map((x) => (
            <p key={x.t} className="truncate text-cyan animate-in fade-in slide-in-from-left-2">{x.log}</p>
          ))}
        </div>
      </div>

      {/* steps */}
      <ol className="relative mt-16 flex justify-between">
        <div className="absolute top-5 right-5 left-5 h-px bg-border" />
        <div className="absolute top-5 left-5 h-px bg-brand transition-all duration-700" style={{ width: `calc(${pct}% - ${pct / 10}px)` }} />
        {STEPS.map(({ icon: Icon, t }, k) => (
          <li key={t} className="relative flex flex-col items-center gap-2">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${k <= step ? "border-cyan bg-brand text-primary-foreground glow scale-110" : "border-border bg-secondary text-muted-foreground"}`}>
              <Icon className="h-4 w-4" />
            </span>
            <span className={`font-mono text-[10px] uppercase sm:text-xs ${k <= step ? "text-cyan" : "text-muted-foreground"}`}>{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
