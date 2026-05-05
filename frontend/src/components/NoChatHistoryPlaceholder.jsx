import { MessageCircleIcon, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="size-20 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
      >
        <SparklesIcon className="size-10 text-indigo-400" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white mb-2">
        A new connection with {name}
      </h3>
      <p className="text-slate-500 max-w-xs text-sm mb-10 leading-relaxed">
        Be the first to break the ice! Every great friendship starts with a simple "Hello".
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {["👋 Say Hello", "🤝 How's it going?", "✨ Let's catch up!"].map((text, i) => (
          <motion.button
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="px-6 py-2.5 text-sm font-semibold text-indigo-300 glass-morphism rounded-xl hover:bg-indigo-600/20 hover:text-white transition-all border-indigo-500/10"
          >
            {text}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
