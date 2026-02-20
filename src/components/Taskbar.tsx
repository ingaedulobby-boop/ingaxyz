import { motion } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Wrench, FileText, Mail } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
{ icon: Home, label: "Home", href: "#home" },
{ icon: User, label: "About", href: "#about" },
{ icon: Briefcase, label: "Work", href: "#work-with-me" },
{ icon: FolderOpen, label: "Projects", href: "#projects" },
{ icon: Wrench, label: "Services", href: "#services" },
{ icon: FileText, label: "Blog", href: "#blog" },
{ icon: Mail, label: "Contact", href: "#contact" }];


const Taskbar = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="flex-shrink">

      {navItems.map(({ icon: Icon, label, href }) =>
      <button
        key={label}
        onClick={() => scrollTo(href)}
        className="group relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl 
                     hover:bg-secondary transition-colors duration-200"
        aria-label={label}>

          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="transition-colors hidden sm:block text-center font-serif text-xs bg-accent text-destructive-foreground">
            {label}
          </span>
        </button>
      )}
      <div className="w-px h-8 bg-border mx-1" />
      <ThemeToggle />
    </motion.nav>);

};

export default Taskbar;