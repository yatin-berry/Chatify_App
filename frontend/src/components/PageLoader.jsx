import { motion } from "framer-motion";

function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950">
      <div className="mesh-gradient opacity-40" />
      
      <div className="relative flex flex-col items-center">
        <motion.div
          className="size-24 rounded-3xl border-4 border-indigo-500/20 border-t-indigo-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-xl font-bold text-white tracking-widest uppercase">Chatify</h2>
          <p className="text-slate-500 text-xs mt-2 font-medium">Entering the Nebula...</p>
        </motion.div>

        {/* Pulsing Dots */}
        <div className="mt-4 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="size-1.5 rounded-full bg-indigo-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageLoader;