import { Helmet } from "react-helmet-async";
import ProjectsSection from "@/components/sections/ProjectsSection";

const SITE_URL = "https://ingaxyz.lovable.app";

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects — Inga Kali",
  url: `${SITE_URL}/projects`,
  description: "Real-world AI and UX case studies including health companion apps, document parsers, and accessibility tools.",
  author: {
    "@type": "Person",
    name: "Inga Kaltak",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects — Inga Kali | Case Studies</title>
        <meta name="description" content="Real-world AI and UX case studies including health companion apps, document parsers, and accessibility tools." />
        <link rel="canonical" href={`${SITE_URL}/projects`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/projects`} />
        <meta property="og:title" content="Projects — Inga Kali | AI & UX Case Studies" />
        <meta property="og:description" content="Real-world AI and UX case studies — health companion, document parser, accessibility tool." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects — Inga Kali" />
        <meta name="twitter:description" content="AI & UX case studies and portfolio projects." />

        <script type="application/ld+json">{JSON.stringify(projectsJsonLd)}</script>
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <ProjectsSection />
      </div>
    </>
  );
}
