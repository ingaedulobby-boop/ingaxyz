import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Wrench, FileText, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useWindowManager } from "@/components/window-system/WindowManagerContext";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Briefcase, label: "Work", href: "#work-with-me" },
  { icon: FolderOpen, label: "Projects", href: "#projects" },
  { icon: Wrench, label: "Services", href: "#services" },
  { icon: FileText, label: "Blog", href: "#blog" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const Taskbar = () => {
  const { minimizedWindows, restoreWindow } = useWindowManager();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-2 rounded-2xl glass-strong shadow-2xl"
    >
      {navItems.map(({ icon: Icon, label, href }) => (
        <button
          key={label}
          onClick={() => scrollTo(href)}
          className="group relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl 
                     hover:bg-secondary transition-colors duration-200"
          aria-label={label}
        >
          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="transition-colors hidden sm:block text-center font-mono text-[10px] text-muted-foreground group-hover:text-foreground">
            {label}
          </span>
        </button>
      ))}

      {/* Minimized windows separator + restore buttons */}
      <AnimatePresence>
        {minimizedWindows.length > 0 && (
          <>
            <div className="w-px h-8 bg-border mx-1" />
            {minimizedWindows.map((w) => (
              <motion.button
                key={w.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => {
                  restoreWindow(w.id);
                  const el = document.getElementById(w.id);
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                aria-label={`Restore ${w.title}`}
              >
                {w.title}
              </motion.button>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="w-px h-8 bg-border mx-1" />
      <ThemeToggle />
    </motion.nav>
  );
};

export default Taskbar;
