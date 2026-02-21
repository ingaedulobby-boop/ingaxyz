import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Wrench, FileText, Mail, Menu, X } from "lucide-react";
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
    // Small delay so the menu closes before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // ─── Mobile: hamburger + fullscreen overlay ───
  if (isMobile) {
    return (
      <>
        {/* Floating action buttons: hamburger + theme */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 safe-bottom">

          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-12 h-12 rounded-2xl glass-strong shadow-2xl flex items-center justify-center
                       text-foreground active:bg-secondary transition-colors"
            aria-label="Open navigation">

            <Menu className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Minimized windows pill — fixed bottom-left */}
        <AnimatePresence>
          {minimizedWindows.length > 0 &&
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-16 left-4 z-50 flex flex-wrap gap-2 max-w-[60vw] safe-bottom">

              {minimizedWindows.map((w) =>
            <motion.button
              key={w.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => {
                restoreWindow(w.id);
                const el = document.getElementById(w.id);
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3 py-2 rounded-xl glass-strong shadow-lg text-primary 
                             text-xs font-mono active:bg-primary/20 transition-colors"
              aria-label={`Restore ${w.title}`}>

                  {w.title}
                </motion.button>
            )}
            </motion.div>
          }
        </AnimatePresence>

        {/* Fullscreen overlay menu */}
        <AnimatePresence>
          {mobileMenuOpen &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col">

              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center
                             active:bg-secondary transition-colors"
                aria-label="Close navigation">

                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
                {navItems.map(({ icon: Icon, label, href }, i) =>
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => scrollTo(href)}
                className="w-full max-w-xs flex items-center gap-4 px-6 py-4 rounded-2xl
                               text-foreground hover:bg-secondary/50 active:bg-secondary 
                               transition-colors">

                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-mono text-base font-medium">{label}</span>
                  </motion.button>
              )}
              </nav>

              {/* Footer */}
              <div className="p-6 flex justify-center">
                <p className="font-mono text-xs text-muted-foreground">AI × UX Portfolio</p>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </>);

  }

  // ─── Desktop: dock-style taskbar ───
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 py-2 glass-strong shadow-lg px-[10px] rounded-sm">




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
          <span className="text-center font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
            {label}
          </span>
        </button>
      )}

      {/* Minimized windows */}
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
              const el = document.getElementById(w.id);
              el?.scrollIntoView({ behavior: "smooth" });
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