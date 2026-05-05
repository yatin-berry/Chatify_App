import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-7xl h-[85vh] flex items-center justify-center"
    >
      <div className="glass-card w-full h-full rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        {/* SIDEBAR */}
        <div className="w-full md:w-80 glass-morphism md:border-r border-white/5 flex flex-col z-20">
          <ProfileHeader />
          <div className="px-4 py-2">
            <ActiveTabSwitch />
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col relative z-10 bg-slate-950/20">
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ChatPage;
