import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkWithMeSection from "@/components/sections/WorkWithMeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import Taskbar from "@/components/Taskbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-32 space-y-12 -mt-12 relative z-10">
        <AboutSection />
        <WorkWithMeSection />
        <ProjectsSection />
        <ServicesSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Taskbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "AI × UX Professional",
            jobTitle: "AI Engineer & UX Designer",
            description: "Hybrid professional bridging AI engineering and human-centered design.",
            url: "https://portfolio.example.com",
            knowsAbout: ["Machine Learning", "UX Design", "User Research", "AI Engineering"],
          }),
        }}
      />
    </div>
  );
};

export default Index;
