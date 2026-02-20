import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const CTA = () => {
  return (
    <section id="cta" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl border border-primary/20 bg-card/80 p-10 sm:p-16 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/8 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <Shield className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to govern your AI <span className="text-gradient">responsibly</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join leading enterprises that trust AI GOV to keep their AI systems compliant, transparent, and secure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="glow-primary text-base px-8">
                Schedule a Demo <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
