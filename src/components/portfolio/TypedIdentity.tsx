import { useEffect, useRef, useState } from "react";

const lines = [
  "$ whoami",
  "{",
  '  "name": "Tanishq Jain",',
  '  "role": "Website Developer",',
  '  "superpower": "Code + AI",',
  '  "mission": "Make every business look premium online",',
  '  "status": "Open for projects"',
  "}",
];
const text = lines.join("\n");

export function TypedIdentity() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) { setCount(text.length); return; }
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let position = 0;
    const start = () => {
      interval = setInterval(() => {
        position = Math.min(position + 2, text.length);
        setCount(position);
        if (position === text.length) {
          clearInterval(interval);
          timeout = setTimeout(() => {
            if (!visible) return;
            position = 0;
            setCount(0);
            start();
          }, 6000);
        }
      }, 45);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      clearInterval(interval);
      clearTimeout(timeout);
      if (visible) {
        position = 0;
        setCount(0);
        start();
      }
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => { observer.disconnect(); clearInterval(interval); clearTimeout(timeout); };
  }, []);

  let offset = 0;
  return (
    <div ref={ref} className="identity-code space-y-1.5 p-5" aria-label={text}>
      {lines.map((line, index) => {
        const start = offset;
        offset += line.length + 1;
        const typed = line.slice(0, Math.max(0, count - start));
        const cursor = count >= start && count <= start + line.length;
        return (
          <div key={index} aria-hidden="true" className={`relative min-h-5 whitespace-pre-wrap break-words ${index === 0 ? "text-cyan" : index > 1 && index < lines.length - 1 ? "text-silver" : "text-muted-foreground"}`}>
            <span className="invisible">{line}</span>
            <span className="absolute inset-0">{typed}{cursor && <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-cyan" />}</span>
          </div>
        );
      })}
    </div>
  );
}