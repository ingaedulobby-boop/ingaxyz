import { Helmet } from "react-helmet-async";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkWithMeSection from "@/components/sections/WorkWithMeSection";

const SITE_URL = "https://ingaxyz.lovable.app";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "Person",
    name: "Inga Kaltak",
    url: SITE_URL,
  },
  serviceType: "AI Engineering & UX Design Consulting",
  description: "AI engineering, UX consulting, research & testing, and rapid AI prototyping services.",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Engineering", description: "End-to-end ML model development, from data pipelines to production deployment." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "UX Consulting", description: "Human-centered design for AI products." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Research & Testing", description: "User research, A/B testing, and data analysis." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Prototyping", description: "Rapid prototypes that bring AI concepts to life." } },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — Inga Kali | AI & UX Consulting</title>
        <meta name="description" content="AI engineering, UX consulting, research & testing, and rapid AI prototyping services." />
        <link rel="canonical" href={`${SITE_URL}/services`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/services`} />
        <meta property="og:title" content="Services — Inga Kali | AI & UX Consulting" />
        <meta property="og:description" content="AI engineering, UX consulting, research & testing, and rapid AI prototyping." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services — Inga Kali" />
        <meta name="twitter:description" content="AI engineering, UX consulting, and rapid prototyping services." />

        <script type="application/ld+json">{JSON.stringify(servicesJsonLd)}</script>
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 space-y-14 sm:space-y-20">
        <WorkWithMeSection />
        <ServicesSection />
      </div>
    </>
  );
}
