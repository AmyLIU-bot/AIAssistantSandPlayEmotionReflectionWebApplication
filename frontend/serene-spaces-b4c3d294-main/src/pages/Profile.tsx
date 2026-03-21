import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import AccountActions from "@/components/profile/AccountActions";

const Profile = () => {
  const [name, setName] = useState("Alex");
  const [email, setEmail] = useState("alex@example.com");

  const handleSave = (newName: string, newEmail: string) => {
    setName(newName);
    setEmail(newEmail);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div>
          <h1
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "Quicksand, sans-serif" }}
          >
            Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and account settings.
          </p>
        </div>

        <ProfileForm initialName={name} initialEmail={email} onSave={handleSave} />
        <AccountActions />
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
