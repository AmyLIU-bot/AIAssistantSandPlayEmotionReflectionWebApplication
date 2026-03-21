import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, Moon, Volume2, Eye } from "lucide-react";
import { useState } from "react";

const SettingToggle = ({ icon: Icon, label, desc, defaultOn = false }: { icon: any; label: string; desc: string; defaultOn?: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground text-sm" style={{ fontFamily: "Quicksand" }}>{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-12 h-7 rounded-full transition-colors duration-200 flex items-center px-1 ${on ? "bg-primary" : "bg-border"}`}
      >
        <motion.div
          animate={{ x: on ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-primary-foreground shadow-sm"
        />
      </button>
    </div>
  );
};

const SettingsPage = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Quicksand" }}>
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">Customize your experience.</p>
      </div>

      <div className="space-y-3">
        <SettingToggle icon={Bell} label="Gentle Reminders" desc="Soft notifications to check in with yourself" defaultOn />
        <SettingToggle icon={Moon} label="Evening Wind-down" desc="Calming mode activates after 8 PM" />
        <SettingToggle icon={Volume2} label="Ambient Sounds" desc="Soft background sounds while using the app" />
        <SettingToggle icon={Eye} label="Reduced Motion" desc="Minimize animations for a simpler experience" />
      </div>
    </motion.div>
  </DashboardLayout>
);

export default SettingsPage;
