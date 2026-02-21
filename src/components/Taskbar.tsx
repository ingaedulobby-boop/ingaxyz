import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Wrench, FileText, Mail, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useWindowManager } from "@/components/window-system/WindowManagerContext";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
{ icon: Home, label: "Home", href: "#home" },
{ icon: User, label: "About", href: "#about" },
{ icon: Briefcase, label: "Work", href: "#work-with-me" },
{ icon: FolderOpen, label: "Projects", href: "#projects" },
{ icon: Wrench, label: "Services", href: "#services" },
{ icon: FileText, label: "Blog", href: "#blog" },
{ icon: Mail, label: "Contact", href: "#contact" }];


const Taskbar = () => {
  const { minimizedWindows, restoreWindow } = useWindowManager();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // ─── Mobile: bottom tab bar + fullscreen overlay ───
  if (isMobile) {
    // Show only 5 most important items in the tab bar; rest in overlay
    const primaryItems = navItems.slice(0, 4);

    return (
      <>
        {/* Bottom tab bar */}
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around
                     px-2 pb-[env(safe-area-inset-bottom)] pt-2
                     bg-background/90 backdrop-blur-xl border-t border-border/50 shadow-lg"
          aria-label="Main navigation">

          {primaryItems.map(({ icon: Icon, label, href }) =>
          <button
            key={label}
            onClick={() => scrollTo(href)}
            className="flex flex-col items-center gap-1 flex-1 min-w-0
                         py-2 rounded-xl active:bg-secondary/60 transition-colors"
            aria-label={label}>

              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="font-mono text-[10px] text-muted-foreground truncate">{label}</span>
            </button>
          )}

          {/* "More" button opens the full overlay */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 flex-1 min-w-0
                       py-2 rounded-xl active:bg-secondary/60 transition-colors"
            aria-label="More navigation options">

            <div className="w-5 h-5 flex flex-col items-center justify-center gap-[3px]">
              <span className="w-4 h-[2px] rounded-full bg-muted-foreground" />
              <span className="w-4 h-[2px] rounded-full bg-muted-foreground" />
              <span className="w-4 h-[2px] rounded-full bg-muted-foreground" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">More</span>
          </button>

          <ThemeToggle />
        </motion.nav>

        {/* Minimized windows — floats just above tab bar */}
        <AnimatePresence>
          {minimizedWindows.length > 0 &&
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 right-0 z-40
                         flex flex-wrap gap-2 px-4 justify-start">

              {minimizedWindows.map((w) =>
            <motion.button
              key={w.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => {
                restoreWindow(w.id);
                document.getElementById(w.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-2 rounded-xl glass-strong shadow-md text-primary
                             text-xs font-mono active:bg-primary/20 transition-colors min-h-[36px]"
              aria-label={`Restore ${w.title}`}>

                  {w.title}
                </motion.button>
            )}
            </motion.div>
          }
        </AnimatePresence>

        {/* Fullscreen overlay — shows all nav items */}
        <AnimatePresence>
          {mobileMenuOpen &&
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-xl flex flex-col
                         pb-[env(safe-area-inset-bottom)]">

              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Navigation</p>
                <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-2xl bg-secondary/60 flex items-center justify-center
                             active:bg-secondary transition-colors"
                aria-label="Close navigation">

                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* All nav items */}
              <nav className="flex-1 flex flex-col justify-center px-5 gap-1">
                {navItems.map(({ icon: Icon, label, href }, i) =>
              <motion.button
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                onClick={() => scrollTo(href)}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl w-full
                               text-foreground hover:bg-secondary/50 active:bg-secondary
                               transition-colors min-h-[60px]">

                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-mono text-base font-medium">{label}</span>
                  </motion.button>
              )}
              </nav>

              {/* Footer */}
              <div className="px-5 py-4 flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground">AI × UX Portfolio</p>
                <ThemeToggle />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </>);

  }

  // ─── Desktop: dock-style taskbar (unchanged) ───
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 gap-1 py-2 px-[10px] glass-strong rounded-sm flex items-center justify-center shadow-sm"

      aria-label="Main navigation">

      {navItems.map(({ icon: Icon, label, href }) =>
      <button
        key={label}
        onClick={() => scrollTo(href)}
        className="group relative flex flex-col items-center gap-0.5
                     px-3 py-2 rounded-xl
                     hover:bg-secondary active:bg-secondary/80
                     transition-colors duration-200"
        aria-label={label}>

          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
            {label}
          </span>
        </button>
      )}

      <AnimatePresence>
        {minimizedWindows.length > 0 &&
        <>
            <div className="w-px h-8 bg-border mx-1 flex-shrink-0" />
            {minimizedWindows.map((w) =>
          <motion.button
            key={w.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => {
              restoreWindow(w.id);
              document.getElementById(w.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary
                           text-xs font-mono hover:bg-primary/20
                           active:bg-primary/30 transition-colors flex-shrink-0"
            aria-label={`Restore ${w.title}`}>

                {w.title}
              </motion.button>
          )}
          </>
        }
      </AnimatePresence>

      <div className="w-px h-8 bg-border mx-1 flex-shrink-0" />
      <ThemeToggle />
    </motion.nav>);

};

export default Taskbar;