import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, Mail, Phone, Linkedin, Menu, X, Send,
  Code2, Sparkles, Palette, Search, Globe, MapPin,
} from "lucide-react";
import logo from "@/assets/logo-mark.png.asset.json";
import photo from "@/assets/tanishq-themed-portrait.jpg";
import jmjVideo from "@/assets/jmj-hero-only.webm.asset.json";
import preranaVideo from "@/assets/prerana-hero-only.webm.asset.json";
import { NetworkCanvas } from "@/components/portfolio/NetworkCanvas";
import { TiltCard } from "@/components/portfolio/TiltCard";
import { BuildProcess } from "@/components/portfolio/BuildProcess";
import { TypedIdentity } from "@/components/portfolio/TypedIdentity";
import { WhatsAppIcon } from "@/components/portfolio/WhatsAppIcon";
import { Button } from "@/components/ui/button";

const TITLE = "Tanishq Jain | Freelance Website Developer & AI Web Designer in Delhi";
const DESC =
  "Tanishq Jain is a freelance website developer in Delhi building fast, SEO-friendly, responsive business websites using AI-powered web development. Hire a web developer today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Tanishq Jain, website developer, freelance web developer Delhi, AI website development, web designer, responsive website design, SEO friendly website, business website developer, portfolio" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Tanishq Jain",
          jobTitle: "Website Developer",
          email: "mailto:tanishqjain476@gmail.com",
          telephone: "+91-7489842114",
          sameAs: ["https://www.linkedin.com/in/tanishq-jain-sggscc"],
          knowsAbout: ["Web Development", "AI Website Development", "SEO", "Responsive Web Design"],
        }),
      },
    ],
  }),
  component: Index,
});

const PHONE = "917489842114";
const EMAIL = "tanishqjain476@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/tanishq-jain-sggscc";
const WHATSAPP = `https://wa.me/${PHONE}?text=${encodeURIComponent("hello can i get more info on this?")}`;

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      let cur = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = n.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => { setOpen(false); setActive(id); scrollTo(id); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-6"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Button variant="ghost" onClick={() => go("home")} className="group h-auto gap-3 p-0 hover:bg-transparent" aria-label="Tanishq Jain home">
          <span className="relative">
            <img src={logo.url} alt="Tanishq Jain logo" className="h-16 w-20 shrink-0 object-contain sm:h-20 sm:w-24" />
          </span>
          <span className="font-display text-base font-bold tracking-wide sm:text-lg">TANISHQ<span className="text-cyan">.</span></span>
        </Button>
        <ul className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <Button variant="ghost" onClick={() => go(n.id)} className={`nav-link h-auto rounded-none p-0 text-sm font-medium uppercase hover:bg-transparent hover:text-cyan hover:opacity-100 ${active === n.id ? "active text-cyan opacity-100" : "text-muted-foreground opacity-60"}`}>
                {n.label}
              </Button>
            </li>
          ))}
        </ul>
        <button onClick={() => go("contact")} className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground glow transition-transform hover:scale-105 md:block">
          Hire Me
        </button>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="glass mx-5 mt-3 flex flex-col gap-1 rounded-2xl p-4 md:hidden animate-in fade-in slide-in-from-top-2">
          {NAV.map((n) => (
            <li key={n.id}>
              <button onClick={() => go(n.id)} className={`w-full rounded-lg px-4 py-3 text-left font-medium ${active === n.id ? "bg-secondary text-cyan" : ""}`}>{n.label}</button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function Hero() {
  const words = ["Websites", "Experiences", "Brands", "AI Products"];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % words.length), 2200); return () => clearInterval(t); }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <div className="grid-bg absolute inset-0" />
      <NetworkCanvas />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-azure/30 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 font-mono text-xs text-cyan">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" /> Available for freelance projects
          </p>
          <h1 className="leading-[1.1] font-extrabold">
            <span className="hero-greeting whitespace-nowrap">Hi, I'm <span className="text-gradient">Tanishq Jain</span></span>
            <span className="mt-3 block text-3xl font-bold text-muted-foreground sm:text-4xl lg:text-5xl">
              I craft{" "}
              <span key={i} className="inline-block text-silver animate-in fade-in slide-in-from-bottom-4 duration-700">{words[i]}</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A <strong className="text-foreground">freelance website developer</strong> turning ideas into digital experiences —
            fast, responsive and <strong className="text-foreground">SEO-friendly websites</strong> built with the power of
            <strong className="text-foreground"> AI web development</strong>.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => scrollTo("projects")} className="group flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-primary-foreground glow transition-transform hover:scale-105">
              View My Work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
            <button onClick={() => scrollTo("contact")} className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-cyan hover:text-cyan">
              Let's Talk
            </button>
          </div>
          <div className="mt-12 flex gap-10 font-mono">
            {[["2+", "Client Websites"], ["100%", "Responsive"], ["AI", "Powered Builds"]].map(([n, l]) => (
              <div key={l}><div className="text-3xl font-bold text-gradient">{n}</div><div className="text-xs text-muted-foreground uppercase">{l}</div></div>
            ))}
          </div>
        </div>

        <BuildProcess />
      </div>
      <button onClick={() => scrollTo("about")} aria-label="Scroll down" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/50 pt-2"><span className="h-2 w-1 animate-bounce rounded-full bg-cyan" /></div>
      </button>
    </section>
  );
}

