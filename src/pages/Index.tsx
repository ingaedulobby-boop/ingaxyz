import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkWithMeSection from "@/components/sections/WorkWithMeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import Taskbar from "@/components/Taskbar";
import AIChatButton from "@/components/AIChatButton";
import AIChatWindow from "@/components/AIChatWindow";

const SITE_URL = "https://ingaxyz.lovable.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Inga Kaltak",
  jobTitle: "AI Engineer & UX Designer",
  description: "Hybrid professional bridging AI engineering and human-centered design.",
  url: SITE_URL,
  sameAs: [],
  knowsAbout: ["Machine Learning", "UX Design", "User Research", "AI Engineering", "Accessibility"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Inga Kaltak — AI × UX Portfolio",
  url: SITE_URL,
  description: "AI Engineer, UX Designer & Researcher portfolio showcasing projects at the intersection of AI and human-centered design.",
};

export default function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const handleToggleChat = useCallback(() => {
    setChatOpen((prev) => {
      if (!prev) setHasUnread(false);
      return !prev;
    });
  }, []);

  const handleNewMessage = useCallback(() => {
    if (!chatOpen) setHasUnread(true);
  }, [chatOpen]);

  return (
    <>
      <Helmet>
        <title>Inga Kaltak — AI Engineer × UX Designer × Researcher</title>
        <meta name="description" content="Building AI solutions people love to use. Bridging cutting-edge machine learning with human-centered design." />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Inga Kaltak — AI Engineer × UX Designer" />
        <meta property="og:description" content="Bridging cutting-edge AI with human-centered design." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Inga Kaltak — AI Engineer × UX Designer" />
        <meta name="twitter:description" content="AI solutions people love to use." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Ambient background glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-primary/[0.07] blur-[120px] animate-[float_12s_ease-in-out_infinite]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-accent/[0.07] blur-[120px] animate-[float_15s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/[0.04] blur-[100px] animate-[pulse-glow_8s_ease-in-out_infinite]" />
        </div>

        <HeroSection />

        <main className="relative z-10 mx-auto max-w-5xl space-y-14 sm:space-y-20 lg:space-y-24 section-px pb-28 sm:pb-36 -mt-16">
          <AboutSection />
          <WorkWithMeSection />
          <ProjectsSection />
          <ServicesSection />
          <BlogSection />
          <ContactSection />
        </main>

        <Taskbar />

        <AIChatButton isOpen={chatOpen} onClick={handleToggleChat} hasUnread={hasUnread} />
        <AIChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} onNewMessage={handleNewMessage} />
      </div>
    </>
  );
}
