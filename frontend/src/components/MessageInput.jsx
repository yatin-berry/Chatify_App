import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { ImageIcon, SendIcon, XIcon, SmileIcon, PaperclipIcon } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-6 relative">
      <AnimatePresence>
        {imagePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-6 mb-4 p-2 glass-card rounded-2xl flex items-center gap-3 z-50"
          >
            <div className="relative size-20 rounded-xl overflow-hidden border border-white/10">
              <img src={imagePreview} alt="Preview" className="size-full object-cover" />
              <button
                onClick={removeImage}
                className="absolute top-1 right-1 size-6 bg-red-500/80 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="pr-4">
              <p className="text-xs font-semibold text-slate-300">Ready to send</p>
              <p className="text-[10px] text-slate-500">Image attached</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-3">
        <div className="flex-1 flex items-center glass-morphism rounded-[24px] px-4 min-h-[56px] ring-1 ring-white/5 focus-within:ring-indigo-500/50 transition-all duration-300">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-indigo-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <PaperclipIcon className="size-5" />
          </button>
          
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-500 py-3 text-sm px-2"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-indigo-400 transition-colors"
          >
            <SmileIcon className="size-5" />
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`size-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
            ${(!text.trim() && !imagePreview) 
              ? "bg-white/5 text-slate-600 grayscale cursor-not-allowed" 
              : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20"}`}
        >
          <SendIcon className="size-6 ml-0.5" />
        </motion.button>
      </form>
    </div>
  );
}

export default MessageInput;
