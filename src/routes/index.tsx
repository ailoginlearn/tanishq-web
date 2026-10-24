import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, Mail, Phone, Linkedin, MessageCircle, Menu, X, Send,
  Code2, Sparkles, Palette, Search, Smartphone, Zap, Bot, Globe, MapPin,
} from "lucide-react";
import logo from "@/assets/logo-mark.png.asset.json";
import photo from "@/assets/tanishq.jpg.asset.json";
import { NetworkCanvas } from "@/components/portfolio/NetworkCanvas";
import { TiltCard } from "@/components/portfolio/TiltCard";

const TITLE = "Tanishq Jain | Freelance Website Developer & AI Web Designer in India";
const DESC =
  "Tanishq Jain is a freelance website developer in India building fast, SEO-friendly, responsive business websites using AI-powered web development. Hire a web developer today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Tanishq Jain, website developer, freelance web developer India, AI website development, web designer, responsive website design, SEO friendly website, business website developer, portfolio" },
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
        <button onClick={() => go("home")} className="flex items-center gap-3" aria-label="Tanishq Jain home">
          <img src={logo.url} alt="Tanishq Jain logo" className="h-10 w-12 shrink-0 rounded-lg object-cover" />
          <span className="hidden font-display text-lg font-bold tracking-wide sm:block">TANISHQ<span className="text-cyan">.</span></span>
        </button>
        <ul className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <button onClick={() => go(n.id)} className={`nav-link text-sm font-medium tracking-wider uppercase transition-colors hover:text-cyan ${active === n.id ? "active text-cyan" : "text-muted-foreground"}`}>
                {n.label}
              </button>
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
          <h1 className="text-5xl leading-[1.05] font-extrabold sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Tanishq Jain</span>
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

        {/* 3D orbit */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px] [perspective:1000px]">
          <div className="absolute inset-0 rounded-full border border-cyan/30 animate-spin-slow [transform:rotateX(70deg)]">
            <span className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-cyan glow" />
          </div>
          <div className="absolute inset-6 rounded-full border border-azure/40 animate-spin-rev [transform:rotateY(70deg)]">
            <span className="absolute top-1/2 -right-2 h-3 w-3 rounded-full bg-azure glow" />
          </div>
          <div className="absolute inset-12 rounded-full border border-dashed border-silver/20 animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center animate-float">
            <div className="relative h-56 w-56 overflow-hidden rounded-[2rem] glass glow sm:h-64 sm:w-64">
              <img src={logo.url} alt="Tanishq Jain website developer logo" className="h-full w-full object-cover" />
            </div>
          </div>
          {["</>", "AI", "{ }", "SEO"].map((t, k) => (
            <span key={t} className="glass absolute rounded-xl px-3 py-2 font-mono text-sm text-cyan animate-float"
              style={{ top: ["8%", "70%", "20%", "82%"][k], left: ["5%", "0%", "80%", "72%"][k], animationDelay: `${k * 0.8}s` }}>
              {t}
            </span>
          ))}
        </div>
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
  { icon: Code2, t: "Website Development", d: "Modern, clean-coded websites with HTML, CSS, JavaScript and React." },
  { icon: Bot, t: "AI Web Development", d: "Building faster and smarter with AI tools — shipping premium sites in days, not months." },
  { icon: Smartphone, t: "Responsive Design", d: "Pixel-perfect layouts that look stunning on mobile, tablet and desktop." },
  { icon: Search, t: "SEO Optimization", d: "Keyword-rich content, meta tags and fast load times to rank higher on Google." },
  { icon: Palette, t: "UI / UX Design", d: "Aesthetic, user-friendly interfaces with motion, 3D and smooth animations." },
  { icon: Zap, t: "Performance", d: "Lightning-fast websites optimised for Core Web Vitals and conversions." },
];

