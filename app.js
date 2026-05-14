const contact = {
  phone: "020 3932 2723",
  phoneHref: "tel:02039322723",
  email: "info@cpmanagementgroup.co.uk",
  careersEmail: "",
  office: "56 Daventry Road, Bristol, England, BS4 1DQ",
  hours: "Monday to Sunday, 7:00am to 8:00pm",
  serviceArea: "Bristol and surrounding areas",
  domain: "https://www.cpmanagementgroup.co.uk"
};

const badges = ["Insured Service Model", "Fast Response", "Clear Quotes", "Domestic and Commercial", "Bristol and Surrounding Areas", "Professional Support"];
const benefits = ["Experienced team", "Insured service model", "Appropriate checks where required", "Eco-conscious products where practical", "Clear quote confirmation", "Fast response", "Domestic and commercial specialists", "Professional customer service"];
const sectors = ["Offices", "Apartment blocks", "Letting agents", "Landlords", "Property managers", "Retail premises", "New-build sites", "Commercial estates"];
const serviceOptions = ["Carpet Cleaning", "End of Tenancy Cleaning", "Deep Cleaning", "Landscaping and Garden", "Office Cleaning", "Communal Area Cleaning", "Fire Alarm Callout", "Waste Removal", "Other"];
const bookingServiceTitles = serviceOptions.filter((item) => item !== "Other");
const serviceCommitments = ["Clear enquiry handling", "Quote confirmation before work begins", "Accessible contact routes", "Professional conduct on site"];
const leadStatuses = ["new", "contacted", "quoted", "booked", "completed", "cancelled"];

function publicServiceName(title) {
  return title === "Landscaping and Garden Services" ? "Landscaping and Garden" : title;
}

const serviceImages = {
  domestic: "linear-gradient(135deg, rgba(49,76,99,.82), rgba(66,111,92,.76)), url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=70')",
  commercial: "linear-gradient(135deg, rgba(24,39,54,.84), rgba(93,127,155,.72)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=70')",
  garden: "linear-gradient(135deg, rgba(66,111,92,.84), rgba(160,137,80,.66)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=70')",
  waste: "linear-gradient(135deg, rgba(49,76,99,.84), rgba(92,97,101,.72)), url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=70')"
};

const services = [
  service("domestic", "carpet-cleaning", "Carpet Cleaning", "Professional carpet cleaning using hot-water extraction, steam cleaning, stain treatment and child and pet-safe products.", "From £79", serviceImages.domestic,
    ["Hot-water extraction and steam cleaning", "Stain removal and odour removal", "Allergen, pet odour and everyday soil treatment", "Fast drying methods for common carpet types", "Child and pet-safe products where possible"],
    ["Our carpet cleaning service is designed for busy homes, rented properties and managed housing where carpets need a reliable refresh. CPMG uses hot-water extraction and steam cleaning methods to lift dirt, odours, allergens and stains from suitable carpet types.", "We discuss carpet condition, access, rooms required and any pet odours or specific marks before confirming the final price."],
    ["Do you treat pet odours?", "Yes. We can apply odour treatment where suitable and will advise if permanent contamination is likely.", "How fast do carpets dry?", "Drying times vary by carpet type, ventilation and weather, but we use fast drying processes where possible."]),
  service("domestic", "end-of-tenancy-cleaning", "End of Tenancy Cleaning", "Full property cleaning for tenants, landlords, estate agents and property managers to landlord and letting agent standards.", "From £149", serviceImages.domestic,
    ["Full property deep clean", "Deposit-back style cleaning", "Kitchen appliances and oven cleaning", "Bathroom sanitising and limescale removal", "Internal cupboards, fixtures and floors", "48-hour re-clean claim window where applicable"],
    ["CPMG end of tenancy cleaning supports tenants, landlords and letting agents who need a property presented to a professional standard. The service covers built-up use across kitchens, bathrooms, appliances, fixtures, internal cupboards and floors.", "Where applicable, re-clean requests must be reported within 48 hours of completion so the issue can be reviewed promptly."]),
  service("domestic", "deep-cleaning", "Deep Cleaning", "One-off or regular deep cleaning for homes that need a full refresh, including hard-to-reach areas and built-up grime.", "From £99", serviceImages.domestic,
    ["One-off deep cleaning and seasonal refreshes", "Post-renovation cleaning", "Behind appliances, ovens and cupboards", "Skirting boards, grout and high-touch areas", "Bathrooms, kitchens and hard-to-reach spaces"],
    ["Deep cleaning is suited to homes that need more than a standard clean. CPMG tackles built-up grime, kitchens, bathrooms, skirting boards, cupboards, ovens, grout and areas behind appliances where access is safe.", "This service is often chosen for seasonal refreshes, post-renovation cleaning and homes preparing for guests, sale or tenancy changes."]),
  service("domestic", "landscaping-and-garden", "Landscaping and Garden Services", "Garden and outdoor property support including lawn mowing, hedge trimming, patio cleaning and garden waste removal.", "From £59", serviceImages.garden,
    ["Lawn mowing and lawn care", "Hedge trimming and hedge maintenance", "Pressure washing and patio cleaning", "Seasonal planting", "Garden waste removal", "Regular maintenance plans"],
    ["CPMG provides outdoor property support for gardens, rental homes and managed residential spaces. Services can include lawn mowing, hedge trimming, pressure washing, patio cleaning, seasonal planting and garden waste removal.", "Regular maintenance plans are available for customers who need consistent presentation and fewer last-minute callouts."]),
  service("commercial", "communal-area-cleaning", "Communal Area Cleaning", "Scheduled cleaning for hallways, stairwells, lobbies, communal kitchens and bin stores.", "From £89", serviceImages.commercial,
    ["Hallways, stairwells and lobbies", "Communal kitchens and touchpoints", "Bin stores and entrance areas", "Scheduled cleaning with account management"],
    ["CPMG supports property managers, landlords and housing providers with scheduled communal area cleaning. We cover hallways, stairwells, lobbies, communal kitchens, bin stores and high-touch areas.", "Commercial clients can agree regular attendance, site notes and account management so standards remain consistent across managed properties."]),
  service("commercial", "window-cleaning", "Window Cleaning", "Interior and exterior commercial window cleaning using purified water and water-fed pole systems where suitable.", "From £49", serviceImages.commercial,
    ["Interior and exterior window cleaning", "Water-fed pole systems", "Purified water finish", "High-level access where suitable", "Frames and sills", "Regular commercial contracts"],
    ["CPMG commercial window cleaning covers offices, apartment blocks, retail premises and managed buildings. We clean interior and exterior glazing, frames and sills using purified water and water-fed pole systems where suitable.", "For larger or high-level access jobs, we assess access and safety before confirming the final quote."]),
  service("commercial", "fire-alarm-callout", "Fire Alarm Callout", "Fast fire alarm callout support for commercial property safety, testing, inspection and fault diagnosis.", "Quote", serviceImages.commercial,
    ["24/7 emergency positioning", "Fast response attendance", "Testing, inspection and fault diagnosis", "BS 5839 servicing support", "Compliance reports", "Commercial property safety"],
    ["CPMG provides responsive fire alarm callout support for commercial premises and managed property portfolios. Services may include testing, inspection, fault diagnosis and BS 5839 servicing support through competent personnel or approved partners.", "We can provide compliance reports where required and will prioritise urgent safety issues for commercial property clients."]),
  service("commercial", "ground-maintenance", "Ground Maintenance", "Commercial estate grounds care, lawn care, hedge maintenance, litter picking, gritting and seasonal support.", "From £69", serviceImages.garden,
    ["Lawn care and hedge maintenance", "Litter picking and car park sweeping", "Seasonal planting", "Gritting and snow clearance", "Commercial estate maintenance"],
    ["CPMG ground maintenance helps commercial estates, apartment blocks and property managers keep external areas tidy, safe and presentable. Work can include lawn care, hedge maintenance, litter picking, car park sweeping and seasonal planting.", "Winter support such as gritting and snow clearance can be quoted for suitable sites."]),
  service("commercial", "office-cleaning", "Office Cleaning", "Professional office cleaning for desks, workstations, kitchens, bathrooms and high-touch surfaces.", "From £79", serviceImages.commercial,
    ["Desks and workstations", "Kitchens and bathrooms", "High-touch surfaces", "Flexible out-of-hours cleaning", "Daily, weekly or recurring contracts"],
    ["CPMG office cleaning is built around reliable recurring attendance and clear specifications. We clean desks, workstations, kitchens, bathrooms, floors and high-touch surfaces.", "Flexible out-of-hours cleaning can be arranged for daily, weekly or recurring commercial contracts."]),
  service("commercial", "waste-removal", "Waste Removal", "Responsible household and commercial waste removal with same-day or next-day slots where possible.", "From £49", serviceImages.waste,
    ["Household and commercial waste", "Furniture, appliances and garden waste", "Construction debris where permitted", "Same-day or next-day slots where possible", "Responsible recycling", "Waste transfer notes"],
    ["CPMG waste removal supports homes, landlords, offices, managed buildings and light commercial sites. We can remove household waste, commercial waste, furniture, appliances, garden waste and permitted construction debris.", "Waste is handled responsibly, with recycling considered where possible and waste transfer notes provided when required."]),
  service("commercial", "sparkle-cleaning", "Sparkle Cleaning", "Show-home standard cleaning for new builds, sales suites, viewings and post-construction handover.", "From £119", serviceImages.commercial,
    ["Show-home standard cleaning", "New builds, sales suites and viewings", "Post-construction dust removal", "Paint splash detail cleaning", "Glass and chrome polishing", "Fast turnaround"],
    ["CPMG sparkle cleaning is for sites that need a high-standard finish before viewing, sale, handover or presentation. We focus on post-construction dust, paint splashes, glass polishing, chrome polishing and detailed presentation.", "Fast turnaround can be quoted for new builds, sales suites and urgent viewing preparation."])
];

