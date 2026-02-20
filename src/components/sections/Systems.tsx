import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ShieldCheck, BarChart3, FileSearch, Workflow, Lock } from "lucide-react";

const systems = [
  {
    icon: ShieldCheck,
    title: "Compliance Engine",
    desc: "Automated compliance checks against NIST AI RMF, EU AI Act, ISO 42001, and custom frameworks.",
    tags: ["NIST", "EU AI Act", "ISO 42001"],
  },
  {
    icon: Brain,
    title: "Model Governance",
    desc: "Full lifecycle management—version control, bias detection, drift monitoring, and model cards.",
    tags: ["MLOps", "Bias Detection", "Monitoring"],
  },
  {
    icon: BarChart3,
    title: "Risk Dashboard",
    desc: "Real-time risk scoring and visual analytics across your entire AI portfolio.",
    tags: ["Analytics", "Risk Scoring", "Real-time"],
  },
  {
    icon: FileSearch,
    title: "Audit Trail",
    desc: "Immutable audit logs for every model decision, data access, and system change.",
    tags: ["Logging", "Traceability", "Reports"],
  },
  {
    icon: Workflow,
    title: "Policy Automation",
    desc: "Translate governance policies into enforceable rules across your ML pipeline.",
    tags: ["Automation", "Rules Engine", "CI/CD"],
  },
  {
    icon: Lock,
    title: "Security Hardening",
    desc: "Adversarial testing, prompt injection defense, and data privacy controls built in.",
    tags: ["Red Team", "Privacy", "Defense"],
  },
];

const Systems = () => {
  return (
    <section id="systems" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Core Systems</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Everything you need for <span className="text-gradient">AI governance</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Modular systems that work together to keep your AI compliant, transparent, and secure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {systems.map(({ icon: Icon, title, desc, tags }) => (
            <Card
              key={title}
              className="bg-card/50 border-border hover:border-primary/30 transition-all duration-300 group hover:glow-primary"
            >
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Systems;
