import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, MousePointer, Smile, Shield } from "lucide-react";

const steps = [
  { icon: MousePointer, title: "Navigate", desc: "Hover over the sidebar to explore different sections of the app." },
  { icon: Smile, title: "Check In", desc: "Use the mood selector to reflect on how you're feeling right now." },
  { icon: BookOpen, title: "Journal", desc: "Track your emotional journey through recent activity logs." },
  { icon: Shield, title: "Your Space", desc: "This is a safe, private space. Everything stays with you." },
];

const HowToUse = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Quicksand" }}>
          How to Use
        </h1>
        <p className="text-muted-foreground mt-1">A gentle guide to your space.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass-card rounded-2xl p-6 flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground" style={{ fontFamily: "Quicksand" }}>{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </DashboardLayout>
);

export default HowToUse;
