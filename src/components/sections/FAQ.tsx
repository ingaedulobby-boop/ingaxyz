import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What compliance frameworks does AI GOV support?",
    a: "We support NIST AI RMF, EU AI Act, ISO 42001, SOC 2, and custom frameworks. Our policy engine lets you encode any regulatory requirement into enforceable rules.",
  },
  {
    q: "How does bias detection work?",
    a: "Our Model Governance system runs continuous fairness audits across protected attributes. You get real-time alerts when bias metrics exceed your defined thresholds, plus automated remediation suggestions.",
  },
  {
    q: "Can I deploy AI GOV on-premise?",
    a: "Yes. Our Enterprise plan includes on-premise and air-gapped deployment options. We also support hybrid architectures where sensitive data stays in your infrastructure while dashboards run in our cloud.",
  },
  {
    q: "What's the implementation timeline?",
    a: "Most teams are up and running within 2 weeks for Starter, 4-6 weeks for Professional with full policy automation, and 8-12 weeks for Enterprise with custom integrations.",
  },
  {
    q: "How does the audit trail work?",
    a: "Every model decision, data access event, configuration change, and human override is logged in an immutable ledger. Audit reports can be exported in formats required by major regulatory bodies.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes! All plans include a 14-day free trial with full feature access. No credit card required for Starter. Enterprise trials include a dedicated onboarding specialist.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-lg px-5 bg-card/50 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
