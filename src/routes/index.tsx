import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Globe2,
  House,
  Mail,
  MapPin,
  Menu,
  PaintRoller,
  Ruler,
  Sparkles,
  SquareDashed,
  X,
} from "lucide-react";
import { useState } from "react";

import interiorImage from "@/assets/as-sokoli-interior.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A&S Sokoli GmbH | Innenausbau in Zirndorf" },
      {
        name: "description",
        content:
          "Trockenbau, Malerarbeiten, Fliesen und komplette Renovierungen in Zirndorf, Nürnberg, Fürth und Umgebung.",
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
    title: { de: "Trockenbau", en: "Drywall Construction" },
    text: { de: "Flexible Raumlösungen mit präzisen Trennwänden, abgehängten Decken und fachgerechter Dämmung.", en: "Flexible room solutions with precise partition walls, suspended ceilings, and professional insulation." },
  },
  {
    icon: Ruler,
    title: { de: "Ausbau", en: "Interior Fit-out" },
    text: { de: "Durchdachter Ausbau für Wohn- und Gewerberäume – sauber koordiniert und passend zu Ihrem Objekt.", en: "Thoughtful fit-outs for residential and commercial spaces, carefully coordinated to suit your property." },
  },
  {
    icon: Sparkles,
    title: { de: "Spachtelarbeiten", en: "Filling & Plastering" },
    text: { de: "Glatte, belastbare Oberflächen als perfekte Grundlage für Farben, Tapeten und weitere Beschichtungen.", en: "Smooth, durable surfaces that provide the ideal foundation for paint, wallpaper, and other finishes." },
  },
  {
    icon: PaintRoller,
    title: { de: "Malerarbeiten", en: "Painting" },
    text: { de: "Sorgfältige Anstriche für Wände, Decken und Fassaden mit stimmiger Farbberatung.", en: "Careful painting of walls, ceilings, and façades, supported by well-considered colour advice." },
  },
  {
    icon: SquareDashed,
    title: { de: "Fliesenarbeiten", en: "Tiling" },
    text: { de: "Exakte Verlegung in Bad, Küche und Wohnbereich – vom Untergrund bis zur sauberen Fuge.", en: "Precise tiling for bathrooms, kitchens, and living areas, from substrate preparation to clean joints." },
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
    intro: "A&S Sokoli GmbH steht für präzisen Innenausbau und zuverlässige Renovierung – persönlich betreut, sauber ausgeführt und aus einer Hand.", project: "Projekt anfragen", viewServices: "Leistungen ansehen",
    benefits: ["Persönliche Betreuung", "Saubere Ausführung", "Alles aus einer Hand"], servicesLabel: "Unsere Leistungen", servicesTitle: "Kompetenz für jeden Raum.",
    servicesIntro: "Von der ersten Vorbereitung bis zum letzten Anstrich: Wir verbinden einzelne Arbeiten zu einem stimmigen Gesamtergebnis und halten Sie über jeden Schritt auf dem Laufenden.",
    aboutLabel: "Über A&S Sokoli", aboutTitle: "Direkt. Verlässlich. Handwerklich stark.",
    aboutText: "Bei uns haben Sie einen festen Ansprechpartner für Ihr Vorhaben. Wir hören zu, planen praxisnah und setzen die vereinbarten Arbeiten sorgfältig um – für private Wohnräume ebenso wie für gewerbliche Objekte.",
    qualities: [["Klare Abstimmung", "Transparente Abläufe und direkte Kommunikation während des gesamten Projekts."], ["Sorgfältige Details", "Saubere Kanten, belastbare Oberflächen und ein Ergebnis, das im Alltag überzeugt."], ["Koordinierte Umsetzung", "Mehrere Ausbauleistungen sinnvoll verbunden – ohne unnötige Schnittstellen."]],
    areaLabel: "Unser Einsatzgebiet", areaTitle: "Für Sie vor Ort in der Metropolregion Nürnberg.", areaText: "Unser Standort ist Zirndorf. Von hier aus betreuen wir Projekte in Nürnberg, Fürth, Erlangen, Schwabach und im umliegenden Mittelfranken. Fragen Sie uns gerne, ob Ihr Projekt in unserem Einsatzgebiet liegt.", surroundings: "Umgebung", office: "Firmensitz", directions: "Route öffnen",
    projectLabel: "Ihr Projekt", contactTitle: "Lassen Sie uns darüber sprechen.", contactText: "Beschreiben Sie uns kurz Ihr Vorhaben, den Ort und den gewünschten Zeitraum. Wir melden uns persönlich bei Ihnen.", email: "E-Mail schreiben", director: "Geschäftsführer",
  },
  en: {
    tagline: "Interior Construction & Renovation", services: "Services", about: "About us", area: "Service area", quote: "Request a quote",
    location: "Zirndorf · Nuremberg · Fürth", hero: <>Spaces made to last.<br /><span className="text-highlight">Craftsmanship you can trust.</span></>,
    intro: "A&S Sokoli GmbH provides precise interior construction and dependable renovation, personally managed, professionally completed, and all from one source.", project: "Discuss your project", viewServices: "View services",
    benefits: ["Personal service", "Clean workmanship", "Everything from one source"], servicesLabel: "Our services", servicesTitle: "Expertise for every space.",
    servicesIntro: "From initial preparation to the final coat of paint, we bring every trade together into one consistent result and keep you informed throughout the project.",
    aboutLabel: "About A&S Sokoli", aboutTitle: "Direct. Reliable. Skilled.",
    aboutText: "You have one dedicated contact throughout your project. We listen, plan practically, and carry out the agreed work with care for both private homes and commercial properties.",
    qualities: [["Clear coordination", "Transparent processes and direct communication throughout the entire project."], ["Careful details", "Clean edges, durable surfaces, and results that stand up to everyday use."], ["Coordinated delivery", "Multiple interior services combined efficiently, without unnecessary handovers."]],
    areaLabel: "Our service area", areaTitle: "Working across the Nuremberg metropolitan region.", areaText: "Based in Zirndorf, we serve projects in Nuremberg, Fürth, Erlangen, Schwabach, and the surrounding Middle Franconia region. Contact us to confirm whether your project is within our service area.", surroundings: "Neighborhood", office: "Head office", directions: "Open directions",
    projectLabel: "Your project", contactTitle: "Let’s talk about it.", contactText: "Tell us briefly about your project, its location, and your preferred schedule. We will get back to you personally.", email: "Write an email", director: "Managing Director",
  },
};

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
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            <a className="nav-link" href="#leistungen">{t.services}</a>
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
              {[[t.services, "#leistungen"], [t.about, "#ueber-uns"], [t.area, "#gebiet"], [lang === "de" ? "Kontakt" : "Contact", "#kontakt"]].map(([label, href]) => (
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
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1200}
          fetchPriority="high"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[680px]">
          <div className="max-w-3xl text-primary-foreground">
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
                <a href="mailto:as.sokoli.gmbh@gmail.com">{t.project} <ArrowRight /></a>
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
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">{t.servicesLabel}</p>
              <h2 className="section-title">{t.servicesTitle}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground lg:justify-self-end">
              {t.servicesIntro}
            </p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article key={service.title.de} className={[2, 3, 5].includes(index) ? "service-card service-card-featured" : "service-card"}>
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

      <section id="ueber-uns" className="section-space bg-surface scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-sm lg:min-h-[540px]">
            <img src={interiorImage} alt={lang === "de" ? "Qualitätsarbeit im modernen Innenausbau" : "Quality craftsmanship in a modern interior"} className="h-full min-h-[420px] w-full object-cover object-right" loading="lazy" width={1920} height={1200} />
            <div className="absolute bottom-0 left-0 bg-primary px-7 py-6 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.18em] text-highlight">{t.director}</p>
              <p className="signature-logo mt-2 text-3xl">A. S.</p>
            </div>
          </div>
          <div className="lg:pl-10">
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
          <div>
            <p className="eyebrow eyebrow-light">{t.areaLabel}</p>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">{t.areaTitle}</h2>
            <p className="mt-6 max-w-2xl leading-8 text-primary-foreground/75">
              {t.areaText}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Zirndorf", lang === "de" ? "Nürnberg" : "Nuremberg", "Fürth", "Erlangen", "Schwabach", t.surroundings].map((city) => <span key={city} className="city-tag">{city}</span>)}
            </div>
          </div>
          <div className="location-panel">
            <MapPin className="h-8 w-8 text-highlight" aria-hidden="true" />
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-primary-foreground/55">{t.office}</p>
            <address className="mt-2 not-italic text-xl font-medium leading-8">Wissenstraße 8<br />90513 Zirndorf<br />{lang === "de" ? "Deutschland" : "Germany"}</address>
            <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-highlight hover:underline" href="https://www.google.com/maps/search/?api=1&query=Wissenstra%C3%9Fe+8%2C+90513+Zirndorf" target="_blank" rel="noreferrer">{t.directions} <ChevronRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="kontakt" className="section-space scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="contact-band">
            <div>
              <p className="eyebrow">{t.projectLabel}</p>
              <h2 className="font-display text-4xl font-semibold sm:text-5xl">{t.contactTitle}</h2>
              <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{t.contactText}</p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Button variant="gold" size="lg" asChild><a href="mailto:as.sokoli.gmbh@gmail.com"><Mail /> {t.email}</a></Button>
              <a href="mailto:as.sokoli.gmbh@gmail.com" className="text-sm font-medium text-foreground hover:text-primary">as.sokoli.gmbh@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-footer py-12 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3">
          <Brand inverse lang={lang} />
          <div className="text-sm leading-7 text-primary-foreground/65"><p className="font-semibold text-primary-foreground">A&amp;S Sokoli GmbH</p><p>{t.director}: A. S.</p><p>Wissenstraße 8 · 90513 Zirndorf</p></div>
          <div className="md:text-right"><a className="inline-flex items-center gap-2 text-sm text-primary-foreground hover:text-highlight" href="mailto:as.sokoli.gmbh@gmail.com"><Mail className="h-4 w-4" />as.sokoli.gmbh@gmail.com</a><p className="mt-4 text-xs text-primary-foreground/45">© 2026 A&amp;S Sokoli GmbH</p></div>
        </div>
      </footer>
    </main>
  );
}