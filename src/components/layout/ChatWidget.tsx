import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
}

const botResponses: Record<string, string> = {
  pricing: "We offer three tiers: Starter ($2,499/mo), Professional ($7,999/mo), and Enterprise (custom). Visit the pricing section for details!",
  compliance: "AI GOV covers NIST AI RMF, EU AI Act, ISO 42001, and SOC 2 frameworks. All systems include continuous compliance monitoring.",
  demo: "We'd love to show you a demo! Click 'Get Started' to schedule a personalized walkthrough with our team.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("cost")) return botResponses.pricing;
  if (lower.includes("compliance") || lower.includes("regulation") || lower.includes("framework")) return botResponses.compliance;
  if (lower.includes("demo") || lower.includes("trial")) return botResponses.demo;
  return "Thanks for your question! For detailed inquiries, please reach out via the contact section or schedule a demo. I can help with questions about pricing, compliance frameworks, and demos.";
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm the AI GOV assistant. Ask me about our systems, pricing, or compliance frameworks." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg.text) }]);
    }, 600);
  };

  return (
    <>
      {/* Trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[28rem] rounded-xl border border-border bg-card flex flex-col shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
            <span className="text-sm font-semibold">AI GOV Assistant</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask a question..."
              className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
            />
            <Button size="icon" onClick={send} className="shrink-0 h-9 w-9">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
