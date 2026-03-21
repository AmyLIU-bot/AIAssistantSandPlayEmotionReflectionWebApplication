import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Heart, Smile, Frown } from "lucide-react";

const moods = [
  { icon: Sun, label: "Radiant", color: "text-yellow-500" },
  { icon: Smile, label: "Content", color: "text-primary" },
  { icon: Heart, label: "Loved", color: "text-pink-400" },
  { icon: Cloud, label: "Neutral", color: "text-muted-foreground" },
  { icon: CloudRain, label: "Low", color: "text-blue-400" },
  { icon: Frown, label: "Struggling", color: "text-orange-400" },
];

interface Props {
  currentMood: number;
  onMoodChange: (index: number) => void;
}

const EmotionalStatus = ({ currentMood, onMoodChange }: Props) => {
  const current = moods[currentMood];

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4" style={{ fontFamily: "Quicksand" }}>
        How are you feeling?
      </h3>

      {/* Current mood display */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          key={currentMood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center"
        >
          <current.icon className={`w-7 h-7 ${current.color}`} />
        </motion.div>
        <div>
          <p className="text-lg font-semibold text-foreground" style={{ fontFamily: "Quicksand" }}>
            {current.label}
          </p>
          <p className="text-xs text-muted-foreground">Tap to change</p>
        </div>
      </div>

      {/* Mood selector */}
      <div className="flex gap-2">
        {moods.map((mood, i) => (
          <button
            key={i}
            onClick={() => onMoodChange(i)}
            className={`flex-1 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              i === currentMood
                ? "bg-primary/15 ring-1 ring-primary/30"
                : "hover:bg-accent"
            }`}
          >
            <mood.icon className={`w-4 h-4 ${i === currentMood ? mood.color : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionalStatus;
