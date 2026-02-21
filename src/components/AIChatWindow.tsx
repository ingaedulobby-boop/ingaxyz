import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Bot, User, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

type Msg = {role: "user" | "assistant";content: string;};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const STORAGE_KEY = "ai-chat-history";

function loadMessages(): Msg[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {

    /* ignore corrupt data */}
  return [];
}

function saveMessages(msgs: Msg[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {

    /* storage full or unavailable */}
}

async function streamChat({
  messages,
  onDelta,
  onDone,
  signal





}: {messages: Msg[];onDelta: (text: string) => void;onDone: () => void;signal?: AbortSignal;}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
    },
    body: JSON.stringify({ messages }),
    signal
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || `Error ${resp.status}`);
  }

  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const json = line.slice(6).trim();
      if (json === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  // flush
  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {

        /* ignore */}
    }
  }

  onDone();
}

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onNewMessage?: () => void;
}

export default function AIChatWindow({ isOpen, onClose, onNewMessage }: AIChatWindowProps) {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Msg[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages);
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMobile) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMobile]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const controller = new AbortController();
    abortRef.current = controller;

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      const content = assistantSoFar;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content } : m);
        }
        return [...prev, { role: "assistant", content }];
      });
      scrollToBottom();
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsertAssistant,
        onDone: () => {
          setIsLoading(false);
          onNewMessage?.();
        },
        signal: controller.signal
      });
    } catch (e: any) {
      setIsLoading(false);
      if (e.name === "AbortError") return;
      const msg = e.message || "Something went wrong";
      if (msg.includes("Rate limit")) {
        toast.error("Too many requests — please wait a moment and try again.");
      } else {
        toast.error(msg);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Simple markdown-ish rendering
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      // Bold
      const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className={line.trim() === "" ? "h-2" : ""} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.8 }}
        className={
        isMobile ?
        "fixed inset-0 z-[60] flex flex-col bg-background" :
        "fixed bottom-16 right-3 z-[60] flex flex-col w-[340px] h-[440px] rounded-2xl border border-transparent bg-card/80 backdrop-blur-xl overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/30"
        }
        style={{
          ...(!isMobile ?
          {
            boxShadow:
            "0 8px 30px -8px hsl(var(--foreground) / 0.15), 0 2px 8px -3px hsl(var(--foreground) / 0.08), inset 0 1px 0 hsl(var(--primary-foreground) / 0.05)",
            transformStyle: "preserve-3d" as const
          } :
          { height: "100svh", paddingBottom: "env(safe-area-inset-bottom)" })
        }}
        whileHover={
        !isMobile ?
        {
          boxShadow:
          "0 8px 30px -8px hsl(var(--foreground) / 0.15), 0 2px 8px -3px hsl(var(--foreground) / 0.08), inset 0 1px 0 hsl(var(--primary-foreground) / 0.05), 0 0 20px -4px hsl(var(--primary) / 0.25), 0 0 40px -8px hsl(var(--primary) / 0.12)"
        } :
        undefined
        }>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-window-header/60 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono tracking-wide text-primary">FAQai</span>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 &&
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => {
                setMessages([]);
                localStorage.removeItem(STORAGE_KEY);
              }}
              aria-label="Clear chat history">

                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
            }
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose} aria-label="Close chat">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 px-[12px] py-[12px]"
          style={{ WebkitOverflowScrolling: "touch" }}>

            {messages.length === 0 &&
          <div className="text-center text-muted-foreground text-sm py-8 space-y-2">
                <Bot className="w-8 h-8 mx-auto text-primary/50" />
                <p>Hi! I'm the AI assistant for this portfolio.</p>
                <p className="text-xs">Ask me about skills, projects, or services.</p>
              </div>
          }

            {messages.map((msg, i) =>
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" &&
            <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
            }
                <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === "user" ?
              "bg-primary text-primary-foreground rounded-br-md" :
              "bg-muted text-foreground rounded-bl-md"}`
              }>

                  {msg.role === "assistant" ? renderContent(msg.content) : msg.content}
                </div>
                {msg.role === "user" &&
            <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
            }
              </div>
          )}

            {isLoading && messages[messages.length - 1]?.role === "user" &&
          <div className="flex gap-2.5 justify-start">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-3.5 py-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
          }
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-border bg-background/80 backdrop-blur-sm py-[8px] px-[10px]">
            <div className="flex items-center gap-2">
              <input
              ref={inputRef}
              type="text"
              enterKeyHint="send"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 h-11 px-4 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50" />

              <Button
              size="icon"
              className="h-11 w-11 rounded-xl shrink-0"
              onClick={send}
              disabled={!input.trim() || isLoading}
              aria-label="Send message">

                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}