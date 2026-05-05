import { MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12">
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "easeInOut"
        }}
        className="size-24 bg-indigo-600/20 rounded-3xl flex items-center justify-center mb-8 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
      >
        <MessageCircleIcon className="size-12 text-indigo-400" />
      </motion.div>
      <h3 className="text-3xl font-bold text-white mb-3">Your Space Awaits</h3>
      <p className="text-slate-500 max-w-sm leading-relaxed">
        Select a friend from the directory to start a new adventure in real-time messaging.
      </p>
      
      <div className="mt-12 flex gap-3">
        <div className="size-2 rounded-full bg-indigo-500/40 animate-pulse" />
        <div className="size-2 rounded-full bg-indigo-500/40 animate-pulse delay-75" />
        <div className="size-2 rounded-full bg-indigo-500/40 animate-pulse delay-150" />
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;
