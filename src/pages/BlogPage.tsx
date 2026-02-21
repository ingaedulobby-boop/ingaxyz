import { Helmet } from "react-helmet-async";
import BlogSection from "@/components/sections/BlogSection";

const SITE_URL = "https://ingaxyz.lovable.app";

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Inga Kali Blog",
  url: `${SITE_URL}/blog`,
  description: "Thoughts on AI engineering, UX design, and the intersection of technology and human experience.",
  author: {
    "@type": "Person",
    name: "Inga Kaltak",
    url: SITE_URL,
  },
};

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Inga Kali | AI & Design Insights</title>
        <meta name="description" content="Latest thoughts on AI engineering, UX design, and the intersection of technology and human experience." />
        <link rel="canonical" href={`${SITE_URL}/blog`} />

        <meta property="og:type" content="blog" />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:title" content="Blog — Inga Kali | AI & Design Insights" />
        <meta property="og:description" content="Thoughts on AI engineering, UX design, and human-centered technology." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog — Inga Kali" />
        <meta name="twitter:description" content="AI engineering, UX design, and human-centered technology insights." />

        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <BlogSection />
      </div>
    </>
  );
}
