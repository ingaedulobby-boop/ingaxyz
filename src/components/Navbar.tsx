import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-strong shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-mono text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            Inga<span className="text-primary">.xyz</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className={`px-3 py-2 rounded-lg font-mono text-sm transition-colors ${
                  pathname === href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center active:bg-secondary transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
              {navLinks.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={href}
                    className={`w-full max-w-xs flex items-center justify-center px-6 py-4 rounded-2xl font-mono text-base font-medium transition-colors ${
                      pathname === href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-secondary/50 active:bg-secondary"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-6 flex justify-center">
              <p className="font-mono text-xs text-muted-foreground">
                AI × UX Portfolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