applyServiceOverrides();

function service(category, slug, title, shortDescription, priceLabel, image, includedItems, bodyContent, faqPairs = []) {
  return {
    id: slug,
    slug,
    category,
    title,
    shortDescription,
    heroSubtitle: shortDescription,
    heroImage: image,
    ctaButtonText: category === "commercial" ? "Request a Quote" : "Book This Service",
    startingPrice: priceLabel.includes("£") ? priceLabel.replace("From ", "") : "",
    priceLabel,
    includedItems,
    bodyContent,
    seoSections: [
      `${title} from CPMG is available for domestic and commercial customers where suitable in Bristol and surrounding areas.`,
      "Final prices may vary depending on property size, condition, location, access and service requirements. CPMG will confirm the final quote before work begins."
    ],
    galleryImages: [image, category === "domestic" ? serviceImages.garden : serviceImages.commercial, serviceImages.waste],
    faqs: faqPairs.length ? pairFaqs(faqPairs) : defaultFaqs(title),
    metaTitle: `${title} | CPMG`,
    metaDescription: shortDescription,
    isPopular: true,
    sortOrder: 0,
    createdAt: "2026-05-03",
    updatedAt: "2026-05-03"
  };
}

function pairFaqs(items) {
  const faqs = [];
  for (let i = 0; i < items.length; i += 2) faqs.push({ q: items[i], a: items[i + 1] });
  return faqs;
}

function defaultFaqs(title) {
  return [
    { q: `How is ${title.toLowerCase()} priced?`, a: "Prices are shown as from prices or quote labels. The final quote depends on property size, condition, access, location and requirements." },
    { q: "Can CPMG attend quickly?", a: "Same-day availability may be possible depending on location, team availability and the service required." },
    { q: "Are staff insured?", a: "CPMG positions its work around professional, insured service delivery and appropriate checks where required." }
  ];
}

const app = document.querySelector("#app");
document.querySelector("[data-year]").textContent = new Date().getFullYear();
document.querySelector("[data-menu-toggle]").addEventListener("click", () => document.querySelector("[data-header]").classList.toggle("open"));
document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");
  if (!link) return;
  const url = new URL(link.href);
  if (url.origin !== location.origin) return;
  event.preventDefault();
  history.pushState(null, "", url.pathname);
  document.querySelector("[data-header]").classList.remove("open");
  render();
});
window.addEventListener("popstate", render);

function render() {
  const path = location.pathname.replace(/\/$/, "") || "/";
  const serviceMatch = services.find((item) => `/services/${item.category}/${item.slug}` === path);
  const routes = {
    "/": homePage,
    "/services/domestic": () => categoryPage("domestic"),
    "/services/commercial": () => categoryPage("commercial"),
    "/booking": bookingPage,
    "/contact": contactPage,
    "/about": aboutPage,
    "/careers": careersPage,
    "/privacy-policy": privacyPage,
    "/terms-and-conditions": termsPage,
    "/admin": adminPage
  };
  if (serviceMatch) servicePage(serviceMatch);
  else if (routes[path]) routes[path]();
  else notFoundPage();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  app.focus({ preventScroll: true });
  bindForms();
  bindWizard();
  bindAdmin();
  injectSchema(path, serviceMatch);
}

function setMeta(title, description) {
  document.title = title;
  document.querySelector("meta[name='description']").setAttribute("content", description);
  document.querySelector("meta[property='og:title']").setAttribute("content", title);
  document.querySelector("meta[property='og:description']").setAttribute("content", description);
  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = `${contact.domain}${location.pathname}`;
}

