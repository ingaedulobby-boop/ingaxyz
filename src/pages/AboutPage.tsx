import { Helmet } from "react-helmet-async";
import AboutSection from "@/components/sections/AboutSection";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Inga Kali | AI Engineer & UX Designer</title>
        <meta name="description" content="Hybrid AI engineer and UX designer bridging machine learning with human-centered design. Learn about my skills and approach." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <AboutSection />
      </div>
    </>
  );
}
