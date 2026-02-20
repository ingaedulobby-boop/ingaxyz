import { Shield, ArrowRight, Lock, Eye, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 text-primary">
          <Shield className="w-3.5 h-3.5 mr-1.5" />
          Policy-to-Production™ AI Governance
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          AI systems built for
          <br />
          <span className="text-gradient">governance & trust</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Enterprise-grade AI compliance, risk management, and security frameworks.
          From policy design to production deployment—auditable, explainable, secure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="glow-primary text-base px-8" onClick={() => document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" })}>
            Schedule Demo <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8" onClick={() => document.querySelector("#systems")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Systems
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-muted-foreground">
          {[
            { icon: Lock, label: "SOC 2 Compliant" },
            { icon: Eye, label: "Full Auditability" },
            { icon: Scale, label: "EU AI Act Ready" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