function hero({ eyebrow, title, text, primary = "Book Now", secondary = "Get a Quote", image = serviceImages.commercial, compact = false }) {
  return `<section class="hero ${compact ? "compact" : ""}" style="--hero-image:${image}">
    <div class="hero-inner">
      <div>
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title}</h1>
        <p class="lead">${text}</p>
        <div class="actions">
          <a class="button primary" href="/booking" data-link>${primary}</a>
          <a class="button outline" href="/contact" data-link>${secondary}</a>
        </div>
        ${trustBadges()}
      </div>
      <aside class="hero-panel">
        <img src="/cpmg-logo.png" alt="CPMG logo">
        <h2>Insured property support with fast, practical communication.</h2>
        <p>Domestic and commercial bookings, quote requests and urgent property service enquiries handled by one team.</p>
      </aside>
    </div>
  </section>`;
}

function pageHeader({ eyebrow, title, text, primary = "", secondary = "" }) {
  const actions = primary || secondary ? `<div class="actions slim-actions">${primary ? `<a class="button primary" href="/booking" data-link>${primary}</a>` : ""}${secondary ? `<a class="button outline" href="/contact" data-link>${secondary}</a>` : ""}</div>` : "";
  return `<section class="page-header">
    <div class="section-inner">
      <div>
        <div class="eyebrow">${eyebrow}</div>
        <h1>${title}</h1>
        <p>${text}</p>
        ${actions}
      </div>
    </div>
  </section>`;
}

function bookingHeader() {
  return `<section class="booking-hero">
    <div class="section-inner">
      <h1>Book Your Service</h1>
      <p>Select your service, share your details and CPMG will confirm availability and the final quote.</p>
    </div>
  </section>`;
}

function trustBadges() {
  return `<div class="trust-row">${badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}</div>`;
}

function homePage() {
  setMeta("CPMG | Cleaning and Property Management Services", "Professional cleaning, maintenance, grounds care and property support services for homes, landlords, property managers and businesses.");
  app.innerHTML = `${hero({
    eyebrow: "Crown Property Management Group Ltd",
    title: "Cleaning & Property Management Services in Bristol",
    text: "CPMG provides domestic and commercial cleaning, maintenance, grounds care, waste removal and property support services for homes, landlords, businesses and property managers in Bristol and surrounding areas.",
    primary: "Book a Service",
    secondary: "Get a Quote"
  })}
  <section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Services</span><h2>Domestic and commercial property support</h2></div><p>Choose a service, compare from prices where available, then book or request a tailored quote.</p></div>
    <div class="grid two">
      ${overviewCard("Domestic Services", "Carpet Cleaning, End of Tenancy Cleaning, Deep Cleaning, Landscaping and Garden Services", "/services/domestic", serviceImages.domestic)}
      ${overviewCard("Commercial Services", "Office Cleaning, Communal Area Cleaning, Window Cleaning, Ground Maintenance, Waste Removal, Fire Alarm Callout and Sparkle Cleaning", "/services/commercial", serviceImages.commercial)}
    </div>
  </div></section>
  ${popularServices()}
  ${processSteps()}
  ${whyChoose()}
  ${commitmentsSection()}
  ${cta("Ready to Book a Reliable Cleaning or Property Maintenance Service?", "Tell CPMG what you need and the team will confirm availability, pricing and next steps.", "Book Now", "Request a Quote")}`;
}

function overviewCard(title, text, href, image) {
  return `<article class="card"><div class="card-img" style="--image:${image}"></div><div class="card-body"><h3>${title}</h3><p>${text}</p><a class="button secondary" href="${href}" data-link>View Services</a></div></article>`;
}

function popularServices() {
  return `<section class="section alt"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Popular services</span><h2>Frequently requested CPMG services</h2></div><p>Fast access to common cleaning, maintenance and property service enquiries.</p></div>
    <div class="grid three">${services.map(serviceCard).join("")}</div>
  </div></section>`;
}

function serviceCard(item) {
  return `<article class="card">
    <div class="card-img" style="--image:${item.heroImage}" role="img" aria-label="${item.title}"></div>
    <div class="card-body">
      <span class="eyebrow">${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.shortDescription}</p>
      <ul class="list compact-list">${item.includedItems.slice(0, 4).map((point) => `<li>${point}</li>`).join("")}</ul>
      <span class="service-price">${item.priceLabel}</span>
      <p><a class="button outline" href="/services/${item.category}/${item.slug}" data-link>Learn More</a></p>
    </div>
  </article>`;
}

function categoryPage(category) {
  const isDomestic = category === "domestic";
  const list = services.filter((item) => item.category === category);
  setMeta(`${isDomestic ? "Domestic" : "Commercial"} Services | CPMG`, `${isDomestic ? "Domestic cleaning and garden support" : "Commercial cleaning and property maintenance"} services from Crown Property Management Group Ltd.`);
  app.innerHTML = `${pageHeader({
    eyebrow: isDomestic ? "Domestic services" : "Commercial services",
    title: isDomestic ? "Reliable Domestic Cleaning & Garden Services" : "Commercial Cleaning & Property Maintenance Support",
    text: isDomestic ? "Book professional carpet cleaning, end of tenancy cleaning, deep cleaning and outdoor property support for homes in Bristol and surrounding areas." : "Request quotes for cleaning, fire alarm callouts, waste removal and property support for businesses and managed sites.",
    primary: isDomestic ? "Book Domestic Service" : "Request a Commercial Quote",
    secondary: "Speak to CPMG"
  })}
  <section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">${category}</span><h2>${isDomestic ? "Domestic service range" : "Commercial service range"}</h2></div><p>${isDomestic ? "Clear from prices are shown where practical." : "Commercial jobs are priced around site specification, frequency, access and urgency."}</p></div>
    <div class="grid ${isDomestic ? "two" : "three"}">${list.map(serviceCard).join("")}</div>
  </div></section>
  ${categoryInfoSection(category)}
  ${gallerySection()}
  ${isDomestic ? whyChoose() : sectorSection()}
  ${faqSection(isDomestic ? domesticFaqs() : commercialFaqs())}
  ${cta(isDomestic ? "Book a Domestic Service With CPMG" : "Request a Commercial Quote", isDomestic ? "Choose your preferred service and send your property details in a few steps." : "Send your site details and CPMG will confirm the right specification and quote.", isDomestic ? "Book This Service" : "Request a Quote", "Contact CPMG")}`;
}

function categoryInfoSection(category) {
  const isDomestic = category === "domestic";
  return `<section class="section alt"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">${isDomestic ? "Domestic support" : "Commercial support"}</span><h2>${isDomestic ? "Cleaning and outdoor help for homes" : "Contract cleaning and property support"}</h2></div></div>
    <p>${isDomestic ? "CPMG helps domestic customers with one-off cleans, tenancy changes, carpet cleaning and garden support. Every enquiry is reviewed against property size, access, condition and service requirements before the final quote is confirmed." : "CPMG supports landlords, property managers, businesses and commercial clients with cleaning, callout support and waste removal. Commercial work can be quoted as a one-off job or recurring support depending on the site."}</p>
  </div></section>`;
}

