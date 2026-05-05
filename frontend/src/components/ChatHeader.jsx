import { XIcon, MoreVerticalIcon, PhoneIcon, VideoIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="px-8 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="size-12 rounded-2xl overflow-hidden ring-2 ring-indigo-500/20">
            <img src={selectedUser.profilePicture || "/avatar.png"} alt={selectedUser.userName} className="object-cover size-full" />
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          )}
        </motion.div>

        <div>
          <h3 className="text-white font-bold text-lg">{selectedUser.userName}</h3>
          <p className="text-slate-500 text-xs flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${isOnline ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-600"}`} />
            {isOnline ? "Always active" : "Last seen recently"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <PhoneIcon className="size-5" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <VideoIcon className="size-5" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <MoreVerticalIcon className="size-5" />
        </button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2.5 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
        >
          <XIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
