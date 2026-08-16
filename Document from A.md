# Master Build Prompt — Ismail Fekri & Partners

### Single-Page Premium Corporate Website

> Paste everything below into your AI builder (v0, Cursor, Lovable, Claude, etc.) as one instruction block. It is written as a complete creative \+ technical brief so nothing gets reinterpreted or genericized along the way.

---

## 0\. Role & Objective

You are a senior frontend designer-engineer who builds award-winning, editorial-grade corporate websites — the digital equivalent of a Magic Circle law firm or a top-tier investment advisory. Build a **single-page website** for **Ismail Fekri & Partners**, a professional advisory firm.

The result must look and feel like a **bespoke, six-figure agency build** — never a template, never a SaaS landing page, never "AI slop." Restraint, whitespace, and typographic confidence are the whole point. Read this entire brief before writing code. Every animation must earn its place; if in doubt, cut it.

---

## 1\. Brand Context

- **Firm name:** Ismail Fekri & Partners (اسماعيل فكري وشركاه)  
- **Logo:** An existing navy calligraphic "if" monogram (client-supplied asset). Treat it as the single strongest visual element on the page — the UI should never compete with it, never redraw it, never wrap it in a container that fights its organic linework.  
- **Positioning:** Quiet luxury, authority, precision, whitespace. A firm clients hire for judgment, not for flash.  
- **Practice areas** *(transcribed from a handwritten client note — confirm exact wording before shipping live copy)*:  
  1. Board & Governance Advisory  
  2. Corporate Restructuring  
  3. Investment & Real Estate Advisory  
  4. Business & Strategic Consulting  
  5. Audit / Compliance Review Follow-up  