function servicePage(item) {
  setMeta(item.metaTitle, item.metaDescription);
  const related = services.filter((other) => other.category === item.category && other.slug !== item.slug).slice(0, 3);
  app.innerHTML = `${pageHeader({
    eyebrow: item.category,
    title: item.title,
    text: item.heroSubtitle,
    primary: item.ctaButtonText,
    secondary: "Speak to CPMG"
  })}
  <section class="section"><div class="section-inner">
    ${breadcrumbs([{ label: item.category === "domestic" ? "Domestic" : "Commercial", href: `/services/${item.category}` }, { label: item.title }])}
    <div class="split">
      <article>
        <span class="service-price">${item.priceLabel}</span>
        ${item.bodyContent.map((p) => `<p>${p}</p>`).join("")}
        <h2>What is included</h2>
        <ul class="list">${item.includedItems.map((point) => `<li>${point}</li>`).join("")}</ul>
      </article>
      <aside class="quote-band">
        <h2>Book This Service</h2>
        <p>${item.seoSections[1]}</p>
        <div class="actions"><a class="button primary" href="/booking" data-link>${item.ctaButtonText}</a><a class="button outline" href="/contact" data-link>Ask a Question</a></div>
      </aside>
    </div>
  </div></section>
  ${gallerySection(item.galleryImages)}
  <section class="section"><div class="section-inner grid two">
    <div>${item.seoSections.map((p) => `<p>${p}</p>`).join("")}</div>
    <div class="faq">${item.faqs.map((faq) => `<details><summary>${faq.q}</summary><p>${faq.a}</p></details>`).join("")}</div>
  </div></section>
  <section class="section alt"><div class="section-inner"><h2>Related services</h2><div class="grid three">${related.map(serviceCard).join("")}</div></div></section>
  ${cta(`Ready to Arrange ${item.title}?`, "Send CPMG your requirements and the team will confirm the final quote before work begins.", item.ctaButtonText, "Contact CPMG")}`;
}

function breadcrumbs(items) {
  return `<nav class="breadcrumb"><a href="/" data-link>Home</a><span>/</span>${items.map((item) => item.href ? `<a href="${item.href}" data-link>${item.label}</a><span>/</span>` : `<span>${item.label}</span>`).join("")}</nav>`;
}

function gallerySection(images = [serviceImages.domestic, serviceImages.commercial, serviceImages.garden]) {
  return `<section class="section alt"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Gallery</span><h2>Professional property service environments</h2></div><p>Visual style for cleaning, managed property, grounds and maintenance work across CPMG services.</p></div>
    <div class="grid three">${images.map((image, index) => `<div class="card-img" style="--image:${image}; min-height:240px" role="img" aria-label="CPMG service gallery image ${index + 1}"></div>`).join("")}</div>
  </div></section>`;
}

function faqSection(items) {
  return `<section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">FAQ</span><h2>Common questions</h2></div></div>
    <div class="faq">${items.map((faq) => `<details><summary>${faq.q}</summary><p>${faq.a}</p></details>`).join("")}</div>
  </div></section>`;
}

function domesticFaqs() {
  return [
    { q: "How do domestic prices work?", a: "Prices are from prices until CPMG reviews property size, condition, access and requirements." },
    { q: "Can I book one-off cleaning?", a: "Yes. One-off deep cleaning, carpet cleaning and tenancy cleans can be requested through the booking page." },
    { q: "Do you cover garden work?", a: "Yes. Landscaping and garden enquiries can include mowing, hedge trimming, pressure washing and garden waste removal." }
  ];
}

function commercialFaqs() {
  return [
    { q: "Can CPMG quote recurring commercial work?", a: "Yes. Commercial cleaning and property support can be quoted for one-off or recurring requirements." },
    { q: "Who can request a commercial quote?", a: "Landlords, property managers, letting agents, offices and commercial clients can submit an enquiry." },
    { q: "Is waste removal included?", a: "Waste removal can be quoted separately and depends on waste type, access, volume and disposal requirements." }
  ];
}

function processSteps() {
  return `<section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">How it works</span><h2>Simple booking flow</h2></div></div>
    <div class="grid three steps">
      <div class="step"><h3>Choose your service</h3><p>Select the cleaning, maintenance or property support service you need.</p></div>
      <div class="step"><h3>Select date and time</h3><p>Share your preferred slot, urgency and property details.</p></div>
      <div class="step"><h3>CPMG attends</h3><p>The team confirms the quote, attends and completes the agreed work.</p></div>
    </div>
  </div></section>`;
}

function whyChoose() {
  return `<section class="section alt"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Why choose CPMG</span><h2>Reliable, insured and service-led</h2></div></div>
    <div class="grid four">${benefits.map((item) => `<div class="mini-kpi"><strong>${item}</strong><p class="muted">Professional standards with clear communication from enquiry to completion.</p></div>`).join("")}</div>
  </div></section>`;
}

function sectorSection() {
  return `<section class="section alt"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Sectors served</span><h2>Built for commercial property needs</h2></div></div>
    <div class="grid four">${sectors.map((item) => `<div class="mini-kpi"><strong>${item}</strong><p class="muted">Cleaning, maintenance and site support tailored to access and specification.</p></div>`).join("")}</div>
  </div></section>${whyChoose()}`;
}

function commitmentsSection() {
  return `<section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Service standards</span><h2>What customers can expect</h2></div><p>No inflated promises: CPMG focuses on clear communication, practical quotes and professional attendance.</p></div>
    <div class="grid four">${serviceCommitments.map((item) => `<article class="card commitment-card"><div class="card-body"><h3>${item}</h3><p class="muted">Built into the enquiry and booking process.</p></div></article>`).join("")}</div>
  </div></section>`;
}

function cta(title, text, primary, secondary) {
  return `<section class="section"><div class="section-inner quote-band"><h2>${title}</h2><p>${text}</p><div class="actions"><a class="button primary" href="/booking" data-link>${primary}</a><a class="button outline" href="/contact" data-link>${secondary}</a></div></div></section>`;
}

function bookingPage() {
  setMeta("Book a Service | CPMG", "Use the CPMG booking wizard to request a domestic or commercial cleaning, maintenance or property support service.");
  app.innerHTML = `${bookingHeader()}
  <section class="booking-section"><div class="section-inner wizard" data-wizard></div></section>`;
}

let bookingState = { step: 1, serviceRequired: "", name: "", email: "", phone: "", address: "", postcode: "", propertyType: "", message: "", preferredDate: "", preferredTime: "", urgency: "Flexible", consent: false, companyWebsite: "" };

function bindWizard() {
  const wizard = document.querySelector("[data-wizard]");
  if (!wizard) return;
  renderWizard(wizard);
}

