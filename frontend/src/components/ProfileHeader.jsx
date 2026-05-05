import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, CameraIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="p-6 border-b border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="size-14 rounded-2xl overflow-hidden ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/50 transition-all duration-300"
            >
              <img
                src={selectedImg || authUser.profilePicture || "/avatar.png"}
                alt="User profile"
                className="size-full object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <CameraIcon className="size-5 text-white" />
              </button>
            </motion.div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg leading-tight truncate max-w-[120px]">
              {authUser.userName}
            </h3>
            <span className="text-indigo-400 text-xs font-medium uppercase tracking-wider">Active</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"
          >
            {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
          </button>
          
          <button
            onClick={logout}
            className="p-2 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
          >
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
