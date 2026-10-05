import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  ChevronLeft,
  Copy,
  LayoutGrid,
  Play,
  Globe2,
  Hammer,
  House,
  Mail,
  MapPin,
  Menu,
  PaintRoller,
  Phone,
  Ruler,
  Sparkles,
  SquareDashed,
  X,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

import interiorImage from "@/assets/as-sokoli-interior.jpg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EMAIL = "as.sokoli.gmbh@gmail.com";
const PHONE_DISPLAY = "+49 173 9141081";
const PHONE_LINK = "+491739141081";

// Alle Fotos und Videos aus src/gallery (z. B. foto1.jpg, foto2.mp4) – Reihenfolge nach Dateinamen
type GalleryItem = { src: string; video: boolean };
const galleryImages: GalleryItem[] = Object.entries(
  import.meta.glob("@/gallery/*.{jpg,jpeg,png,webp,mp4,webm,mov}", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>,
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, video: /\.(mp4|webm|mov)$/i.test(path) }));

function Thumb({ item, alt, className, lazy = false }: { item: GalleryItem; alt: string; className: string; lazy?: boolean }) {
  if (!item.video) {
    return <img src={item.src} alt={alt} width={1200} height={1600} loading={lazy ? "lazy" : undefined} decoding="async" className={className} />;
  }
  return (
    <>
      <video src={`${item.src}#t=0.1`} preload="metadata" muted playsInline aria-label={alt} className={className} />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-primary shadow-md">
          <Play className="h-5 w-5 translate-x-[1px] fill-current" />
        </span>
      </span>
    </>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A&S Sokoli GmbH | Innenausbau in Zirndorf" },
      {
        name: "description",
        content:
          "Trockenbau mit Knauf, Spachtelarbeiten (Q1–Q4), Malerarbeiten und Fliesen im Innenausbau in Zirndorf, Nürnberg, Fürth und Umgebung.",
      },
      { property: "og:title", content: "A&S Sokoli GmbH | Innenausbau in Zirndorf" },
      {
        property: "og:description",
        content: "Zuverlässiger Innenausbau und Renovierung aus einer Hand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Language = "de" | "en";

const services = [
  {
    icon: SquareDashed,
    title: { de: "Trockenbau mit Knauf", en: "Drywall with Knauf" },
    text: { de: "Wände, Decken und Vorsatzschalen mit Knauf-Systemen – präzise, sauber und schlicht ausgeführt.", en: "Walls, ceilings, and linings built with Knauf systems, executed precisely, cleanly, and with a simple finish." },
  },
  {
    icon: Sparkles,
    title: { de: "Spachtelarbeiten", en: "Filling & Skim Coating" },
    text: { de: "Glatte, saubere Oberflächen in den Qualitätsstufen Q1 bis Q4 – die ideale Basis für Farbe und Tapete.", en: "Smooth, clean surfaces in quality levels Q1 to Q4, the ideal base for paint and wallpaper." },
  },
  {
    icon: PaintRoller,
    title: { de: "Malerarbeiten", en: "Painting" },
    text: { de: "Gleichmäßige Anstriche für Wände und Decken – klare Flächen, saubere Kanten, stimmige Farbwahl.", en: "Even coats on walls and ceilings, with clean surfaces, sharp edges, and well-chosen colours." },
  },
  {
    icon: SquareDashed,
    title: { de: "Fliesenarbeiten", en: "Tiling" },
    text: { de: "Exakte Verlegung in Bad, Küche und Wohnbereich – vom Untergrund bis zur sauberen Fuge.", en: "Precise tiling for bathrooms, kitchens, and living areas, from substrate preparation to clean joints." },
  },
  {
    icon: Ruler,
    title: { de: "Trennwände & Decken", en: "Partitions & Ceilings" },
    text: { de: "Flexible Raumlösungen mit Trennwänden, abgehängten Decken und fachgerechter Dämmung.", en: "Flexible room solutions with partition walls, suspended ceilings, and professional insulation." },
  },
  {
    icon: Hammer,
    title: { de: "Ausbau", en: "Interior Fit-out" },
    text: { de: "Durchdachter Ausbau für Wohn- und Gewerberäume – sauber koordiniert und passend zu Ihrem Objekt.", en: "Thoughtful fit-outs for residential and commercial spaces, carefully coordinated to suit your property." },
  },
  {
    icon: House,
    title: { de: "Komplett-Innenausbau", en: "Complete Interior Fit-out" },
    text: { de: "Alle Gewerke aus einer Hand, abgestimmt geplant und zuverlässig bis zur fertigen Übergabe umgesetzt.", en: "All trades from one source, carefully planned and reliably completed through to final handover." },
  },
  {
    icon: Building2,
    title: { de: "Fassadenarbeiten", en: "Façade Work" },
    text: { de: "Schutz und neue Ausstrahlung für Ihr Gebäude durch fachgerechte Vorbereitung und Beschichtung.", en: "Professional preparation and coating that protects your building and gives it a renewed appearance." },
  },
];

const copy = {
  de: {
    tagline: "Innenausbau & Renovierung", services: "Leistungen", about: "Über uns", area: "Einsatzgebiet", quote: "Angebot anfragen",
    location: "Zirndorf · Nürnberg · Fürth", hero: <>Räume, die bleiben.<br /><span className="text-highlight">Handwerk, das überzeugt.</span></>,
    intro: "A&S Sokoli GmbH ist Ihr Partner für Trockenbau mit Knauf, Spachtel-, Maler- und Fliesenarbeiten im Innenausbau – mit klaren Standards und einer schlichten, sauberen Ausführung.", project: "Projekt anfragen", viewServices: "Leistungen ansehen",
    benefits: ["Trockenbau mit Knauf", "Spachteln nach Q1–Q4", "Alles aus einer Hand"], servicesLabel: "Unsere Leistungen", servicesTitle: "Kompetenz für jeden Raum.",
    servicesIntro: "Unser Schwerpunkt ist der Innenausbau: Trockenbau mit Knauf, Spachtelarbeiten, Malerarbeiten und Fliesen. Schlicht, sauber und nach klaren Standards – von der Vorbereitung bis zum letzten Anstrich.",
    aboutLabel: "Über A&S Sokoli", aboutTitle: "Direkt. Verlässlich. Handwerklich stark.",
    aboutText: "Bei uns haben Sie einen festen Ansprechpartner für Ihr Vorhaben. Wir arbeiten überwiegend im Innenausbau – mit Knauf-Systemen, sauberen Spachtelqualitäten und gepflegten Oberflächen. Wir hören zu, planen praxisnah und setzen die vereinbarten Arbeiten sorgfältig um – für private Wohnräume ebenso wie für gewerbliche Objekte.",
    qualities: [["Klare Abstimmung", "Transparente Abläufe und direkte Kommunikation während des gesamten Projekts."], ["Sorgfältige Details", "Saubere Kanten, belastbare Oberflächen und ein Ergebnis, das im Alltag überzeugt."], ["Koordinierte Umsetzung", "Mehrere Ausbauleistungen sinnvoll verbunden – ohne unnötige Schnittstellen."]],
    areaLabel: "Unser Einsatzgebiet", areaTitle: "Für Sie vor Ort in der Metropolregion Nürnberg.", areaText: "Unser Standort ist Zirndorf. Von hier aus betreuen wir Projekte in Nürnberg, Fürth, Erlangen, Schwabach und im umliegenden Mittelfranken. Fragen Sie uns gerne, ob Ihr Projekt in unserem Einsatzgebiet liegt.", surroundings: "Umgebung", office: "Firmensitz", directions: "Route öffnen",
    projectLabel: "Ihr Projekt", contactTitle: "Lassen Sie uns darüber sprechen.", contactText: "Beschreiben Sie uns kurz Ihr Vorhaben, den Ort und den gewünschten Zeitraum. Wir melden uns persönlich bei Ihnen.", email: "E-Mail schreiben", director: "Geschäftsführer", call: "Jetzt anrufen", gallery: "Galerie", galleryLabel: "Unsere Arbeit", galleryTitle: "Sehen Sie unsere Arbeit.", loadMore: "Mehr laden", close: "Schließen", back: "Alle Fotos", prev: "Vorheriges Foto", next: "Nächstes Foto", mailWith: "E-Mail senden mit", mailDefault: "Standard-E-Mail-App", copyAddress: "Adresse kopieren", copied: "Kopiert ✓", mailSubject: "Projektanfrage", contact: "Kontakt",
  },
  en: {
    tagline: "Interior Construction & Renovation", services: "Services", about: "About us", area: "Service area", quote: "Request a quote",
    location: "Zirndorf · Nuremberg · Fürth", hero: <>Spaces made to last.<br /><span className="text-highlight">Craftsmanship you can trust.</span></>,
    intro: "A&S Sokoli GmbH is your partner for drywall with Knauf, filling, painting, and tiling in interior construction, with clear standards and a simple, clean finish.", project: "Discuss your project", viewServices: "View services",
    benefits: ["Drywall with Knauf", "Filling to Q1–Q4", "Everything from one source"], servicesLabel: "Our services", servicesTitle: "Expertise for every space.",
    servicesIntro: "Our focus is interior construction: drywall with Knauf, filling, painting, and tiling. Simple, clean, and built to clear standards, from preparation to the final coat of paint.",
    aboutLabel: "About A&S Sokoli", aboutTitle: "Direct. Reliable. Skilled.",
    aboutText: "You have one dedicated contact throughout your project. We mainly work in interior construction, using Knauf systems, clean filling quality, and well-finished surfaces. We listen, plan practically, and carry out the agreed work with care for both private homes and commercial properties.",
    qualities: [["Clear coordination", "Transparent processes and direct communication throughout the entire project."], ["Careful details", "Clean edges, durable surfaces, and results that stand up to everyday use."], ["Coordinated delivery", "Multiple interior services combined efficiently, without unnecessary handovers."]],
    areaLabel: "Our service area", areaTitle: "Working across the Nuremberg metropolitan region.", areaText: "Based in Zirndorf, we serve projects in Nuremberg, Fürth, Erlangen, Schwabach, and the surrounding Middle Franconia region. Contact us to confirm whether your project is within our service area.", surroundings: "Neighborhood", office: "Head office", directions: "Open directions",
    projectLabel: "Your project", contactTitle: "Let’s talk about it.", contactText: "Tell us briefly about your project, its location, and your preferred schedule. We will get back to you personally.", email: "Write an email", director: "Managing Director", call: "Call now", gallery: "Gallery", galleryLabel: "Our work", galleryTitle: "See our work.", loadMore: "Load more", close: "Close", back: "All photos", prev: "Previous photo", next: "Next photo", mailWith: "Send email with", mailDefault: "Default email app", copyAddress: "Copy address", copied: "Copied ✓", mailSubject: "Project enquiry", contact: "Contact",
  },
};

function EmailMenu({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [copied, setCopied] = useState(false);
  const to = encodeURIComponent(EMAIL);
  const subject = encodeURIComponent(`${t.mailSubject} – A&S Sokoli`);
  const options = [
    { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}` },
    { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}` },
    { label: "Microsoft 365", href: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${subject}` },
    { label: "Yahoo Mail", href: `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}` },
  ];

  const copyAddress = async (event: Event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Zwischenablage nicht verfügbar */
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gold" size="lg">
          <Mail /> {t.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.mailWith}</p>
        {options.map((option) => (
          <DropdownMenuItem key={option.label} asChild>
            <a href={option.href} target="_blank" rel="noreferrer">{option.label}</a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <a href={`mailto:${EMAIL}?subject=${subject}`}>{t.mailDefault}</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={copyAddress}>
          <Copy className="h-4 w-4" /> {copied ? t.copied : t.copyAddress}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Gallery({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);
  const total = galleryImages.length;

  const step = (direction: 1 | -1) =>
    setActive((current) => (current === null ? current : (current + direction + total) % total));

  // Pfeiltasten im Foto-Viewer
  useEffect(() => {
    if (!open || active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLVideoElement) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, total]);

  if (total === 0) return null;

  const openAt = (index: number | null) => {
    setActive(index);
    setOpen(true);
  };

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setActive(null);
  };

  return (
    <section id="galerie" className="section-space bg-surface scroll-mt-20" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mb-12">
          <p className="eyebrow">{t.galleryLabel}</p>
          <h2 id="gallery-title" className="section-title">{t.galleryTitle}</h2>
        </div>

        <div data-stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {galleryImages.slice(0, 3).map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => openAt(index)}
              style={{ "--i": index } as CSSProperties}
              aria-label={`${t.galleryLabel} ${index + 1}`}
              className={[
                "group cursor-pointer border border-border bg-background p-1.5 sm:p-2",
                index === 2 ? "max-sm:hidden" : "",
              ].join(" ")}
            >
              <div className="relative overflow-hidden">
                <Thumb
                  item={item}
                  alt={`A&S Sokoli ${index + 1}`}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>

        {total > 3 && (
          <div data-reveal className="mt-10 flex justify-center">
            <Button variant="gold" size="lg" onClick={() => openAt(null)}>
              {t.loadMore}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          onEscapeKeyDown={(event) => {
            if (active !== null) {
              event.preventDefault();
              setActive(null);
            }
          }}
          className="inset-0 flex h-[100dvh] max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-background p-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[90vh] sm:max-w-6xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-sm sm:border [&>button]:hidden"
        >
          <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
            <div className="flex items-baseline gap-3">
              <DialogTitle className="font-display text-xl">{t.galleryLabel}</DialogTitle>
              <span className="text-sm text-muted-foreground">
                {active === null ? total : `${active + 1} / ${total}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {active !== null && (
                <Button variant="outline" size="sm" onClick={() => setActive(null)}>
                  <LayoutGrid /> {t.back}
                </Button>
              )}
              <DialogClose asChild>
                <Button variant="outline" size="icon" aria-label={t.close}>
                  <X />
                </Button>
              </DialogClose>
            </div>
          </header>
          <DialogDescription className="sr-only">{t.galleryTitle}</DialogDescription>

          {active === null ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {galleryImages.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`${t.galleryLabel} ${index + 1}`}
                    className="group cursor-pointer border border-border bg-surface p-1.5 transition-colors hover:border-primary sm:p-2"
                  >
                    <div className="relative overflow-hidden">
                      <Thumb
                        item={item}
                        lazy
                        alt={`A&S Sokoli ${index + 1}`}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center bg-surface p-3 sm:p-8"
              onTouchStart={(event) => setTouchX((event.target as HTMLElement).closest("video") ? null : (event.touches[0]?.clientX ?? null))}
              onTouchEnd={(event) => {
                if (touchX === null) return;
                const delta = (event.changedTouches[0]?.clientX ?? touchX) - touchX;
                if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
                setTouchX(null);
              }}
            >
              <div className="max-h-full border border-border bg-background p-1.5 sm:p-2">
                {galleryImages[active]?.video ? (
                  <video
                    key={active}
                    src={galleryImages[active]?.src}
                    controls
                    autoPlay
                    playsInline
                    className="viewer-img max-h-[calc(100dvh-11rem)] w-auto max-w-full object-contain sm:max-h-[calc(90vh-12rem)]"
                  />
                ) : (
                  <img
                    key={active}
                    src={galleryImages[active]?.src}
                    alt={`A&S Sokoli ${active + 1}`}
                    decoding="async"
                    className="viewer-img max-h-[calc(100dvh-11rem)] w-auto max-w-full object-contain sm:max-h-[calc(90vh-12rem)]"
                  />
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label={t.prev}
                onClick={() => step(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 sm:left-6"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label={t.next}
                onClick={() => step(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 sm:right-6"
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Brand({ inverse = false, lang }: { inverse?: boolean; lang: Language }) {
  return (
    <a href="#start" className="group flex items-center gap-3" aria-label="A&S Sokoli Startseite">
      <span className={inverse ? "brand-mark brand-mark-inverse" : "brand-mark"}>
        <House strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <strong className={inverse ? "block text-lg text-primary-foreground" : "block text-lg text-primary"}>
          A&amp;S SOKOLI
        </strong>
        <span className={inverse ? "mt-1 block text-[10px] uppercase text-primary-foreground/65" : "mt-1 block text-[10px] uppercase text-muted-foreground"}>
          {copy[lang].tagline}
        </span>
      </span>
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>("de");
  const t = copy[lang];

  // Scroll-Animationen: Elemente mit data-reveal / data-stagger blenden beim Sichtbarwerden ein
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal], [data-stagger]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    document.documentElement.classList.add("js-anim");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleLanguage = () => {
    const next = lang === "de" ? "en" : "de";
    setLang(next);
    document.documentElement.lang = next;
  };

  return (
    <main id="start" className="overflow-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Brand lang={lang} />
          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Hauptnavigation">
            <a className="nav-link" href="#leistungen">{t.services}</a>
            <a className="nav-link" href="#galerie">{t.gallery}</a>
            <a className="nav-link" href="#ueber-uns">{t.about}</a>
            <a className="nav-link" href="#gebiet">{t.area}</a>
            <Button variant="ghost" onClick={toggleLanguage} aria-label={lang === "de" ? "Switch to English" : "Auf Deutsch wechseln"}>
              <Globe2 /> {lang === "de" ? "EN" : "DE"}
            </Button>
            <Button variant="gold" asChild>
              <a href="#kontakt">{t.quote}</a>
            </Button>
          </nav>
          <div className="flex items-center gap-1 lg:hidden">
            <Button variant="ghost" onClick={toggleLanguage} aria-label={lang === "de" ? "Switch to English" : "Auf Deutsch wechseln"}><Globe2 /> {lang === "de" ? "EN" : "DE"}</Button>
            <Button variant="ghost" size="icon" aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile Navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {[[t.services, "#leistungen"], [t.gallery, "#galerie"], [t.about, "#ueber-uns"], [t.area, "#gebiet"], [t.contact, "#kontakt"], [PHONE_DISPLAY, `tel:${PHONE_LINK}`]].map(([label, href]) => (
                <a key={href} href={href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section className="hero-shell relative min-h-[720px] pt-20 lg:min-h-[760px]" aria-labelledby="hero-title">
        <img
          src={interiorImage}
          alt="Modern renovierter Innenraum mit einem Handwerker bei der Endkontrolle"
          className="hero-img absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1200}
          fetchPriority="high"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[680px]">
          <div className="hero-in max-w-3xl text-primary-foreground">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-highlight">
              <span className="h-px w-10 bg-accent" /> {t.location}
            </p>
            <h1 id="hero-title" className="font-display text-5xl font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">
              {t.hero}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-primary-foreground/80 sm:text-lg">
              {t.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <a href="#kontakt">{t.project} <ArrowRight /></a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#leistungen">{t.viewServices}</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border-t border-primary-foreground/15 bg-primary/80 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-primary-foreground/15 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {t.benefits.map((item) => (
              <div key={item} className="flex items-center gap-3 py-5 text-sm font-medium text-primary-foreground sm:px-6 first:pl-0">
                <Check className="text-highlight" aria-hidden="true" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leistungen" className="section-space bg-background scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div data-reveal className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">{t.servicesLabel}</p>
              <h2 className="section-title">{t.servicesTitle}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
              {t.servicesIntro}
            </p>
          </div>
          <div data-stagger className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article key={service.title.de} style={{ "--i": index } as CSSProperties} className={[0, 2, 5, 7].includes(index) ? "service-card service-card-featured" : "service-card"}>
                  <div className="service-icon"><Icon strokeWidth={1.6} aria-hidden="true" /></div>
                  <span className="service-number">0{index + 1}</span>
                  <h3>{service.title[lang]}</h3>
                  <p>{service.text[lang]}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Gallery lang={lang} />

      <section id="ueber-uns" className="section-space bg-background scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div data-reveal className="relative min-h-[420px] overflow-hidden rounded-sm lg:min-h-[540px]">
            <img src={interiorImage} alt={lang === "de" ? "Qualitätsarbeit im modernen Innenausbau" : "Quality craftsmanship in a modern interior"} className="h-full min-h-[420px] w-full object-cover object-right" loading="lazy" width={1920} height={1200} />
            <div className="absolute bottom-0 left-0 bg-primary px-7 py-6 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.18em] text-highlight">{t.director}</p>
              <p className="signature-logo mt-2 text-3xl">A. S.</p>
            </div>
          </div>
          <div data-reveal style={{ "--d": "150ms" } as CSSProperties} className="lg:pl-10">
            <p className="eyebrow">{t.aboutLabel}</p>
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              {t.aboutText}
            </p>
            <div className="mt-8 space-y-5">
              {t.qualities.map(([title, text]) => (
                <div key={title} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="h-4 w-4" /></span>
                  <div><h3 className="font-semibold text-foreground">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gebiet" className="bg-primary py-20 text-primary-foreground scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow eyebrow-light">{t.areaLabel}</p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">{t.areaTitle}</h2>
            <p className="mt-6 max-w-2xl leading-8 text-primary-foreground/75">
              {t.areaText}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Zirndorf", lang === "de" ? "Nürnberg" : "Nuremberg", "Fürth", "Erlangen", "Schwabach", t.surroundings].map((city) => <span key={city} className="city-tag">{city}</span>)}
            </div>
          </div>
          <div data-reveal style={{ "--d": "150ms" } as CSSProperties} className="location-panel">
            <MapPin className="h-8 w-8 text-highlight" aria-hidden="true" />
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-primary-foreground/55">{t.office}</p>
            <address className="mt-2 not-italic text-xl font-medium leading-8">Wissenstraße 8<br />90513 Zirndorf<br />{lang === "de" ? "Deutschland" : "Germany"}</address>
            <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-highlight hover:underline" href="https://www.google.com/maps/search/?api=1&query=Wissenstra%C3%9Fe+8%2C+90513+Zirndorf" target="_blank" rel="noreferrer">{t.directions} <ChevronRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="kontakt" className="section-space scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div data-stagger className="contact-band">
            <div style={{ "--i": 0 } as CSSProperties}>
              <p className="eyebrow">{t.projectLabel}</p>
              <h2 className="font-display text-4xl font-semibold sm:text-5xl">{t.contactTitle}</h2>
              <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{t.contactText}</p>
            </div>
            <div style={{ "--i": 1 } as CSSProperties} className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="gold" size="lg" asChild><a href={`tel:${PHONE_LINK}`}><Phone /> {t.call}</a></Button>
                <EmailMenu lang={lang} />
              </div>
              <a href={`tel:${PHONE_LINK}`} className="text-sm font-medium text-foreground hover:text-primary">{PHONE_DISPLAY}</a>
              <span className="text-sm font-medium text-muted-foreground">{EMAIL}</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-footer py-12 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3">
          <Brand inverse lang={lang} />
          <div className="text-sm leading-7 text-primary-foreground/65"><p className="font-semibold text-primary-foreground">A&amp;S Sokoli GmbH</p><p>{t.director}: A. S.</p><p>Wissenstraße 8 · 90513 Zirndorf</p></div>
          <div className="md:text-right"><a className="inline-flex items-center gap-2 text-sm text-primary-foreground hover:text-highlight" href={`tel:${PHONE_LINK}`}><Phone className="h-4 w-4" />{PHONE_DISPLAY}</a><br /><a className="mt-2 inline-flex items-center gap-2 text-sm text-primary-foreground hover:text-highlight" href={`mailto:${EMAIL}`}><Mail className="h-4 w-4" />{EMAIL}</a><p className="mt-4 text-xs text-primary-foreground/45">© 2026 A&amp;S Sokoli GmbH</p></div>
        </div>
      </footer>
    </main>
  );
}