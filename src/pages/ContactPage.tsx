import { Helmet } from "react-helmet-async";
import ContactSection from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Inga Kali | Get in Touch</title>
        <meta name="description" content="Have a project in mind? Want to collaborate at the intersection of AI and UX? Get in touch." />
      </Helmet>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
        <ContactSection />
      </div>
    </>
  );
}
