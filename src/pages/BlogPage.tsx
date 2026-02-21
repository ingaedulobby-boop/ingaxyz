import { Helmet } from "react-helmet-async";
import BlogSection from "@/components/sections/BlogSection";

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Inga Kali | AI & Design Insights</title>
        <meta name="description" content="Latest thoughts on AI engineering, UX design, and the intersection of technology and human experience." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <BlogSection />
      </div>
    </>
  );
}