function SectionTitle({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  return (
    <div className="reveal mx-auto mb-16 max-w-2xl text-center">
      <p className="font-mono text-sm text-cyan">&lt;{tag} /&gt;</p>
      <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl"><span className="text-gradient">{title}</span></h2>
      <p className="mt-4 text-muted-foreground">{sub}</p>
    </div>
  );
}

const SKILLS = [
  { icon: Code2, t: "Website Development", d: "Fast, clean-coded websites built with modern tech and AI." },
  { icon: Palette, t: "UI / UX Design", d: "Aesthetic, user-friendly interfaces with motion and 3D." },
  { icon: Search, t: "SEO Optimization", d: "Structured content and speed that help you rank on Google." },
];

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle tag="about" title="About Me" sub="Web developer passionate about building digital experiences that grow businesses." />
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal relative mx-auto w-full max-w-sm">
            <TiltCard className="group overflow-hidden rounded-[2rem] border border-border">
              <img src={photo} alt="Tanishq Jain - freelance website developer" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="glass absolute right-4 bottom-4 left-4 rounded-xl p-4 [transform:translateZ(40px)]">
                <p className="font-display font-bold">Tanishq Jain</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> Delhi · Website Developer</p>
              </div>
            </TiltCard>
          </div>
          <div className="reveal">
            <h3 className="text-2xl font-bold sm:text-3xl">Turning ideas into <span className="text-cyan">digital experiences</span></h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I'm <strong className="text-foreground">Tanishq Jain</strong>, a freelance <strong className="text-foreground">website developer in Delhi</strong> who
              designs and builds premium, high-converting websites for businesses and brands, using
              <strong className="text-foreground"> AI-powered website development</strong> to deliver faster and more affordably.
            </p>
            {/* identity terminal */}
            <div className="glass mt-8 overflow-hidden rounded-2xl font-mono text-sm">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive" /><span className="h-2.5 w-2.5 rounded-full bg-silver" /><span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                <span className="ml-3 text-xs text-muted-foreground">~/tanishq — whoami</span>
              </div>
              <TypedIdentity />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map(({ icon: Icon, t, d }, k) => (
            <div key={k} className="glass flex w-[320px] shrink-0 items-start gap-4 rounded-2xl p-6 sm:w-[380px]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-primary-foreground glow"><Icon className="h-6 w-6" /></div>
              <div><h3 className="text-base font-bold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { name: "J Mahendrakant Jewellers", url: "https://jmj1961.com", domain: "jmj1961.com", video: jmjVideo.url, tag: "Business Website", desc: "A premium, responsive business website crafted to showcase a legacy brand since 1961 with elegant design and SEO-ready structure." },
  { name: "Prerana Ashish", url: "https://preranaashish.com", domain: "preranaashish.com", video: preranaVideo.url, tag: "Brand Website", desc: "A modern, aesthetic website built for a client's online presence — fast loading, mobile-friendly and optimised to rank on Google." },
];

function Projects() {
  return (
    <section id="projects" className="relative pt-20 pb-8 sm:pt-28 sm:pb-10">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle tag="projects" title="Featured Projects" sub="Real client websites designed and developed by me." />
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p, k) => (
            <div key={p.name} className="reveal" style={{ transitionDelay: `${k * 150}ms` }}>
              <TiltCard className="group glass h-full overflow-hidden rounded-3xl">
                <div className="relative border-b border-border bg-secondary p-3">
                  <div className="mb-2 flex items-center gap-2 px-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive" /><span className="h-2.5 w-2.5 rounded-full bg-silver" /><span className="h-2.5 w-2.5 rounded-full bg-cyan" />
                    <span className="ml-2 flex items-center gap-1.5 rounded-md bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground"><Globe className="h-3 w-3" /> {p.domain}</span>
                  </div>
                  <div className="overflow-hidden rounded-xl">
                    <video src={p.video} autoPlay muted loop playsInline preload="metadata" aria-label={`${p.name} homepage preview`}
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
                <div className="p-7">
                  <p className="font-mono text-xs text-cyan uppercase">{p.tag}</p>
                  <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan">
                    Visit Website <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <p className="inline-flex items-center gap-2 text-muted-foreground"><Sparkles className="h-4 w-4 text-cyan" /> Your project could be next.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || name.length > 100) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 255) return setError("Please enter a valid email.");
    if (!message || message.length > 2000) return setError("Please enter a message (max 2000 chars).");
    setError(""); setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New portfolio enquiry from ${name}`,
          _template: "table",
          _captcha: "false",
          Name: name, Email: email, Phone: phone || "Not provided", Message: message,
          _replyto: email,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok"); (e.target as HTMLFormElement).reset();
    } catch { setStatus("err"); }
  };

  const input = "w-full rounded-xl border border-input bg-secondary/50 px-4 py-3.5 outline-none transition-all placeholder:text-muted-foreground focus:border-cyan focus:glow";

  return (
    <section id="contact" className="relative pt-10 pb-20 sm:pt-12 sm:pb-28">
      <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-azure/20 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle tag="contact" title="Let's Build Together" sub="Need a website for your business? Hire a freelance web developer — let's talk." />
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.5fr]">
          <div className="reveal glass flex flex-col justify-center gap-5 rounded-3xl p-7">
            <p className="font-display text-xl font-bold">Got a project in mind?</p>
            <p className="text-sm text-muted-foreground">Reply within 24 hours.</p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 transition-colors hover:text-cyan"><Mail className="h-4 w-4 text-cyan" /> {EMAIL}</a>
              <a href="tel:+917489842114" className="flex items-center gap-2 transition-colors hover:text-cyan"><Phone className="h-4 w-4 text-cyan" /> +91 74898 42114</a>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="icon" className="h-11 w-11 rounded-full border-border bg-transparent hover:bg-brand hover:text-primary-foreground hover:glow"><a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon className="h-5 w-5" /></a></Button>
              <a href={LINKEDIN} target="_blank" rel="noopener" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all hover:bg-brand hover:text-primary-foreground hover:glow"><Linkedin className="h-5 w-5" /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all hover:bg-brand hover:text-primary-foreground hover:glow"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
          <form onSubmit={submit} className="reveal glass space-y-4 rounded-3xl p-7 sm:p-9" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" placeholder="Your name *" maxLength={100} className={input} aria-label="Name" />
              <input name="email" type="email" placeholder="Your email *" maxLength={255} className={input} aria-label="Email" />
            </div>
            <input name="phone" type="tel" placeholder="Phone (optional)" maxLength={20} className={input} aria-label="Phone" />
            <textarea name="message" rows={5} placeholder="Tell me about your project *" maxLength={2000} className={input} aria-label="Message" />
            {error && <p className="text-sm text-destructive">{error}</p>}
            {status === "ok" && <p className="text-sm text-cyan">Thank you! Your message has been sent. I'll reply soon.</p>}
            {status === "err" && <p className="text-sm text-destructive">Something went wrong. Please email or WhatsApp me directly.</p>}
            <button disabled={status === "sending"} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-4 font-semibold text-primary-foreground glow transition-transform hover:scale-[1.02] disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send Message"} <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const line = "WEBSITE DEVELOPER — AI WEB DESIGN — SEO — RESPONSIVE — ";
  return (
    <footer className="relative overflow-hidden border-t border-border pt-10 pb-8">
      <div className="flex whitespace-nowrap animate-marquee font-display text-6xl font-extrabold text-secondary sm:text-8xl" aria-hidden>
        <span>{line.repeat(3)}</span><span>{line.repeat(3)}</span>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:flex-row sm:px-8">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tanishq Jain · Turning ideas into digital experiences</p>
        <button onClick={() => scrollTo("home")} className="nav-link font-mono text-sm text-cyan">Back to top ↑</button>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
