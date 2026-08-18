import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { CustomCursor } from "@/components/custom-cursor";
import { EditorialList } from "@/components/editorial-list";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ParallaxMonogram } from "@/components/parallax-monogram";
import { Reveal } from "@/components/reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getDictionary, hasLocale } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

export default async function LocalizedHome({ params }: LocalizedPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const copy = getDictionary(lang);
  const forwardArrow = lang === "ar" ? "←" : "→";
  const footerLinks = [
    { label: copy.nav.expertise, href: "#expertise" },
    { label: copy.nav.services, href: "#services" },
    { label: copy.nav.about, href: "#about" },
    { label: copy.nav.insights, href: "#insights" },
    { label: copy.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Navbar
        copy={copy.nav}
        brand={copy.brand}
        locale={lang}
        location={copy.hero.location}
      />

      <main id="top">
        <Hero copy={copy.hero} locale={lang} />

        <section
          id="expertise"
          className="section expertise-section"
          data-section-number="01"
          aria-labelledby="expertise-title"
        >
          <div className="site-shell">
            <Reveal className="section-intro">
              <div>
                <p className="section-kicker">{copy.expertise.kicker}</p>
                <p className="section-index">{copy.expertise.index}</p>
              </div>
              <h2 id="expertise-title">
                {copy.expertise.heading.map((line) => (
                  <span className="heading-line" key={line}>{line}</span>
                ))}
              </h2>
            </Reveal>

            <div id="services" className="editorial-wrap">
              <p className="editorial-caption">{copy.expertise.caption}</p>
              <EditorialList items={copy.expertise.items} />
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="statement"
          aria-labelledby="approach-title"
        >
          <div className="site-shell statement__inner">
            <Reveal>
              <p className="section-kicker section-kicker--light">
                {copy.approach.kicker}
              </p>
              <h2 id="approach-title">{copy.approach.heading}</h2>
            </Reveal>
            <Reveal delay={0.08} className="statement__aside">
              <p>{copy.approach.body}</p>
              <a href="#about" className="text-link text-link--light">
                {copy.approach.link} <span aria-hidden="true">{forwardArrow}</span>
              </a>
            </Reveal>
          </div>
        </section>

        <section
          id="about"
          className="section about-section"
          data-section-number="02"
          aria-labelledby="about-title"
        >
          <div className="site-shell about-grid">
            <Reveal className="about-heading">
              <p className="section-kicker">{copy.about.kicker}</p>
              <h2 id="about-title">
                {copy.about.heading.map((line) => (
                  <span className="heading-line" key={line}>{line}</span>
                ))}
              </h2>
              <figure className="about-visual">
                <Image
                  src="/editorial/geometry.jpg"
                  alt={copy.about.imageAlt}
                  fill
                  className="about-visual__image"
                  sizes="(max-width: 900px) calc(100vw - 48px), 34vw"
                />
                <figcaption>{copy.about.imageCaption}</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.08} className="about-copy">
              <p className="about-copy__lead">{copy.about.lead}</p>
              <p>{copy.about.body}</p>
              <a href="#contact" className="text-link">
                {copy.about.link} <span aria-hidden="true">{forwardArrow}</span>
              </a>
            </Reveal>
          </div>
        </section>

        <ParallaxMonogram copy={copy.motif} />

        <section
          id="insights"
          className="section insights-section"
          data-section-number="03"
          aria-labelledby="insights-title"
        >
          <div className="site-shell">
            <Reveal className="section-intro section-intro--insights">
              <div>
                <p className="section-kicker">{copy.insights.kicker}</p>
                <p className="section-index">{copy.insights.index}</p>
              </div>
              <h2 id="insights-title">
                {copy.insights.heading.map((line) => (
                  <span className="heading-line" key={line}>{line}</span>
                ))}
              </h2>
            </Reveal>

            <div className="editorial-wrap">
              <p className="editorial-caption">{copy.insights.caption}</p>
              <EditorialList items={copy.insights.items} variant="insights" />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
          data-section-number="04"
          aria-labelledby="contact-title"
        >
          <div className="site-shell">
            <Reveal className="contact-heading">
              <p className="section-kicker">{copy.contact.kicker}</p>
              <h2 id="contact-title">{copy.contact.heading}</h2>
            </Reveal>

            <div className="contact-grid">
              <Reveal className="contact-form-wrap">
                <ContactForm copy={copy.contact.form} locale={lang} />
              </Reveal>
              <Reveal delay={0.08} className="contact-details">
                <div className="contact-detail">
                  <p>{copy.contact.general}</p>
                  <a
                    href={copy.contact.generalHref}
                    className="contact-detail__link"
                    dir="ltr"
                    aria-label={`${copy.contact.general}: ${copy.contact.generalValue}`}
                  >
                    {copy.contact.generalValue}
                  </a>
                </div>
                <div className="contact-detail">
                  <p>{copy.contact.telephone}</p>
                  <a
                    href={copy.contact.telephoneHref}
                    className="contact-detail__link"
                    dir="ltr"
                    aria-label={`${copy.contact.telephone}: ${copy.contact.telephoneValue}`}
                  >
                    {copy.contact.telephoneValue}
                  </a>
                </div>
                <div className="contact-detail">
                  <p>{copy.contact.office}</p>
                  <address>
                    {copy.contact.officeLocation}
                    <br />
                    {copy.contact.officeAddress}
                  </address>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="site-shell footer__cta">
          <p className="footer__eyebrow">{copy.footer.eyebrow}</p>
          <a href="#contact" className="footer__cta-link">
            <span className="footer__cta-title">{copy.footer.heading}</span>
            <span className="footer__cta-arrow" aria-hidden="true">{forwardArrow}</span>
          </a>
        </div>

        <div className="site-shell footer__main">
          <div className="footer__identity">
            <a href="#top" className="footer__brand" aria-label={copy.footer.backToTop}>
              <Image
                src="/brand-lockup.png"
                width={1171}
                height={1097}
                alt={copy.brand.full}
                className="footer__lockup"
                sizes="220px"
              />
            </a>
            <p>{copy.footer.statement}</p>
          </div>

          <div className="footer__column">
            <p className="footer__label">{copy.footer.navigationLabel}</p>
            <nav className="footer__nav" aria-label={copy.footer.navigationLabel}>
              {footerLinks.map((link, index) => (
                <a key={link.label} href={link.href}>
                  <span>0{index + 1}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="footer__column footer__office">
            <p className="footer__label">{copy.footer.officeLabel}</p>
            <p className="footer__office-location">{copy.footer.officeLocation}</p>
            <a href="#contact" className="footer__office-link">
              {copy.footer.action} <span aria-hidden="true">{forwardArrow}</span>
            </a>
          </div>
        </div>

        <div className="site-shell footer__credits">
          <span>{copy.footer.photoCredit}:</span>
          <a href="https://www.pexels.com/photo/monumental-concrete-facade-26964134/" target="_blank" rel="noreferrer">
            Omar Elsharawy / Pexels
          </a>
          <a href="https://unsplash.com/photos/A-13PmQkP1o" target="_blank" rel="noreferrer">
            Sebastian Schuster / Unsplash
          </a>
          <a href="https://www.pexels.com/photo/17553092/" target="_blank" rel="noreferrer">
            Youmna Badr / Pexels
          </a>
        </div>
        <div className="site-shell footer__bottom">
          <p>{copy.footer.copyright}</p>
          <p>{copy.footer.descriptor}</p>
          <a href="#top">{copy.footer.backToTop} ↑</a>
        </div>
      </footer>
    </>
  );
}
