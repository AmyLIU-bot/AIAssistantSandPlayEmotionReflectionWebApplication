import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import EmotionalStatus from "@/components/EmotionalStatus";
import ProfileSection from "@/components/ProfileSection";
import RecentActivity from "@/components/RecentActivity";

const UserInfo = () => {
  const [name, setName] = useState("Alex");
  const [mood, setMood] = useState(1);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Quicksand" }}>
            Your Information
          </h1>
          <p className="text-muted-foreground mt-1">Everything about you, in one calm place.</p>
        </div>

        <ProfileSection name={name} onNameChange={setName} />
        <EmotionalStatus currentMood={mood} onMoodChange={setMood} />
        <RecentActivity />
      </motion.div>
    </DashboardLayout>
  );
};

export default UserInfo;
