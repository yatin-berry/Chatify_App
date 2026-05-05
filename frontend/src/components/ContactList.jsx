import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-3">
      {allContacts.map((contact, idx) => (
        <motion.button
          key={contact._id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => setSelectedUser(contact)}
          className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative group
            ${selectedUser?._id === contact._id 
              ? "bg-indigo-600/20 ring-1 ring-indigo-500/50" 
              : "hover:bg-white/5"}`}
        >
          <div className="relative">
            <div className="size-12 rounded-xl overflow-hidden bg-slate-800">
              <img 
                src={contact.profilePicture || "/avatar.png"} 
                className="size-full object-cover"
                alt={contact.userName}
              />
            </div>
            {onlineUsers.includes(contact._id) && (
              <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            )}
          </div>

          <div className="flex-1 text-left">
            <h4 className="text-white font-semibold truncate group-hover:text-indigo-300 transition-colors">
              {contact.userName}
            </h4>
            <p className="text-slate-500 text-xs">
              {onlineUsers.includes(contact._id) ? "Online" : "Contact"}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export default ContactList;