- **Language:** English primary, with an **EN / AR** toggle reserved in the nav (Arabic is the firm's origin language; note source material is Arabic). If full bilingual \+ RTL isn't in scope for v1, still build the toggle affordance so it's a drop-in later — don't hardcode LTR-only assumptions into the layout components.

---

## 2\. Visual Identity System

### 2.1 Color

| Token | Hex | Usage |
| :---- | :---- | :---- |
| Deep Navy | `#0B1F3A` | Headings, primary buttons, nav text |
| Royal Navy | `#132F55` | Hover states, secondary section fills |
| Pure White | `#FFFFFF` | Primary background |
| Soft White | `#F7F9FC` | Alternating section background |
| Navy Mist | `#E9EEF5` | Card/border fills, watermark tint |
| Slate | `#526176` | Secondary/UI text |
| Deep Slate | `#26364A` | Body copy |
| Light Border | `#DCE3EC` | 1px dividers |
| Accent Blue | `#285A91` | Links, active states, small accents only |

**Ratio:** \~70% white, 20% navy, 8% mist, 2% accent blue. No gradients. No gold unless the client asks for it later.

### 2.2 Typography

- **Headings:** Cormorant Garamond (elegant serif — pairs with the calligraphic monogram without imitating it)  
- **Body / UI:** Inter or Manrope  
- **Nav / labels / buttons:** small caps or uppercase, `13px`, `500` weight, `letter-spacing: 0.12em`  
- Hero headline: large serif, generous line-height, no more than 4–6 words per line  
- Never mix more than these two typefaces anywhere on the page

### 2.3 Spacing / Grid

Max content width:     1280px

Desktop side padding:  64–80px

Mobile side padding:   24px

Section spacing:       140–180px desktop / 90–110px mobile

Border radius:         0–4px everywhere (sharp, architectural — the logo is calligraphic, the UI should be rectilinear)

Dividers:              1px solid \#DCE3EC, never shadowed

---

## 3\. Page Structure (single page, anchor-navigated)

Build these sections in order, each a distinct `<section id="...">` for anchor-scroll nav:

### Nav (`#top`)

Fixed, transparent-on-load. Logo left. Links right, uppercase, small, generous tracking: **About · Expertise · Services · Insights · Contact**, plus an **EN/AR** toggle far right. Underline-on-hover uses a thin animated line, not a background fill. On scroll past \~80px: background transitions to white \+ a 1px bottom border fades in — no drop shadow.

### Hero (`#hero`)

Eyebrow: `ISMAIL FEKRI & PARTNERS`. Large serif headline (e.g. *"Trusted expertise for complex decisions."*), one-line supporting sentence in Slate, one primary CTA (`DISCOVER OUR EXPERTISE →`). The monogram sits large but quiet on the right with heavy negative space around it — it should look placed by a designer, not pasted in.

### Expertise / Services (`#expertise`)

**Editorial numbered list, not cards.** Each of the five practice areas gets a row: `01 — Board & Governance Advisory  →`, thin divider between rows. On hover: row background tints to Soft White, the number shifts to Accent Blue, the arrow translates 6–10px right, and a one-line description fades/slides in beneath. This is the section most likely to get genericized into a 3-card grid by a lazy builder — explicitly resist that.

### Navy statement break (`#approach`)

Full-bleed `#0B1F3A` section. Short, confident line of copy (e.g. *"Built around your objectives."*), white text, one accent-blue text link. Pure breathing room — this section exists to reset rhythm, not to convey new information.

### About (`#about`)

Asymmetric two-column: label \+ firm name on the left, a single substantial paragraph on the right. No stat counters, no icon grid — this firm doesn't need to prove itself with numbers.

### Monogram motif transition

Between two sections, render the `if` monogram as a giant background watermark at 3–6% opacity in Navy Mist. This is the site's recurring visual signature — reuse it once or twice more at small scale as a section divider, never as decoration that competes with content.

### Insights (`#insights`)

Same editorial-row treatment as Expertise: date, headline, arrow, thin divider. No thumbnail images, no blog-card grid.

### Contact (`#contact`)

Large serif heading (*"Let's start a conversation."*), a minimal underline-style form (Name / Email / Message), and firm details (general enquiries, phone, office) laid out as plain labeled text — not in a boxed card.

### Footer

Minimal: logo mark, nav links repeated small, copyright line. No newsletter signup, no social icon soup.

---

## 4\. Animation & Micro-Interaction Spec

This is the part that separates "professional" from "template." Build all motion using **transform and opacity only** (GPU-accelerated) — never animate layout properties like `width`, `top`, or `margin`.

**Recommended stack:** React \+ Tailwind \+ **Framer Motion** (component-level reveals/hover) \+ **GSAP ScrollTrigger** (scroll-linked effects) \+ **Lenis** (smooth scroll easing). If building in plain HTML/CSS/JS instead, use GSAP \+ ScrollTrigger alone.

### 4.1 Global motion principles

- Duration range: 400–800ms for entrances, 150–250ms for hover/interaction states  
- Easing: a custom soft cubic-bezier, e.g. `cubic-bezier(0.22, 1, 0.36, 1)` — no bounce, no elastic, no spring overshoot  
- Stagger children by 60–90ms max when revealing grouped elements (nav links, list rows)  
- Respect `prefers-reduced-motion: reduce` — disable scroll-linked parallax and long entrance delays entirely for those users, fall back to instant or fade-only

### 4.2 Page-load sequence

1. Monogram fades in (`opacity 0→1`, 700ms)  
2. Eyebrow text rises in (`translateY(15px)→0`, 600ms, slight delay after logo)  
3. Headline lines reveal with a clip-path mask sweep (each line unmasks left-to-right, staggered \~80ms per line) rather than a plain fade — this is the single highest-leverage "premium" detail on the page  
4. CTA and supporting text fade/rise in last  
5. Total sequence should resolve within \~1.4s — never make the visitor wait

### 4.3 Scroll reveal system

- Elements enter with `translateY(24px)→0` \+ `opacity 0→1` as they cross \~80% viewport height, using IntersectionObserver or ScrollTrigger `start: "top 85%"`  
- Trigger once per element (no re-animating on scroll-up) unless it's the monogram watermark, which may parallax continuously  
- Numbered list rows (Expertise/Insights) stagger in top-to-bottom, 70ms apart

### 4.4 Navbar behavior

- Transparent over hero, background \+ border fade in together (not a hard cut) once scrolled past hero  
- Hide-on-scroll-down / reveal-on-scroll-up is optional polish — only add if it feels inevitable, not gimmicky

### 4.5 Custom cursor (desktop only)

- Thin 24px ring that follows the pointer with slight lag (lerp \~0.15)  
- On hovering any link/button: ring scales to \~1.6x and fills with 10% Navy tint  
- Disable entirely on touch devices — never fake a cursor on mobile

### 4.6 Magnetic buttons

- Primary CTA buttons pull toward the cursor within an 8–12px radius on hover, spring back on mouse-leave  
- Keep the pull subtle — this should read as "responsive," not "wobbly"

### 4.7 Editorial row hover (Expertise / Insights)

- Row background: `transparent → #F7F9FC`, 200ms  
- Number color: `Slate → Accent Blue`, 200ms  
- Arrow icon: `translateX(0) → translateX(8px)`, 250ms, eased  
- Description line: `max-height: 0 → auto` \+ `opacity 0→1`, 250ms (use a measured-height animation, not `display: none/block`, to keep it smooth)

### 4.8 Monogram watermark parallax

- On the transition section, the watermark moves at \~0.3x scroll speed (classic parallax) and very slightly scales (1.0 → 1.04) across its scroll range — barely perceptible, purely atmospheric

### 4.9 Mobile menu

- Full-screen navy (`#0B1F3A`) panel, slides/fades in over \~350ms  
- Links stagger-reveal top to bottom, large serif type, 60ms apart  
- Close via an animated hamburger→X icon morph, not a swap

### 4.10 What NOT to animate

No spinning logos, no floating/bobbing cards, no scroll-jacking, no confetti, no typewriter text effects, no particle backgrounds, no autoplay carousels.

---

## 5\. Technical Requirements

- **Stack:** React (Next.js or Vite) \+ Tailwind CSS \+ Framer Motion \+ GSAP/ScrollTrigger \+ Lenis for smooth scroll. Single page, anchor navigation — no client-side router needed.  
- **Responsive breakpoints:** mobile ≤640px, tablet 641–1024px, desktop 1025px+. Test the editorial list and hero headline sizing at each.  
- **Performance:** target 60fps on all scroll/hover animations; lazy-load below-the-fold imagery; keep JS bundle lean — this is a marketing page, not an app.  
- **Accessibility:** semantic HTML landmarks, visible focus states on all interactive elements (a thin navy outline, not a browser default), sufficient color contrast (navy-on-white easily passes AA), full `prefers-reduced-motion` fallback as noted above.  
- **Assets:** treat the "if" monogram as an SVG so it can be recolored/scaled/used as the watermark without quality loss.

---

## 6\. Explicit Do-Not List

To avoid the site reading as AI-generated or templated, do **not**:

- Use gradients anywhere, including on buttons or backgrounds  
- Use glassmorphism / frosted-glass panels  
- Use large rounded corners (\>4px) or pill-shaped buttons  
- Use drop shadows on cards or buttons (flat \+ bordered only)  
- Build the services section as a 3-up icon-card grid  
- Use stock photography of "diverse professionals shaking hands"  
- Use bouncy/elastic/spring-overshoot easing anywhere  
- Add a hero background video, particle effect, or animated blob  
- Use more than two typefaces  
- Add statistics counters or icon-badge trust rows unless the client supplies real figures

---

## 7\. Deliverable

Produce a single, production-ready page (all sections above), fully responsive, with the motion system in section 4 implemented — not just described in comments. Use placeholder copy in brackets only where the client hasn't confirmed final wording (e.g. `[confirm exact practice area names]`), and use the client's actual monogram SVG wherever the logo is referenced.  
