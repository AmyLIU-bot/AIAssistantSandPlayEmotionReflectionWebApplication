import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Sparkles, Coffee } from "lucide-react";

const activities = [
  { icon: BookOpen, text: "Journaled about today's feelings", time: "2 hours ago", color: "bg-calm" },
  { icon: MessageCircle, text: "Completed a mindfulness check-in", time: "5 hours ago", color: "bg-warm" },
  { icon: Sparkles, text: "Achieved a 7-day streak", time: "Yesterday", color: "bg-gentle" },
  { icon: Coffee, text: "Set morning routine reminder", time: "2 days ago", color: "bg-accent" },
];

const RecentActivity = () => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4" style={{ fontFamily: "Quicksand" }}>
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <div className={`w-9 h-9 rounded-xl ${activity.color} flex items-center justify-center shrink-0`}>
              <activity.icon className="w-4 h-4 text-foreground/70" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
