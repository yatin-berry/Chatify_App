import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex bg-white/5 p-1 rounded-2xl relative mb-4">
      {/* Animated Pill Background */}
      <motion.div
        className="absolute inset-y-1 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20"
        initial={false}
        animate={{
          x: activeTab === "chats" ? "0%" : "100%",
          width: "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        onClick={() => setActiveTab("chats")}
        className={`relative z-10 flex-1 py-2 text-sm font-semibold transition-colors duration-300 ${
          activeTab === "chats" ? "text-white" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        Messages
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`relative z-10 flex-1 py-2 text-sm font-semibold transition-colors duration-300 ${
          activeTab === "contacts" ? "text-white" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        Directory
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
