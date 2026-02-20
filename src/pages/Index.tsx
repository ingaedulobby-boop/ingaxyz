import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkWithMeSection from "@/components/sections/WorkWithMeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import Taskbar from "@/components/Taskbar";

export default function Index() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "AI × UX Professional",
    jobTitle: "AI Engineer & UX Designer",
    description:
      "Hybrid professional bridging AI engineering and human-centered design.",
    url: "https://portfolio.example.com",
    knowsAbout: [
      "Machine Learning",
      "UX Design",
      "User Research",
      "AI Engineering",
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Ambient background glow */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-primary/[0.07] blur-[120px] animate-[float_12s_ease-in-out_infinite]" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-accent/[0.07] blur-[120px] animate-[float_15s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/[0.04] blur-[100px] animate-[pulse-glow_8s_ease-in-out_infinite]" />
        </div>

        <HeroSection />

        <main className="relative z-10 mx-auto max-w-5xl space-y-10 sm:space-y-16 px-3 sm:px-6 pb-24 sm:pb-32 -mt-16">
          <AboutSection />
          <WorkWithMeSection />
          <ProjectsSection />
          <ServicesSection />
          <BlogSection />
          <ContactSection />
        </main>

        <Taskbar />
      </div>
    </>
  );
}
