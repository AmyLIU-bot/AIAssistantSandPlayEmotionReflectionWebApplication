import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Layers, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EmotionalEntry } from "@/data/emotionalData";

interface Props {
  entry: EmotionalEntry;
  onClose: () => void;
}

const scoreColor = (score: number) => {
  if (score >= 80) return "text-primary";
  if (score >= 65) return "text-muted-foreground";
  return "text-destructive/80";
};

const DayDetailCard = ({ entry, onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-3 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold" style={{ fontFamily: "Quicksand" }}>
              {entry.date} — <span className={scoreColor(entry.score)}>Score: {entry.score}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">{entry.summary}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3 items-start">
            <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">Journal</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{entry.journal}</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Layers className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">Sandbox Record</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{entry.sandbox}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DayDetailCard;
