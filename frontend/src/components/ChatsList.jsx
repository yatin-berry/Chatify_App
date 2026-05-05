import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-3">
      {chats.map((chat, idx) => (
        <motion.button
          key={chat._id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => setSelectedUser(chat)}
          className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative group
            ${selectedUser?._id === chat._id 
              ? "bg-indigo-600/20 ring-1 ring-indigo-500/50" 
              : "hover:bg-white/5"}`}
        >
          {/* Avatar with Status */}
          <div className="relative">
            <div className="size-12 rounded-xl overflow-hidden bg-slate-800">
              <img 
                src={chat.profilePicture || "/avatar.png"} 
                alt={chat.userName} 
                className="size-full object-cover"
              />
            </div>
            {onlineUsers.includes(chat._id) && (
              <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            )}
          </div>

          <div className="flex-1 text-left">
            <h4 className="text-white font-semibold truncate group-hover:text-indigo-300 transition-colors">
              {chat.userName}
            </h4>
            <p className="text-slate-500 text-xs truncate">
              {onlineUsers.includes(chat._id) ? "Active now" : "Offline"}
            </p>
          </div>

          {selectedUser?._id === chat._id && (
            <motion.div 
              layoutId="active-indicator"
              className="absolute right-3 size-2 bg-indigo-400 rounded-full" 
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default ChatsList;
