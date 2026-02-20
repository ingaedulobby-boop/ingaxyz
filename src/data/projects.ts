export interface Project {
  slug: string;
  title: string;
  tag: string;
  color: "primary" | "accent";
  heroImage: string;
  problem: string;
  solution: string;
  outcome: string;
  role: string;
  duration: string;
  tools: string[];
  narrative: string[];
  results: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "ai-health-companion",
    title: "AI Health Companion",
    tag: "AI + UX",
    color: "primary",
    heroImage: "/src/assets/project-health.jpg",
    problem: "Patients struggled to understand AI-generated health insights.",
    solution:
      "Designed an empathetic conversational UI with progressive disclosure of medical data.",
    outcome: "72% increase in user engagement, 4.8★ app rating.",
    role: "Lead AI/UX Designer",
    duration: "6 months",
    tools: ["TensorFlow", "Figma", "React Native", "Python", "GPT-4"],
    narrative: [
      "Healthcare AI tools are powerful—but most patients find them intimidating. Raw lab results, probability scores, and clinical jargon create anxiety rather than clarity. Our challenge: make an AI health assistant that feels like a caring friend, not a cold algorithm.",
      "I led the design and engineering of a conversational interface that translates complex medical data into plain-language insights. The AI uses progressive disclosure—starting with a simple summary, then offering deeper details only when the user asks. Every response is framed with empathy-first language patterns validated through user research.",
      "We ran 40+ user interviews and A/B tested three conversation frameworks. The final design uses a 'traffic light' system for health metrics, animated micro-interactions for positive reinforcement, and a 'worry scale' that adjusts AI tone based on detected user anxiety.",
    ],
    results: [
      { label: "User Engagement", value: "+72%" },
      { label: "App Store Rating", value: "4.8★" },
      { label: "Daily Active Users", value: "15K+" },
      { label: "Anxiety Reduction", value: "38%" },
    ],
  },
  {
    slug: "smart-document-parser",
    title: "Smart Document Parser",
    tag: "ML Engineering",
    color: "accent",
    heroImage: "/src/assets/project-document.jpg",
    problem: "Manual document processing took analysts 6+ hours daily.",
    solution:
      "Built a transformer-based NLP pipeline with a drag-and-drop interface for non-technical users.",
    outcome:
      "90% reduction in processing time, adopted by 3 enterprise clients.",
    role: "ML Engineer & Frontend Lead",
    duration: "8 months",
    tools: ["PyTorch", "Hugging Face", "React", "FastAPI", "Docker"],
    narrative: [
      "Enterprise analysts were drowning in paperwork—invoices, contracts, compliance forms. Each document required manual extraction of key fields, cross-referencing, and data entry. The process was error-prone and soul-crushing.",
      "I architected an end-to-end document intelligence pipeline. A fine-tuned LayoutLM model handles document understanding, while a custom NER module extracts entities with 96% accuracy. The frontend features a drag-and-drop canvas where users can review and correct extractions in real-time.",
      "The key innovation was our 'confidence heatmap'—extracted fields are color-coded by model confidence, letting analysts focus review time on uncertain extractions rather than checking everything manually. This human-in-the-loop approach maintained accuracy while dramatically reducing effort.",
    ],
    results: [
      { label: "Processing Time", value: "-90%" },
      { label: "Extraction Accuracy", value: "96%" },
      { label: "Enterprise Clients", value: "3" },
      { label: "Documents/Day", value: "2,000+" },
    ],
  },
  {
    slug: "accessibility-audit-tool",
    title: "Accessibility Audit Tool",
    tag: "Research + Design",
    color: "primary",
    heroImage: "/src/assets/project-accessibility.jpg",
    problem: "Web teams lacked actionable accessibility insights.",
    solution:
      "Created an AI-powered scanner with clear remediation steps and severity scoring.",
    outcome: "Used by 200+ teams, improved WCAG compliance by 60%.",
    role: "UX Researcher & AI Engineer",
    duration: "5 months",
    tools: ["Puppeteer", "TensorFlow.js", "Next.js", "Figma", "axe-core"],
    narrative: [
      "Most accessibility tools dump a wall of technical violations on developers. The result? Teams feel overwhelmed, fix a few easy issues, and ignore the rest. True accessibility requires understanding impact, not just compliance.",
      "I designed and built a scanner that goes beyond WCAG checklists. It uses computer vision to detect visual accessibility issues (low contrast in images, missing focus indicators) and NLP to evaluate content readability. Each finding includes a severity score, affected user groups, and step-by-step remediation.",
      "The dashboard tells a story: it shows teams their accessibility journey over time, celebrates improvements, and prioritizes remaining issues by real-world user impact rather than technical severity. Gamification elements like 'accessibility streaks' keep teams motivated.",
    ],
    results: [
      { label: "Teams Using It", value: "200+" },
      { label: "WCAG Compliance", value: "+60%" },
      { label: "Avg Fix Time", value: "-45%" },
      { label: "User Satisfaction", value: "4.7★" },
    ],
  },
];
