import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Systems from "@/components/sections/Systems";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/layout/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />
        <Systems />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
      <ChatWidget />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "AI GOV",
            applicationCategory: "BusinessApplication",
            description: "Enterprise AI governance, compliance, and security platform. Policy-to-Production™.",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "2499",
              highPrice: "7999",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </div>
  );
};

export default Index;