function renderWizard(wizard) {
  wizard.innerHTML = `${bookingProgress()}${wizardStep()}<p class="muted price-note">Final prices may vary depending on property size, condition, location, access, and service requirements. CPMG will confirm the final quote before work begins.</p>`;
  wizard.querySelectorAll("[data-service]").forEach((button) => button.addEventListener("click", () => { bookingState.serviceRequired = button.dataset.service; bookingState.step = 2; renderWizard(wizard); }));
  wizard.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => { saveWizardFields(wizard); if (validateWizard(wizard)) { bookingState.step += 1; renderWizard(wizard); } }));
  wizard.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => { saveWizardFields(wizard); bookingState.step -= 1; renderWizard(wizard); }));
  const submit = wizard.querySelector("[data-submit-booking]");
  if (submit) submit.addEventListener("click", async () => {
    saveWizardFields(wizard);
    const errors = validateBookingState();
    if (Object.keys(errors).length) {
      showFormErrors(wizard, errors);
      return;
    }
    submit.disabled = true;
    const response = await submitLead("/api/booking", { ...bookingState, sourcePage: location.pathname });
    if (response.ok) {
      saveLead("bookings", { ...bookingState, status: "new", createdAt: new Date().toISOString(), sourcePage: location.pathname });
      wizard.innerHTML = successMessage("Booking request received. CPMG will contact you to confirm availability and the final quote.");
    } else {
      submit.disabled = false;
      wizard.insertAdjacentHTML("afterbegin", errorMessage(response.message || "Unable to submit the booking request. Please try again or contact CPMG directly."));
      if (response.errors) showFormErrors(wizard, response.errors);
    }
  });
}

function bookingProgress() {
  const labels = ["Select Service", "Property Details", "Date & Time", "Review"];
  return `<div class="booking-progress">${labels.map((label, index) => {
    const number = index + 1;
    return `<div class="progress-step ${bookingState.step >= number ? "active" : ""}"><span>${number}</span><small>${label}</small></div>`;
  }).join("")}</div>`;
}

function wizardStep() {
  if (bookingState.step === 1) return `<h2>Select a Service</h2><div class="booking-service-grid">${services.filter((item) => bookingServiceTitles.includes(publicServiceName(item.title))).map(bookingServiceCard).join("")}</div>`;
  if (bookingState.step === 2) return `<h2>Property Details</h2><div class="form-grid">${field("name","Full name",true)}${field("email","Email address",true,"email")}${field("phone","Phone number",true,"tel")}${field("address","Address",true)}${field("postcode","Postcode",true)}${selectField("propertyType","Property type",["","House","Flat","Office","Retail premises","Apartment block","Commercial estate","Other"])}${field("message","Job details/message",true,"textarea","full")}</div><div class="actions"><button class="outline" data-back>Back</button><button class="primary" data-next>Continue</button></div>`;
  if (bookingState.step === 3) return `<h2>Date and Time</h2><div class="form-grid">${field("preferredDate","Preferred date",false,"date")}${selectField("preferredTime","Preferred time",["","Morning","Afternoon","Evening","Any time"])}${selectField("urgency","Urgency",["Flexible","This week","Same-day if available","Emergency / urgent"])}</div><div class="actions"><button class="outline" data-back>Back</button><button class="primary" data-next>Review</button></div>`;
  return `<h2>Review and Submit</h2><div class="card"><div class="card-body"><p><strong>Service:</strong> ${bookingState.serviceRequired || ""}</p><p><strong>Contact:</strong> ${bookingState.name}, ${bookingState.email}, ${bookingState.phone}</p><p><strong>Address:</strong> ${bookingState.address}, ${bookingState.postcode}</p><p><strong>Preferred slot:</strong> ${bookingState.preferredDate || "Not specified"} / ${bookingState.preferredTime || "Not specified"} / ${bookingState.urgency}</p><p><strong>Job details:</strong> ${bookingState.message || "None supplied"}</p></div></div><label class="full consent-label"><input type="checkbox" name="consent" ${bookingState.consent ? "checked" : ""} required> I consent to CPMG contacting me about this enquiry.</label><span class="error" data-error-for="consent"></span><input type="text" name="companyWebsite" hidden tabindex="-1" autocomplete="off"><div class="actions"><button class="outline" data-back>Back</button><button class="primary" data-submit-booking>Submit Request</button></div>`;
}

function bookingServiceCard(item) {
  const label = publicServiceName(item.title);
  return `<button class="select-card compact-service ${bookingState.serviceRequired === label ? "selected" : ""}" data-service="${label}">
    <span class="service-icon">${item.title.slice(0, 1)}</span>
    <span class="service-summary">
      <strong>${item.title}</strong>
      <small>${item.priceLabel}</small>
    </span>
    <span class="category-tag">${item.category}</span>
  </button>`;
}

function saveWizardFields(scope) {
  scope.querySelectorAll("input, select, textarea").forEach((input) => {
    bookingState[input.name] = input.type === "checkbox" ? input.checked : input.value;
  });
}

function validateWizard(scope) {
  const errors = {};
  [...scope.querySelectorAll("[required]")].forEach((input) => {
    if ((input.type === "checkbox" && !input.checked) || (input.type !== "checkbox" && !input.value.trim())) {
      errors[input.name] = input.type === "email" ? "A valid email address is required." : "This field is required.";
    } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      errors[input.name] = "A valid email address is required.";
    }
  });
  showFormErrors(scope, errors);
  const firstInvalidName = Object.keys(errors)[0];
  const firstInvalid = firstInvalidName ? scope.querySelector(`[name="${firstInvalidName}"]`) : null;
  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

function validateBookingState() {
  const errors = {};
  if (!bookingState.serviceRequired) errors.serviceRequired = "Choose a service.";
  if (!bookingState.name.trim()) errors.name = "Full name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingState.email)) errors.email = "A valid email address is required.";
  if (!bookingState.phone.trim()) errors.phone = "Phone number is required.";
  if (!bookingState.address.trim()) errors.address = "Address is required.";
  if (!bookingState.postcode.trim()) errors.postcode = "Postcode is required.";
  if (!bookingState.message.trim()) errors.message = "Job details are required.";
  if (!bookingState.consent) errors.consent = "Consent is required.";
  return errors;
}

function showFormErrors(scope, errors) {
  scope.querySelectorAll(".error").forEach((node) => {
    node.textContent = "";
  });
  Object.entries(errors).forEach(([name, message]) => {
    const input = scope.querySelector(`[name="${name}"]`);
    const target = input?.closest("label")?.querySelector(".error") || scope.querySelector(`[data-error-for="${name}"]`);
    if (target) target.textContent = message;
  });
}

async function submitLead(endpoint, data, options = {}) {
  try {
    const init = options.multipart
      ? { method: "POST", body: data }
      : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
    const response = await fetch(endpoint, init);
    const body = await response.json().catch(() => ({}));
    return { ok: response.ok && body.ok !== false, ...body };
  } catch {
    return { ok: false, message: "The server could not be reached. Please try again or contact CPMG directly." };
  }
}

function field(name, label, required = false, type = "text", klass = "") {
  const tag = type === "textarea" ? "textarea" : "input";
  const typeAttr = type === "textarea" ? "" : `type="${type}"`;
  return `<label class="${klass}">${label}<${tag} ${typeAttr} name="${name}" value="${bookingState[name] || ""}" ${required ? "required" : ""}>${type === "textarea" ? bookingState[name] || "" : ""}</${tag}><span class="error"></span></label>`;
}

