import { Helmet } from "react-helmet-async";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects — Inga Kali | Case Studies</title>
        <meta name="description" content="Real-world AI and UX case studies including health companion apps, document parsers, and accessibility tools." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <ProjectsSection />
      </div>
    </>
  );
}
