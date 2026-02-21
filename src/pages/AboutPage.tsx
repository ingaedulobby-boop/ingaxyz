import { Helmet } from "react-helmet-async";
import AboutSection from "@/components/sections/AboutSection";

const SITE_URL = "https://ingaxyz.lovable.app";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Inga Kali | AI Engineer & UX Designer</title>
        <meta name="description" content="Hybrid AI engineer and UX designer bridging machine learning with human-centered design. Learn about my skills and approach." />
        <link rel="canonical" href={`${SITE_URL}/about`} />

        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:title" content="About — Inga Kali | AI Engineer & UX Designer" />
        <meta property="og:description" content="Hybrid AI engineer and UX designer bridging machine learning with human-centered design." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About — Inga Kali" />
        <meta name="twitter:description" content="AI engineer & UX designer bridging ML with human-centered design." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <AboutSection />
      </div>
    </>
  );
}
