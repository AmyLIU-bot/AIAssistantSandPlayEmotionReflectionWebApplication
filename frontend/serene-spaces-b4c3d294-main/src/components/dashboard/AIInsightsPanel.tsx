import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Activity, Sparkles, Send, Play } from "lucide-react";

const insights = [
  { icon: TrendingUp, label: "Improving stability", detail: "Your scores have trended upward over the past 5 days.", tone: "positive" as const },
  { icon: TrendingDown, label: "Mid-month dip", detail: "A brief stress period around Mar 10–11 was followed by strong recovery.", tone: "neutral" as const },
  { icon: Activity, label: "Irregular fluctuations", detail: "Day-to-day swings suggest external stressors. Routines may help.", tone: "caution" as const },
];

const suggestions = [
  "Try a 10-minute breathing exercise before bed",
  "Journal about one thing you're grateful for",
  "Schedule a nature walk this weekend",
];

type ChatMsg = { role: "user" | "ai"; text: string };

const AIInsightsPanel = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ai", text: "Hi! I've been looking at your emotional history. Feel free to ask me anything about your trends or how to improve your well-being. 💚" },
  ]);

  const sendMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "ai", text: "Thank you for sharing. Based on your recent data, I'd suggest focusing on consistency in your routines — your best days correlate with structured self-care activities." },
    ]);
    setChatInput("");
  };

  const toneColors: Record<string, string> = {
    positive: "bg-primary/10 text-primary",
    neutral: "bg-secondary text-secondary-foreground",
    caution: "bg-destructive/10 text-destructive/80",
  };

  return (
    <div className="space-y-5 lg:sticky lg:top-8">
      {/* Insights */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2" style={{ fontFamily: "Quicksand" }}>
            <Sparkles className="h-4 w-4 text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((ins, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-3 items-start"
            >
              <div className={`p-1.5 rounded-md shrink-0 ${toneColors[ins.tone]}`}>
                <ins.icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{ins.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{ins.detail}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold" style={{ fontFamily: "Quicksand" }}>
            Supportive Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {s}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chat */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold" style={{ fontFamily: "Quicksand" }}>
            Talk with AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScrollArea className="h-[180px] pr-2">
            <div className="space-y-2.5">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm leading-relaxed ${m.role === "ai" ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                  <span className="text-xs font-semibold text-primary mr-1">{m.role === "ai" ? "AI:" : "You:"}</span>
                  {m.text}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <Textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about your emotional trends..."
              className="min-h-[40px] max-h-[80px] resize-none text-sm bg-background/50"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <Button size="icon" className="shrink-0 h-10 w-10" onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Button className="w-full rounded-full py-5 text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 bg-primary text-primary-foreground hover:bg-primary/90">
        <Play className="w-4 h-4 mr-1" />
        Start Sandbox Now
      </Button>
    </div>
  );
};

export default AIInsightsPanel;
