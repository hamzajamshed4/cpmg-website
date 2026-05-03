const contact = {
  phone: "02039322723",
  phoneHref: "tel:02039322723",
  email: "Info@cpmanagementgroup.co.uk",
  careersEmail: "Info@cpmanagementgroup.co.uk",
  office: "56 Daventry Road, Bristol, England, BS4 1DQ",
  hours: "Monday to Sunday: 7:00am to 8:00pm"
};

const badges = ["Fully Insured", "DBS Checked", "5-Star Service", "Fast Response", "Same-Day Availability Where Possible", "Satisfaction Guarantee"];
const benefits = ["Experienced team", "Fully insured", "DBS-checked staff where applicable", "Eco-friendly products where possible", "Transparent pricing", "Fast response", "Domestic and commercial specialists", "Satisfaction-focused service"];
const sectors = ["Offices", "Apartment blocks", "Letting agents", "Landlords", "Property managers", "Retail premises", "New-build sites", "Commercial estates"];
const testimonials = [
  { name: "Property manager", quote: "CPMG gave us a clear quote, attended when agreed and kept communal areas to a professional standard." },
  { name: "Domestic customer", quote: "The team were polite, careful and thorough. The end result felt fresh without any fuss." },
  { name: "Facilities client", quote: "Reliable communication and a practical approach to cleaning, grounds care and urgent property support." }
];

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
      `${title} from CPMG is available for domestic and commercial customers where suitable across the UK.`,
      "Final prices may vary depending on property size, condition, location, access and service requirements. CPMG will confirm the final quote before work begins."
    ],
    galleryImages: [image, category === "domestic" ? serviceImages.garden : serviceImages.commercial, serviceImages.waste],
    testimonial: testimonials[0],
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
    { q: "Are staff insured?", a: "CPMG positions its work around professional, insured service delivery, with DBS-checked workers where applicable." }
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
  app.focus();
  bindForms();
  bindWizard();
  bindAdmin();
  injectSchema(path, serviceMatch);
}

