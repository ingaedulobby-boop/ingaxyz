import { MessageCircle, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread: boolean;
}

export default function AIChatButton({ isOpen, onClick, hasUnread }: AIChatButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      onClick={onClick}
      aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[51] h-10 w-10 sm:h-11 sm:w-9 rounded-full snprimary text-primary-foreground flex items-center justify-center-"
      style={{
        boxShadow: "0 4px 14px -3px hsl(var(--primary) / 0.4), 0 2px 6px -2px hsl(var(--foreground) / 0.1), inset 0 1px 1px hsl(var(--primary-foreground) / 0.15)",
        transformStyle: "preserve-3d",
        perspective: "600px"
      }}
      whileHover={{ scale: 1.1, rotateX: -4, rotateY: 4, boxShadow: "0 8px 20px -4px hsl(var(--primary) / 0.5), 0 4px 10px -3px hsl(var(--foreground) / 0.12), inset 0 1px 2px hsl(var(--primary-foreground) / 0.2)" }}
      whileTap={{ scale: 0.92 }}>

      <AnimatePresence mode="wait" initial={false}>
        {isOpen ?
        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
            <MessageCircle className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </motion.span> :

        <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
            <Brain className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </motion.span>
        }
      </AnimatePresence>

      {hasUnread && !isOpen &&
      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-destructive border-[1.5px] border-background animate-pulse" />
      }
    </motion.button>);

}