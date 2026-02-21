import { Helmet } from "react-helmet-async";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkWithMeSection from "@/components/sections/WorkWithMeSection";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — Inga Kali | AI & UX Consulting</title>
        <meta name="description" content="AI engineering, UX consulting, research & testing, and rapid AI prototyping services." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 space-y-14 sm:space-y-20">
        <WorkWithMeSection />
        <ServicesSection />
      </div>
    </>
  );
}
