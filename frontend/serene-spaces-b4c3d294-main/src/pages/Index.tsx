import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import EmotionalStatus from "@/components/EmotionalStatus";
import RecentActivity from "@/components/RecentActivity";
import ProfileSection from "@/components/ProfileSection";
import { Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Index = () => {
  const [name, setName] = useState("Alex");
  const [mood, setMood] = useState(1);

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Greeting */}
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Welcome back</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "Quicksand" }}>
            Hello, {name} 🌿
          </h1>
          <p className="text-muted-foreground mt-1">
            Take a breath. You're doing great today.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={item}>
            <EmotionalStatus currentMood={mood} onMoodChange={setMood} />
          </motion.div>
          <motion.div variants={item}>
            <ProfileSection name={name} onNameChange={setName} />
          </motion.div>
        </div>

        <motion.div variants={item}>
          <RecentActivity />
        </motion.div>

        {/* Gentle affirmation */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 text-center">
          <p className="text-muted-foreground text-sm italic">
            "You are allowed to take things one step at a time."
          </p>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
