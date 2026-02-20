import WindowPanel from "@/components/WindowPanel";
import { Github, Linkedin, Twitter, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        },
      });

      if (error) throw error;

      toast.success("Message sent! I'll get back to you soon.");
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WindowPanel title="contact.sh" id="contact">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
            Have a project in mind? Want to collaborate on something at the intersection of AI and UX? Drop me a line.
          </p>
          <div className="flex gap-3 sm:gap-4">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center 
                           hover:border-primary hover:text-primary active:bg-primary/10 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="name" className="font-mono text-xs text-muted-foreground block mb-1">name</label>
            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={formState.name}
              onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
              className="w-full px-4 py-3 sm:py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-sans text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-mono text-xs text-muted-foreground block mb-1">email</label>
            <input
              id="email"
              type="email"
              required
              maxLength={255}
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              className="w-full px-4 py-3 sm:py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-sans text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-xs text-muted-foreground block mb-1">message</label>
            <textarea
              id="message"
              rows={4}
              required
              maxLength={5000}
              value={formState.message}
              onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              className="w-full px-4 py-3 sm:py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground 
                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-sans text-sm resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-lg 
                       bg-primary text-primary-foreground font-mono font-semibold 
                       hover:glow-primary active:scale-[0.98] transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </WindowPanel>
  );
};

export default ContactSection;
