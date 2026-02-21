import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-mono text-lg font-bold text-foreground">
              Inga<span className="text-primary">.xyz</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Bridging cutting-edge AI with human-centered design. From research to production.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground mb-4">Pages</h3>
            <ul className="space-y-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Inga Kali. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with care & AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
