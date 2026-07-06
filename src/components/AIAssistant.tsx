import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aiResponses } from "../data/dummyData";

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
}

const SUGGESTIONS = [
  "Find Client",
  "Suggest Mutual Funds",
  "Portfolio Summary",
  "Pending KYC",
  "SIP Calculator",
  "Investment Insights",
];

function formatTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "👋 Hello! I'm **FinVest AI**, your intelligent investment assistant.\n\nI can help you with client information, fund analysis, portfolio insights, and more. Choose a quick action or type your question below.",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const key = Object.keys(aiResponses).find((k) =>
        text.toLowerCase().includes(k.toLowerCase())
      );
      const response = key ? aiResponses[key] : aiResponses.default;
      setMessages((prev) => [...prev, { role: "ai", text: response, time: formatTime() }]);
    }, 700);
  };

  const handleSend = () => {
    if (input.trim()) sendMessage(input.trim());
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <p
          key={i}
          className={i > 0 ? "mt-1" : ""}
          dangerouslySetInnerHTML={{ __html: bold }}
        />
      );
    });

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-full px-4 py-2 shadow-lg border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2"
            >
              <Sparkles size={12} className="text-[#0F4C81]" /> FinVest AI Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.06 }}
          onClick={() => setOpen((o) => !o)}
          className="w-14 h-14 rounded-2xl bg-[#0F4C81] text-white flex items-center justify-center shadow-xl shadow-[#0F4C81]/30"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0F4C81] px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">FinVest AI</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <div className="text-blue-100/70 text-[10px]">Online · Ready to help</div>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-96">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#0F4C81] text-white rounded-br-md"
                        : "bg-slate-50 text-slate-800 border border-slate-100 rounded-bl-md"
                    }`}
                  >
                    {renderText(msg.text)}
                    <div className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/60" : "text-slate-400"}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 border-t border-slate-100">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Actions</div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 hover:bg-[#0F4C81]/10 hover:text-[#0F4C81] transition-colors"
                  >
                    <ChevronRight size={10} /> {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-slate-100">
              <div className="flex gap-2 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything about your clients..."
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0F4C81]/40 focus:ring-1 focus:ring-[#0F4C81]/20 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0B3A63] transition-colors"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
