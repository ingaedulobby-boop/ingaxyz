import { Helmet } from "react-helmet-async";
import ContactSection from "@/components/sections/ContactSection";

const SITE_URL = "https://ingaxyz.lovable.app";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Inga Kali | Get in Touch</title>
        <meta name="description" content="Have a project in mind? Want to collaborate at the intersection of AI and UX? Get in touch." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
        <meta property="og:title" content="Contact — Inga Kali | Get in Touch" />
        <meta property="og:description" content="Ready to collaborate? Get in touch for AI engineering and UX design projects." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact — Inga Kali" />
        <meta name="twitter:description" content="Get in touch for AI & UX collaboration." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <ContactSection />
      </div>
    </>
  );
}
