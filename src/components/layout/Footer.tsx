import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold">
              AI <span className="text-primary">GOV</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#systems" className="hover:text-foreground transition-colors">Systems</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI GOV. Policy-to-Production™
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
