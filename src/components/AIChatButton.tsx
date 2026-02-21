import { Sparkles, MessageCircle } from "lucide-react";
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
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[61] h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.span>
        ) : (
          <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Unread dot */}
      {hasUnread && !isOpen && (
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-destructive border-2 border-background animate-pulse" />
      )}
    </motion.button>
  );
}
