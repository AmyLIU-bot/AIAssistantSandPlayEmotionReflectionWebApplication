import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import EmotionalChart from "@/components/dashboard/EmotionalChart";
import DayDetailCard from "@/components/dashboard/DayDetailCard";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";
import { emotionalData, type EmotionalEntry } from "@/data/emotionalData";

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState<EmotionalEntry | null>(null);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-[1200px] mx-auto"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Quicksand" }}>
            Emotional History
          </h1>
          <p className="text-muted-foreground mt-1">
            Your emotional journey, visualized gently.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: 65% */}
          <div className="w-full lg:w-[65%] space-y-5">
            <EmotionalChart data={emotionalData} onDayClick={setSelectedDay} selectedDay={selectedDay} />

            <AnimatePresence mode="wait">
              {selectedDay && (
                <DayDetailCard entry={selectedDay} onClose={() => setSelectedDay(null)} />
              )}
            </AnimatePresence>
          </div>

          {/* Right: 35% */}
          <div className="w-full lg:w-[35%]">
            <AIInsightsPanel />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