function setMeta(title, description) {
  document.title = title;
  document.querySelector("meta[name='description']").setAttribute("content", description);
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

function trustBadges() {
  return `<div class="trust-row">${badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}</div>`;
}

function homePage() {
  setMeta("CPMG | Professional Cleaning & Property Maintenance Services Across the UK", "Book domestic cleaning, commercial cleaning, maintenance, grounds care, waste removal and property support services with Crown Property Management Group Ltd.");
  app.innerHTML = `${hero({
    eyebrow: "Crown Property Management Group Ltd",
    title: "Professional Cleaning & Property Maintenance Services Across the UK",
    text: "CPMG provides reliable domestic and commercial cleaning, maintenance, grounds care, waste removal and property support services for homes, landlords, businesses and property managers.",
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
  ${testimonialSection()}
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
      <span class="service-price">${item.priceLabel}</span>
      <p><a class="button outline" href="/services/${item.category}/${item.slug}" data-link>Learn More</a></p>
    </div>
  </article>`;
}

function categoryPage(category) {
  const isDomestic = category === "domestic";
  const list = services.filter((item) => item.category === category);
  setMeta(`${isDomestic ? "Domestic" : "Commercial"} Services | CPMG`, `${isDomestic ? "Domestic cleaning and garden support" : "Commercial cleaning and property maintenance"} services from Crown Property Management Group Ltd.`);
  app.innerHTML = `${hero({
    eyebrow: isDomestic ? "Domestic services" : "Commercial services",
    title: isDomestic ? "Reliable Domestic Cleaning & Garden Services" : "Commercial Cleaning & Property Maintenance Support",
    text: isDomestic ? "Book professional carpet cleaning, end of tenancy cleaning, deep cleaning and outdoor property support for homes across the UK." : "Request quotes for cleaning, fire alarm callouts, grounds care, waste removal and property support for businesses and managed sites.",
    primary: isDomestic ? "Book Domestic Service" : "Request a Commercial Quote",
    secondary: "Speak to CPMG",
    image: isDomestic ? serviceImages.domestic : serviceImages.commercial,
    compact: true
  })}
  <section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">${category}</span><h2>${isDomestic ? "Domestic service range" : "Commercial service range"}</h2></div><p>${isDomestic ? "Clear from prices are shown where practical." : "Commercial jobs are priced around site specification, frequency, access and urgency."}</p></div>
    <div class="grid ${isDomestic ? "two" : "three"}">${list.map(serviceCard).join("")}</div>
  </div></section>
  ${gallerySection()}
  ${isDomestic ? whyChoose() : sectorSection()}
  ${cta(isDomestic ? "Book a Domestic Service With CPMG" : "Request a Commercial Quote", isDomestic ? "Choose your preferred service and send your property details in a few steps." : "Send your site details and CPMG will confirm the right specification and quote.", isDomestic ? "Book This Service" : "Request a Quote", "Contact CPMG")}`;
}

function servicePage(item) {
  setMeta(item.metaTitle, item.metaDescription);
  const related = services.filter((other) => other.category === item.category && other.slug !== item.slug).slice(0, 3);
  app.innerHTML = `${hero({
    eyebrow: item.category,
    title: item.title,
    text: item.heroSubtitle,
    primary: item.ctaButtonText,
    secondary: "Speak to CPMG",
    image: item.heroImage,
    compact: true
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

function testimonialSection() {
  return `<section class="section"><div class="section-inner">
    <div class="section-head"><div><span class="eyebrow">Testimonials</span><h2>Service-focused feedback</h2></div></div>
    <div class="grid three">${testimonials.map((item) => `<article class="card testimonial"><div class="card-body"><p>"${item.quote}"</p><strong>${item.name}</strong></div></article>`).join("")}</div>
  </div></section>`;
}

function cta(title, text, primary, secondary) {
  return `<section class="section"><div class="section-inner quote-band"><h2>${title}</h2><p>${text}</p><div class="actions"><a class="button primary" href="/booking" data-link>${primary}</a><a class="button outline" href="/contact" data-link>${secondary}</a></div></div></section>`;
}

function bookingPage() {
  setMeta("Book a Service | CPMG", "Use the CPMG booking wizard to request a domestic or commercial cleaning, maintenance or property support service.");
  app.innerHTML = `${hero({ eyebrow: "Booking", title: "Book a Service or Request a Quote", text: "Prices are shown as from prices or quote-based. CPMG will confirm the final quote before work begins.", compact: true })}
  <section class="section"><div class="section-inner wizard" data-wizard></div></section>`;
}

let bookingState = { step: 1, service: "", name: "", email: "", phone: "", address: "", postcode: "", propertyType: "", notes: "", date: "", time: "", urgency: "Flexible", consent: false };

function bindWizard() {
  const wizard = document.querySelector("[data-wizard]");
  if (!wizard) return;
  renderWizard(wizard);
}

function renderWizard(wizard) {
  wizard.innerHTML = `<div class="wizard-steps">${[1,2,3,4].map((i) => `<span class="${bookingState.step >= i ? "active" : ""}"></span>`).join("")}</div>${wizardStep()}<p class="muted">Final prices may vary depending on property size, condition, location, access, and service requirements. CPMG will confirm the final quote before work begins.</p>`;
  wizard.querySelectorAll("[data-service]").forEach((button) => button.addEventListener("click", () => { bookingState.service = button.dataset.service; bookingState.step = 2; renderWizard(wizard); }));
  wizard.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => { saveWizardFields(wizard); if (validateWizard(wizard)) { bookingState.step += 1; renderWizard(wizard); } }));
  wizard.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => { saveWizardFields(wizard); bookingState.step -= 1; renderWizard(wizard); }));
  const submit = wizard.querySelector("[data-submit-booking]");
  if (submit) submit.addEventListener("click", () => { saveWizardFields(wizard); if (!bookingState.consent) return alert("Please confirm consent before submitting."); saveLead("bookings", { ...bookingState, status: "new", createdAt: new Date().toISOString(), sourcePage: location.pathname }); wizard.innerHTML = successMessage("Booking request received. CPMG will contact you to confirm availability and the final quote."); });
}

function wizardStep() {
  if (bookingState.step === 1) return `<h2>Step 1: Select service</h2><div class="grid three">${services.map((item) => `<button class="select-card ${bookingState.service === item.id ? "selected" : ""}" data-service="${item.id}"><div class="card-body"><span class="eyebrow">${item.category}</span><h3>${item.title}</h3><p>${item.shortDescription}</p><span class="service-price">${item.priceLabel}</span></div></button>`).join("")}</div>`;
  if (bookingState.step === 2) return `<h2>Step 2: Property details</h2><div class="form-grid">${field("name","Full name",true)}${field("email","Email",true,"email")}${field("phone","Phone",true,"tel")}${field("address","Address",true)}${field("postcode","Postcode",true)}${selectField("propertyType","Property type",["House","Flat","Office","Retail premises","Apartment block","Commercial estate","Other"])}${field("notes","Notes",false,"textarea","full")}</div><div class="actions"><button class="outline" data-back>Back</button><button class="primary" data-next>Continue</button></div>`;
  if (bookingState.step === 3) return `<h2>Step 3: Date and time</h2><div class="form-grid">${field("date","Preferred date",true,"date")}${selectField("time","Preferred time slot",["Morning","Afternoon","Evening","Any time"])}${selectField("urgency","Urgency",["Flexible","This week","Same-day if available","Emergency / urgent"])}</div><div class="actions"><button class="outline" data-back>Back</button><button class="primary" data-next>Review</button></div>`;
  const item = services.find((serviceItem) => serviceItem.id === bookingState.service);
  return `<h2>Step 4: Review and submit</h2><div class="card"><div class="card-body"><p><strong>Service:</strong> ${item?.title || ""}</p><p><strong>Contact:</strong> ${bookingState.name}, ${bookingState.email}, ${bookingState.phone}</p><p><strong>Address:</strong> ${bookingState.address}, ${bookingState.postcode}</p><p><strong>Preferred slot:</strong> ${bookingState.date} / ${bookingState.time} / ${bookingState.urgency}</p><p><strong>Notes:</strong> ${bookingState.notes || "None supplied"}</p></div></div><label class="full"><input type="checkbox" name="consent" ${bookingState.consent ? "checked" : ""}> I consent to CPMG contacting me about this enquiry.</label><div class="actions"><button class="outline" data-back>Back</button><button class="primary" data-submit-booking>Submit Request</button></div>`;
}

function saveWizardFields(scope) {
  scope.querySelectorAll("input, select, textarea").forEach((input) => {
    bookingState[input.name] = input.type === "checkbox" ? input.checked : input.value;
  });
}

function validateWizard(scope) {
  const invalid = [...scope.querySelectorAll("[required]")].find((input) => !input.value.trim());
  if (invalid) { invalid.focus(); return false; }
  return true;
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
  app.innerHTML = `${hero({ eyebrow: "Contact", title: "Speak to CPMG Today", text: "Send a general enquiry, quote request or service question and the CPMG team will respond as soon as possible.", compact: true })}
  <section class="section"><div class="section-inner split">
    ${contactForm()}
    <aside class="quote-band"><h2>Contact information</h2><p><strong>Phone:</strong> ${contact.phone}</p><p><strong>Email:</strong> ${contact.email}</p><p><strong>Headquarters:</strong> ${contact.office}</p><p><strong>Coverage:</strong> UK-wide service availability.</p><p><strong>Opening hours:</strong> ${contact.hours}</p></aside>
  </div></section>`;
}

function contactForm() {
  return `<form class="form" data-lead-form="enquiries"><h2>General enquiry</h2><div class="form-grid">
    <label>Full name<input name="name" required><span class="error"></span></label>
    <label>Email<input name="email" type="email" required><span class="error"></span></label>
    <label>Phone<input name="phone" type="tel"><span class="error"></span></label>
    <label>Service interested in<select name="serviceInterest">${services.map((item) => `<option>${item.title}</option>`).join("")}<option>Other</option></select></label>
    <label class="full">Message<textarea name="message" required></textarea><span class="error"></span></label>
    <input type="text" name="companyWebsite" hidden tabindex="-1" autocomplete="off">
  </div><button class="primary">Submit Enquiry</button></form>`;
}

function aboutPage() {
  setMeta("About CPMG | Crown Property Management Group Ltd", "Learn about Crown Property Management Group Ltd, a UK property services company providing domestic and commercial cleaning, maintenance and support.");
  app.innerHTML = `${hero({ eyebrow: "About CPMG", title: "Professional Property Support for Homes, Landlords and Businesses", text: "Crown Property Management Group Ltd was created to provide reliable, professional and flexible property support services across the UK.", compact: true })}
  <section class="section"><div class="section-inner split"><div><h2>Company overview</h2><p>CPMG provides cleaning, maintenance, grounds care, waste removal and related property services across domestic and commercial sectors. The company focuses on insured work, DBS-checked workers where applicable, fast response and clear communication.</p><p>From one-off domestic cleans to recurring commercial property support, CPMG helps customers keep spaces clean, safe and presentable.</p></div><div class="grid two"><div class="mini-kpi"><strong>UK-wide</strong><p>Service coverage focus</p></div><div class="mini-kpi"><strong>Insured</strong><p>Professional delivery model</p></div><div class="mini-kpi"><strong>Domestic + Commercial</strong><p>Flexible property support</p></div><div class="mini-kpi"><strong>5-star focus</strong><p>Satisfaction-led service</p></div></div></div></section>
  ${gallerySection()}${whyChoose()}${testimonialSection()}${cta("Ready for a Cleaner, Safer Property?", "Book a service or speak to CPMG about your property support requirements.", "Book Now", "Contact CPMG")}`;
}

function careersPage() {
  setMeta("Work With CPMG | Careers", "Apply to work with Crown Property Management Group Ltd across cleaning, maintenance, grounds care, waste removal and property support roles.");
  app.innerHTML = `${hero({ eyebrow: "Work With Us", title: "Work With CPMG", text: "Join Crown Property Management Group Ltd and become part of a growing UK property services team.", compact: true })}
  <section class="section"><div class="section-inner split">
    <div><h2>Who we are</h2><p>CPMG provides cleaning, maintenance, grounds care, waste removal and property support services across domestic and commercial sectors.</p><h2>Benefits</h2><ul class="list"><li>Training and PPE</li><li>Flexible hours</li><li>Growth opportunities</li><li>Domestic and commercial work</li><li>Supportive team</li><li>UK-wide opportunities</li></ul><p class="muted">With your consent, applications may be stored for up to 12 months for suitable future opportunities.</p></div>
    <form class="form" data-lead-form="careers"><h2>Application form</h2><div class="form-grid">
      <label>Full name<input name="fullName" required><span class="error"></span></label>
      <label>Phone<input name="phone" type="tel" required><span class="error"></span></label>
      <label>Email<input name="email" type="email" required><span class="error"></span></label>
      <label>Postcode<input name="postcode" required><span class="error"></span></label>
      <label class="full">Full address<input name="address" required><span class="error"></span></label>
      <label>Service/role interested in<select name="roleInterestedIn"><option>Cleaner</option><option>Maintenance worker</option><option>Grounds worker</option><option>Waste removal operative</option><option>Property service staff</option></select></label>
      <label>Right to work in UK<select name="rightToWork"><option>Yes</option><option>No</option></select></label>
      <label>Earliest start date<input name="earliestStartDate" type="date"></label>
      <label class="full">Days/hours available<input name="availability" required><span class="error"></span></label>
      <label class="full">Short message<textarea name="message"></textarea></label>
      <label class="full">CV upload<input name="cvFile" type="file" accept=".pdf,.doc,.docx"><span class="error"></span></label>
      <label class="full"><input name="privacyConsent" type="checkbox" required> I consent to CPMG storing my application for recruitment purposes for up to 12 months.</label>
      <input type="text" name="companyWebsite" hidden tabindex="-1" autocomplete="off">
    </div><button class="primary">Submit Application</button></form>
  </div></section>`;
}

function bindForms() {
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.companyWebsite?.value) return;
      const file = form.cvFile?.files?.[0];
      if (file && (!/\.(pdf|doc|docx)$/i.test(file.name) || file.size > 5 * 1024 * 1024)) {
        form.cvFile.closest("label").querySelector(".error").textContent = "Upload a PDF, DOC or DOCX file up to 5MB.";
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      data.status = "new";
      data.createdAt = new Date().toISOString();
      if (form.dataset.leadForm === "careers") {
        data.consentTimestamp = new Date().toISOString();
        const retention = new Date();
        retention.setMonth(retention.getMonth() + 12);
        data.retentionDeleteAt = retention.toISOString();
        data.cvFileUrl = file ? file.name : "";
      }
      saveLead(form.dataset.leadForm, data);
      form.outerHTML = successMessage(form.dataset.leadForm === "careers" ? "Application received. CPMG will contact you if your experience matches current or future opportunities." : "Enquiry received. CPMG will respond as soon as possible.");
    });
  });
}

function saveLead(key, data) {
  const existing = JSON.parse(localStorage.getItem(`cpmg_${key}`) || "[]");
  existing.push({ id: crypto.randomUUID(), ...data });
  localStorage.setItem(`cpmg_${key}`, JSON.stringify(existing));
}

function successMessage(text) {
  return `<div class="success" role="status">${text}</div>`;
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
  return `${hero({ eyebrow: "Legal", title, text: "Important information for customers, applicants and commercial clients.", compact: true })}
  <section class="section"><article class="section-inner legal">${sections.map(([heading, body]) => `<h2>${heading}</h2><p>${body}</p>`).join("")}</article></section>`;
}

function adminPage() {
  setMeta("CPMG Admin MVP", "Local MVP admin panel for service and lead review.");
  app.innerHTML = `${hero({ eyebrow: "Admin MVP", title: "Service Catalogue & Lead Capture", text: "This local MVP shows the data model, editable service catalogue pattern and captured lead records stored in browser localStorage.", compact: true })}
  <section class="section"><div class="section-inner admin-panel">
    <h2>Manage services and prices</h2>
    <form class="grid three" data-service-admin>${services.map((item) => `<label class="card"><span class="card-body"><strong>${item.title}</strong><span class="muted">${item.category}</span><input name="${item.id}" value="${item.priceLabel}" aria-label="${item.title} price label"></span></label>`).join("")}<button class="primary full">Save service prices</button></form>
    <h2>Captured leads</h2><div data-admin-leads></div>
    <div class="actions"><button class="outline" data-export>Export leads as CSV</button></div>
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
  app.innerHTML = `${hero({ eyebrow: "404", title: "Page Not Found", text: "The page may have moved. You can return home, book a service or contact CPMG.", compact: true })}`;
}

function injectSchema(path, item) {
  document.querySelectorAll("[data-schema]").forEach((node) => node.remove());
  const schema = [
    { "@context": "https://schema.org", "@type": "Organization", name: "Crown Property Management Group Ltd", alternateName: "CPMG", url: "https://cpmg.co.uk", email: contact.email, address: contact.office },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: path.split("/").filter(Boolean).map((part, index, array) => ({ "@type": "ListItem", position: index + 1, name: part.replaceAll("-", " "), item: `https://cpmg.co.uk/${array.slice(0, index + 1).join("/")}` })) }
  ];
  if (item) {
    schema.push({ "@context": "https://schema.org", "@type": "Service", name: item.title, description: item.metaDescription, provider: { "@type": "Organization", name: "CPMG" }, areaServed: "United Kingdom" });
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