function selectField(name, label, options) {
  return `<label>${label}<select name="${name}">${options.map((option) => `<option ${bookingState[name] === option ? "selected" : ""}>${option}</option>`).join("")}</select><span class="error"></span></label>`;
}

function contactPage() {
  setMeta("Contact CPMG | Cleaning & Property Maintenance Enquiries", "Contact Crown Property Management Group Ltd for domestic or commercial cleaning, maintenance and property support enquiries.");
  app.innerHTML = `${pageHeader({ eyebrow: "Contact", title: "Contact CPMG", text: "Send a general enquiry, quote request or service question and the CPMG team will respond as soon as possible." })}
  <section class="section"><div class="section-inner split">
    ${contactForm()}
    <aside class="quote-band"><h2>Contact information</h2><p><strong>Phone:</strong> <a href="${contact.phoneHref}">${contact.phone}</a></p><p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p><p><strong>Registered office:</strong> ${contact.office}</p><p><strong>Service area:</strong> ${contact.serviceArea}</p><p><strong>Opening hours:</strong> ${contact.hours}</p></aside>
  </div></section>`;
}

function contactForm() {
  return `<form class="form" data-lead-form="enquiries" novalidate><h2>General enquiry</h2><div class="form-grid">
    <label>Full name<input name="name" required><span class="error"></span></label>
    <label>Email address<input name="email" type="email" required><span class="error"></span></label>
    <label>Phone number<input name="phone" type="tel"><span class="error"></span></label>
    <label>Service interested in<select name="serviceInterest" required>${serviceOptions.map((item) => `<option>${item}</option>`).join("")}</select><span class="error"></span></label>
    <label class="full">Message<textarea name="message" required></textarea><span class="error"></span></label>
    <label class="full consent-label"><input name="consent" type="checkbox" required> I consent to CPMG contacting me about this enquiry.</label><span class="error" data-error-for="consent"></span>
    <input type="text" name="companyWebsite" hidden tabindex="-1" autocomplete="off">
  </div><button class="primary">Submit Enquiry</button></form>`;
}

function aboutPage() {
  setMeta("About CPMG | Crown Property Management Group Ltd", "Learn about Crown Property Management Group Ltd, a UK property services company providing domestic and commercial cleaning, maintenance and support.");
  app.innerHTML = `${pageHeader({ eyebrow: "About CPMG", title: "Professional Property Support for Homes, Landlords and Businesses", text: "Professional cleaning and property maintenance services for homes, landlords, businesses and property managers in Bristol and surrounding areas." })}
  <section class="section"><div class="section-inner split"><div><h2>Company overview</h2><p>CPMG Crown Property Management Group Ltd provides cleaning, maintenance, grounds care, waste removal and related property services across domestic and commercial sectors.</p><p>Company number: 16933005. Registered office: ${contact.office}. The company works to an insured service model and confirms scope, access and quote details before work begins.</p></div><div class="grid two"><div class="mini-kpi"><strong>Bristol area</strong><p>Service area focus</p></div><div class="mini-kpi"><strong>Insured</strong><p>Professional delivery model</p></div><div class="mini-kpi"><strong>Domestic + Commercial</strong><p>Flexible property support</p></div><div class="mini-kpi"><strong>Clear quotes</strong><p>Pricing confirmed before work begins</p></div></div></div></section>
  <section class="section alt"><div class="section-inner grid two"><div><h2>Who CPMG helps</h2><ul class="list"><li>Homeowners and tenants</li><li>Landlords and letting agents</li><li>Property managers and facilities teams</li><li>Businesses and commercial premises</li></ul></div><div><h2>Services provided</h2><ul class="list"><li>Domestic cleaning and tenancy cleans</li><li>Commercial and communal area cleaning</li><li>Grounds and garden maintenance</li><li>Waste removal and fire alarm callout support</li></ul></div></div></section>
  ${gallerySection()}${whyChoose()}${commitmentsSection()}${cta("Ready for a Cleaner, Safer Property?", "Book a service or speak to CPMG about your property support requirements.", "Book Now", "Contact CPMG")}`;
}

function careersPage() {
  setMeta("Work With CPMG | Careers", "Apply to work with Crown Property Management Group Ltd across cleaning, maintenance, grounds care, waste removal and property support roles.");
  app.innerHTML = `${pageHeader({ eyebrow: "Work With Us", title: "Work With CPMG", text: "Join Crown Property Management Group Ltd and become part of a growing UK property services team." })}
  <section class="section"><div class="section-inner split">
    <div><h2>Who we are</h2><p>CPMG provides cleaning, maintenance, grounds care, waste removal and property support services across domestic and commercial sectors.</p><h2>Benefits</h2><ul class="list"><li>Training and PPE where required</li><li>Flexible hours where available</li><li>Growth opportunities</li><li>Domestic and commercial work</li><li>Supportive team</li><li>Bristol-area opportunities</li></ul><p class="muted">With your consent, applications may be stored for up to 12 months for suitable future opportunities.</p></div>
    <form class="form" data-lead-form="careers" novalidate><h2>Application form</h2><div class="form-grid">
      <label>Full name<input name="fullName" required><span class="error"></span></label>
      <label>Phone<input name="phone" type="tel" required><span class="error"></span></label>
      <label>Email address<input name="email" type="email" required><span class="error"></span></label>
      <label>Postcode<input name="postcode" required><span class="error"></span></label>
      <label class="full">Address<input name="address"><span class="error"></span></label>
      <label>Role interested in<select name="roleInterestedIn" required><option>Cleaner</option><option>Maintenance worker</option><option>Grounds worker</option><option>Waste removal operative</option><option>Property service staff</option></select><span class="error"></span></label>
      <label>Right to work in the UK<select name="rightToWork" required><option>Yes</option><option>No</option></select><span class="error"></span></label>
      <label>Earliest start date<input name="earliestStartDate" type="date"><span class="error"></span></label>
      <label class="full">Days/hours available<input name="availability" required><span class="error"></span></label>
      <label class="full">Experience<textarea name="experience"></textarea><span class="error"></span></label>
      <label class="full">CV upload<input name="cvFile" type="file" accept=".pdf,.doc,.docx"><span class="error"></span></label>
      <label class="full consent-label"><input name="privacyConsent" type="checkbox" required> I consent to CPMG storing my application for recruitment purposes for up to 12 months.</label><span class="error" data-error-for="privacyConsent"></span>
      <input type="text" name="companyWebsite" hidden tabindex="-1" autocomplete="off">
    </div><button class="primary">Submit Application</button></form>
  </div></section>`;
}

