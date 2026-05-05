import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { motion, AnimatePresence } from "framer-motion";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isSentByMe = msg.senderId === authUser._id;
                return (
                  <motion.div
                    key={msg._id || idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] group`}>
                      <div className={`
                        relative px-5 py-3 shadow-xl
                        ${isSentByMe 
                          ? "bg-indigo-600 text-white rounded-[20px] rounded-tr-none" 
                          : "glass-morphism text-slate-200 rounded-[20px] rounded-tl-none"}
                      `}>
                        {msg.image && (
                          <motion.img 
                            layoutId={msg._id}
                            src={msg.image} 
                            alt="Shared image" 
                            className="rounded-xl mb-3 max-h-60 w-full object-cover cursor-zoom-in" 
                          />
                        )}
                        {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                        
                        <div className={`
                          text-[10px] mt-1.5 font-medium opacity-60 flex items-center gap-1
                          ${isSentByMe ? "justify-end" : "justify-start"}
                        `}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isSentByMe && <span className="text-emerald-400">●</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.userName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;