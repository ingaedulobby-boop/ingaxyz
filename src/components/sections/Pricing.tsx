import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$2,499",
    period: "/mo",
    desc: "For teams beginning their AI governance journey.",
    features: [
      "Up to 10 AI models tracked",
      "NIST AI RMF compliance",
      "Basic risk dashboard",
      "Audit trail (90 days)",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$7,999",
    period: "/mo",
    desc: "For organizations scaling AI with confidence.",
    features: [
      "Unlimited models",
      "All compliance frameworks",
      "Advanced risk analytics",
      "Full audit trail",
      "Policy automation",
      "Bias & drift monitoring",
      "Priority support + SLA",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For regulated industries with complex requirements.",
    features: [
      "Everything in Professional",
      "Custom framework support",
      "On-premise deployment",
      "Dedicated success team",
      "Red team security testing",
      "Custom integrations",
      "24/7 support + SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Plans that scale with your <span className="text-gradient">AI ambitions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start small, grow fast. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlighted
                  ? "border-primary/50 glow-primary bg-card"
                  : "bg-card/50 border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