function bindForms() {
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      form.querySelectorAll(".form-alert").forEach((node) => node.remove());
      showFormErrors(form, {});
      if (form.companyWebsite?.value) return;
      const file = form.cvFile?.files?.[0];
      if (file && (!/\.(pdf|doc|docx)$/i.test(file.name) || file.size > 5 * 1024 * 1024)) {
        form.cvFile.closest("label").querySelector(".error").textContent = "Upload a PDF, DOC or DOCX file up to 5MB.";
        return;
      }
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.consent = data.consent === "on";
      data.privacyConsent = data.privacyConsent === "on";
      const clientErrors = validateLeadForm(form.dataset.leadForm, data);
      if (Object.keys(clientErrors).length) {
        showFormErrors(form, clientErrors);
        form.insertAdjacentHTML("afterbegin", errorMessage("Please correct the highlighted fields."));
        return;
      }
      data.status = "new";
      data.createdAt = new Date().toISOString();
      if (form.dataset.leadForm === "careers") {
        data.consentTimestamp = new Date().toISOString();
        const retention = new Date();
        retention.setMonth(retention.getMonth() + 12);
        data.retentionDeleteAt = retention.toISOString();
        data.cvFileName = file ? file.name : "";
        data.cvFileSize = file ? file.size : 0;
      }
      const endpoints = { enquiries: "/api/contact", careers: "/api/careers" };
      const button = form.querySelector("button");
      button.disabled = true;
      const payload = form.dataset.leadForm === "careers" ? formData : data;
      if (form.dataset.leadForm === "careers") {
        formData.set("privacyConsent", data.privacyConsent ? "true" : "false");
        formData.set("sourcePage", location.pathname);
      } else {
        data.sourcePage = location.pathname;
      }
      const response = await submitLead(endpoints[form.dataset.leadForm], payload, { multipart: form.dataset.leadForm === "careers" });
      if (response.ok) {
        saveLead(form.dataset.leadForm, data);
        form.outerHTML = successMessage(form.dataset.leadForm === "careers" ? "Application received. CPMG will contact you if your experience matches current or future opportunities." : "Enquiry received. CPMG will respond as soon as possible.");
      } else {
        button.disabled = false;
        form.insertAdjacentHTML("afterbegin", errorMessage(response.message || "Unable to submit the form. Please try again or contact CPMG directly."));
        if (response.errors) showFormErrors(form, response.errors);
      }
    });
  });
}

function validateLeadForm(type, data) {
  const errors = {};
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (type === "enquiries") {
    if (!String(data.name || "").trim()) errors.name = "Full name is required.";
    if (!validEmail.test(data.email || "")) errors.email = "A valid email address is required.";
    if (!serviceOptions.includes(data.serviceInterest)) errors.serviceInterest = "Choose a valid service.";
    if (!String(data.message || "").trim()) errors.message = "Message is required.";
    if (data.consent !== true) errors.consent = "Consent is required.";
  }
  if (type === "careers") {
    if (!String(data.fullName || "").trim()) errors.fullName = "Full name is required.";
    if (!validEmail.test(data.email || "")) errors.email = "A valid email address is required.";
    if (!String(data.phone || "").trim()) errors.phone = "Phone number is required.";
    if (!String(data.postcode || "").trim()) errors.postcode = "Postcode is required.";
    if (!String(data.roleInterestedIn || "").trim()) errors.roleInterestedIn = "Role is required.";
    if (!["Yes", "No"].includes(data.rightToWork)) errors.rightToWork = "Right to work answer is required.";
    if (!String(data.availability || "").trim()) errors.availability = "Availability is required.";
    if (data.privacyConsent !== true) errors.privacyConsent = "Consent is required.";
  }
  return errors;
}

function saveLead(key, data) {
  const existing = JSON.parse(localStorage.getItem(`cpmg_${key}`) || "[]");
  existing.push({ id: crypto.randomUUID(), ...data });
  localStorage.setItem(`cpmg_${key}`, JSON.stringify(existing));
}

function successMessage(text) {
  return `<div class="success form-alert" role="status">${text}</div>`;
}

function errorMessage(text) {
  return `<div class="error-box form-alert" role="alert">${text}</div>`;
}

function privacyPage() {
  setMeta("Privacy Policy | CPMG", "Privacy policy for Crown Property Management Group Ltd covering UK GDPR, enquiry data, booking data and careers applications.");
  app.innerHTML = legalPage("Privacy Policy", [
    ["Who CPMG is", "Crown Property Management Group Ltd, company number 16933005, is a private limited company registered at 56 Daventry Road, Bristol, England, BS4 1DQ."],
    ["What personal data is collected", "CPMG may collect name, email, phone, address, postcode, service details, preferred dates, notes, CVs for careers applications, technical data, cookies and analytics data."],
    ["How data is used", "Data is used to respond to enquiries, manage bookings, provide quotes, deliver services, process recruitment applications, improve the website and meet legal obligations."],
    ["Legal basis under UK GDPR", "CPMG may rely on consent, contract, legitimate interests and legal obligation depending on the activity."],
    ["Data sharing", "Data may be shared with hosting providers, email providers, CRM tools if used, analytics providers and payment processors if added later."],
    ["Security and retention", "CPMG uses reasonable security measures. Booking and enquiry data is kept only as long as needed. Careers applications may be retained for up to 12 months with consent."],
    ["Your rights", "You may request access, correction, deletion, restriction, objection or portability where applicable."],
    ["Cookies", "The website may use essential cookies and analytics cookies. Analytics can be configured through Google Analytics or Plausible."],
    ["Complaints and contact", `Contact ${contact.email}. You may also complain to the Information Commissioner's Office if you are unhappy with how your data is handled.`]
  ]);
}

function termsPage() {
  setMeta("Terms and Conditions | CPMG", "Terms and conditions for CPMG cleaning, maintenance and property support services.");
  app.innerHTML = legalPage("Terms and Conditions", [
    ["Services covered", "These terms cover domestic cleaning, commercial cleaning, maintenance, grounds care, waste removal, fire alarm callouts and related property services."],
    ["Bookings and pricing", "Bookings are not confirmed until CPMG accepts the request. Prices shown online are indicative from prices or quote labels. Final quotes depend on size, condition, location, access and requirements."],
    ["Payment timing", "Payment timing will be confirmed before work begins and may vary by service, customer type and contract arrangement."],
    ["Cancellation and rescheduling", "More than 24 hours' notice allows rescheduling or cancellation. Less than 24 hours' notice may incur a cancellation fee. Same-day cancellation, no access or no-show may result in a full or partial charge."],
    ["Access requirements", "Customers must provide safe access, parking information where relevant, utilities where needed and accurate service details."],
    ["Quality and re-clean policy", "Re-clean claims must be reported within 48 hours of service completion. CPMG will review the issue against the agreed specification."],
    ["Liability and insurance", "CPMG operates a professional insured service model. Liability may be limited where issues arise from pre-existing damage, unsafe access or inaccurate information."],
    ["Health and safety", "CPMG may refuse or pause work where conditions are unsafe, unlawful or outside the agreed scope."],
    ["Data protection", "Personal data is handled in line with the CPMG Privacy Policy."],
    ["Force majeure", "CPMG is not responsible for delays caused by events outside reasonable control."],
    ["Governing law", "These terms are governed by the law of England and Wales. Final wording should be checked legally before launch."],
    ["Contact", `Questions about these terms can be sent to ${contact.email}.`]
  ]);
}