function About() {
  const tech = ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "TypeScript", "AI Tools", "SEO", "Responsive Design", "UI/UX", "Animations", "Hosting & Domains"];
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle tag="about" title="About Me" sub="Web developer passionate about building digital experiences that grow businesses." />
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] bg-brand opacity-60 blur-2xl" />
            <TiltCard className="group overflow-hidden rounded-[2rem] border border-border">
              <img src={photo.url} alt="Tanishq Jain - freelance website developer" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="glass absolute right-4 bottom-4 left-4 rounded-xl p-4 [transform:translateZ(40px)]">
                <p className="font-display font-bold">Tanishq Jain</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> India · Website Developer</p>
              </div>
            </TiltCard>
          </div>
          <div className="reveal">
            <h3 className="text-2xl font-bold sm:text-3xl">Turning ideas into <span className="text-cyan">digital experiences</span></h3>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I'm <strong className="text-foreground">Tanishq Jain</strong>, a freelance <strong className="text-foreground">website developer in India</strong> who
              designs and builds premium, high-converting websites for businesses and brands. I combine modern web technologies with
              <strong className="text-foreground"> AI-powered website development</strong> to deliver beautiful, responsive and SEO-optimised sites — faster and more affordably.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              From concept to launch, I handle design, development, animations, mobile responsiveness and search engine optimisation so your business
              gets a website that looks luxurious and ranks on Google.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {tech.map((t) => (
                <span key={t} className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm transition-colors hover:border-cyan hover:text-cyan">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map(({ icon: Icon, t, d }, k) => (
            <div key={t} className="reveal" style={{ transitionDelay: `${k * 90}ms` }}>
              <TiltCard className="group glass h-full rounded-2xl p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-primary-foreground glow [transform:translateZ(30px)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { name: "JMJ 1961", url: "https://jmj1961.com", domain: "jmj1961.com", tag: "Business Website", desc: "A premium, responsive business website crafted to showcase a legacy brand since 1961 with elegant design and SEO-ready structure.", tags: ["Responsive", "SEO", "AI-Built"] },
  { name: "Prerana Ashish", url: "https://preranaashish.com", domain: "preranaashish.com", tag: "Brand Website", desc: "A modern, aesthetic website built for a client's online presence — fast loading, mobile-friendly and optimised to rank on Google.", tags: ["UI/UX", "Performance", "AI-Built"] },
];

function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle tag="projects" title="Featured Projects" sub="Real client websites designed and developed by me." />
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p, k) => (
            <div key={p.name} className="reveal" style={{ transitionDelay: `${k * 150}ms` }}>
              <TiltCard className="group glass h-full overflow-hidden rounded-3xl">
                <div className="relative h-56 overflow-hidden border-b border-border bg-secondary">
                  <div className="absolute inset-0 bg-brand opacity-20 transition-opacity duration-500 group-hover:opacity-40" />
                  <div className="absolute inset-0 grid-bg" />
                  <div className="absolute inset-6 rounded-xl border border-border bg-background/70 p-4 transition-transform duration-500 group-hover:scale-105 [transform:translateZ(40px)]">
                    <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-destructive" /><span className="h-2.5 w-2.5 rounded-full bg-silver" /><span className="h-2.5 w-2.5 rounded-full bg-cyan" /></div>
                    <div className="mt-3 flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground"><Globe className="h-3 w-3" /> {p.domain}</div>
                    <div className="mt-5 font-display text-3xl font-extrabold text-gradient">{p.name}</div>
                    <div className="mt-3 h-2 w-2/3 rounded bg-muted" /><div className="mt-2 h-2 w-1/2 rounded bg-muted" />
                  </div>
                </div>
                <div className="p-7">
                  <p className="font-mono text-xs text-cyan uppercase">{p.tag}</p>
                  <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs">{t}</span>)}</div>
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

  const items = [
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: "Phone", value: "+91 74898 42114", href: "tel:+917489842114" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: WHATSAPP },
    { icon: Linkedin, label: "LinkedIn", value: "tanishq-jain-sggscc", href: LINKEDIN },
  ];
  const input = "w-full rounded-xl border border-input bg-secondary/50 px-4 py-3.5 outline-none transition-all placeholder:text-muted-foreground focus:border-cyan focus:glow";

  return (
    <section id="contact" className="relative py-28">
      <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-azure/20 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle tag="contact" title="Let's Build Together" sub="Need a website for your business? Hire a freelance web developer — let's talk." />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal space-y-4">
            {items.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"
                className="group glass flex items-center gap-5 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-cyan">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-primary-foreground transition-transform group-hover:scale-110 group-hover:rotate-6"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0"><p className="text-xs text-muted-foreground uppercase">{label}</p><p className="truncate font-semibold">{value}</p></div>
                <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-cyan group-hover:rotate-45" />
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all hover:bg-brand hover:text-primary-foreground hover:glow"><MessageCircle className="h-5 w-5" /></a>
              <a href={LINKEDIN} target="_blank" rel="noopener" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all hover:bg-brand hover:text-primary-foreground hover:glow"><Linkedin className="h-5 w-5" /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all hover:bg-brand hover:text-primary-foreground hover:glow"><Mail className="h-5 w-5" /></a>
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
  const line = "WEBSITE DEVELOPER ✦ AI WEB DESIGN ✦ SEO ✦ RESPONSIVE ✦ ";
  return (
    <footer className="relative overflow-hidden border-t border-border pt-10 pb-8">
      <div className="flex whitespace-nowrap animate-marquee font-display text-6xl font-extrabold text-secondary sm:text-8xl" aria-hidden>
        <span>{line.repeat(3)}</span><span>{line.repeat(3)}</span>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="" className="h-9 w-11 rounded-md object-cover" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tanishq Jain · Turning ideas into digital experiences</p>
        </div>
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
