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
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 
                 flex items-center gap-0.5 sm:gap-1 
                 px-2 sm:px-4 py-1.5 sm:py-2 
                 rounded-2xl glass-strong shadow-2xl
                 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)]
                 overflow-x-auto scrollbar-none safe-bottom"
    >
      {navItems.map(({ icon: Icon, label, href }) => (
        <button
          key={label}
          onClick={() => scrollTo(href)}
          className="group relative flex flex-col items-center gap-0.5 
                     min-w-[2.5rem] sm:min-w-0
                     px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-xl 
                     hover:bg-secondary active:bg-secondary/80 
                     transition-colors duration-200
                     flex-shrink-0"
          aria-label={label}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="transition-colors hidden sm:block text-center font-mono text-[10px] text-muted-foreground group-hover:text-foreground">
            {label}
          </span>
        </button>
      ))}

      {/* Minimized windows separator + restore buttons */}
      <AnimatePresence>
        {minimizedWindows.length > 0 && (
          <>
            <div className="w-px h-6 sm:h-8 bg-border mx-0.5 sm:mx-1 flex-shrink-0" />
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
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-primary/10 text-primary 
                           text-[10px] sm:text-xs font-mono hover:bg-primary/20 
                           active:bg-primary/30 transition-colors flex-shrink-0"
                aria-label={`Restore ${w.title}`}
              >
                {w.title}
              </motion.button>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="w-px h-6 sm:h-8 bg-border mx-0.5 sm:mx-1 flex-shrink-0" />
      <ThemeToggle />
    </motion.nav>
  );
};

export default Taskbar;