function legalPage(title, sections) {
  return `${pageHeader({ eyebrow: "Legal", title, text: "Important information for customers, applicants and commercial clients." })}
  <section class="section"><article class="section-inner legal">${sections.map(([heading, body]) => `<h2>${heading}</h2><p>${body}</p>`).join("")}</article></section>`;
}

function adminPage() {
  setMeta("CPMG Admin MVP", "Protected local admin panel for service and lead review.");
  app.innerHTML = `${pageHeader({ eyebrow: "Admin", title: "Service Catalogue & Lead Capture", text: "Review local browser leads, connect to the protected server lead export, and update service price labels for this browser." })}
  <section class="section"><div class="section-inner admin-panel">
    <h2>Manage services and prices</h2>
    <form class="grid three" data-service-admin>${services.map((item) => `<label class="card"><span class="card-body"><strong>${item.title}</strong><span class="muted">${item.category}</span><input name="${item.id}" value="${item.priceLabel}" aria-label="${item.title} price label"></span></label>`).join("")}<button class="primary full">Save service prices</button></form>
    <h2>Server leads</h2>
    <form class="form admin-token-form" data-server-admin>
      <label>Admin token<input name="adminToken" type="password" autocomplete="current-password"><span class="error"></span></label>
      <div class="actions"><button class="primary">Load Server Leads</button><button class="outline" type="button" data-server-export>Export Server CSV</button></div>
      <p class="muted">Set ADMIN_TOKEN in production. The token is not stored in the repository.</p>
    </form>
    <div data-server-leads></div>
    <h2>Browser preview leads</h2><div data-admin-leads></div>
    <div class="actions"><button class="outline" data-export>Export Browser CSV</button></div>
  </div></section>`;
}

function bindAdmin() {
  const leads = document.querySelector("[data-admin-leads]");
  if (!leads) return;
  document.querySelector("[data-service-admin]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const overrides = Object.fromEntries(new FormData(event.currentTarget).entries());
    localStorage.setItem("cpmg_service_overrides", JSON.stringify(overrides));
    services.forEach((item) => {
      if (overrides[item.id]) item.priceLabel = overrides[item.id];
    });
    alert("Service prices saved in this browser.");
  });
  const rows = ["bookings", "enquiries", "careers"].flatMap((key) => JSON.parse(localStorage.getItem(`cpmg_${key}`) || "[]").map((item) => ({ type: key, ...item })));
  leads.innerHTML = rows.length ? `<div class="grid">${rows.map((row) => `<div class="card"><div class="card-body"><strong>${row.type}</strong><pre>${escapeHtml(JSON.stringify(row, null, 2))}</pre></div></div>`).join("")}</div>` : `<p class="muted">No leads captured in this browser yet.</p>`;
  document.querySelector("[data-export]")?.addEventListener("click", () => {
    const csv = ["type,id,status,createdAt,email,phone", ...rows.map((row) => [row.type, row.id, row.status, row.createdAt, row.email || "", row.phone || ""].map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cpmg-leads.csv";
    a.click();
  });
  const serverForm = document.querySelector("[data-server-admin]");
  const serverLeads = document.querySelector("[data-server-leads]");
  serverForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    serverLeads.innerHTML = `<p class="muted">Loading server leads...</p>`;
    const token = new FormData(serverForm).get("adminToken");
    const response = await fetch("/api/admin/leads", { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json().then((body) => ({ ok: res.ok, ...body }))).catch(() => ({ ok: false, message: "Unable to reach the server admin API." }));
    if (!response.ok) {
      serverLeads.innerHTML = errorMessage(response.message || "Unable to load server leads.");
      return;
    }
    const serverRows = Object.entries(response.leads || {}).flatMap(([type, items]) => items.map((item) => ({ type, ...item })));
    serverLeads.innerHTML = serverRows.length ? `<div class="grid">${serverRows.map((row) => `<div class="card"><div class="card-body"><strong>${row.type}</strong><p class="muted">${row.email || ""} | ${row.emailDeliveryStatus || ""}</p><label>Status<select data-lead-status data-type="${row.type}" data-id="${row.id}">${leadStatuses.map((status) => `<option ${status === (row.status || "new") ? "selected" : ""}>${status}</option>`).join("")}</select><span class="error"></span></label><pre>${escapeHtml(JSON.stringify(row, null, 2))}</pre></div></div>`).join("")}</div>` : `<p class="muted">No server leads found.</p>`;
    serverLeads.querySelectorAll("[data-lead-status]").forEach((select) => select.addEventListener("change", async () => {
      const token = new FormData(serverForm).get("adminToken");
      const result = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type: select.dataset.type, id: select.dataset.id, status: select.value })
      }).then((res) => res.json().then((body) => ({ ok: res.ok, ...body }))).catch(() => ({ ok: false, message: "Unable to update status." }));
      select.closest("label").querySelector(".error").textContent = result.ok ? "" : result.message || "Unable to update status.";
    }));
  });
  document.querySelector("[data-server-export]")?.addEventListener("click", () => {
    const token = new FormData(serverForm).get("adminToken");
    if (!token) {
      serverLeads.innerHTML = errorMessage("Enter the admin token before exporting server leads.");
      return;
    }
    window.location.href = `/api/admin/export?token=${encodeURIComponent(token)}`;
  });
}

function applyServiceOverrides() {
  const overrides = JSON.parse(localStorage.getItem("cpmg_service_overrides") || "{}");
  services.forEach((item) => {
    if (overrides[item.id]) item.priceLabel = overrides[item.id];
  });
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function notFoundPage() {
  setMeta("Page Not Found | CPMG", "The requested CPMG page could not be found.");
  app.innerHTML = `${pageHeader({ eyebrow: "404", title: "Page Not Found", text: "The page may have moved. You can return home, book a service or contact CPMG.", primary: "Book Now", secondary: "Contact CPMG" })}`;
}

function injectSchema(path, item) {
  document.querySelectorAll("[data-schema]").forEach((node) => node.remove());
  const schema = [
    { "@context": "https://schema.org", "@type": "Organization", name: "Crown Property Management Group Ltd", alternateName: "CPMG", url: contact.domain, email: contact.email, telephone: contact.phone, address: contact.office },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: path.split("/").filter(Boolean).map((part, index, array) => ({ "@type": "ListItem", position: index + 1, name: part.replaceAll("-", " "), item: `${contact.domain}/${array.slice(0, index + 1).join("/")}` })) }
  ];
  if (item) {
    schema.push({ "@context": "https://schema.org", "@type": "Service", name: item.title, description: item.metaDescription, provider: { "@type": "Organization", name: "CPMG" }, areaServed: contact.serviceArea });
    schema.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: item.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) });
  }
  schema.forEach((entry) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.schema = "true";
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  });
}

render();
