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
        <HeroSection />

        <main className="relative z-10 mx-auto max-w-5xl space-y-16 px-4 pb-32 sm:px-6 -mt-16">
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
