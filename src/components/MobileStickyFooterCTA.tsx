import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ctas: Record<string, { label: string; to: string } | undefined> = {
  "/": { label: "View Projects", to: "/projects" },
  "/about": { label: "Work With Me", to: "/services" },
  "/services": { label: "Get in Touch", to: "/contact" },
  "/projects": { label: "Get in Touch", to: "/contact" },
  "/blog": { label: "Get in Touch", to: "/contact" },
};

export default function MobileStickyFooterCTA() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  const cta = ctas[pathname];

  if (!isMobile || !cta) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-bottom bg-background/90 backdrop-blur-xl border-t border-border"
      >
        <Link
          to={cta.to}
          className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-primary text-primary-foreground font-mono font-semibold text-sm shadow-lg active:scale-[0.98] transition-transform"
        >
          {cta.label}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
