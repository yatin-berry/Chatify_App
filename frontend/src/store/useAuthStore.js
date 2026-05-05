import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL 
  ? import.meta.env.VITE_BACKEND_URL.replace("/api", "") 
  : (import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://chatify-app-v2cc.onrender.com");

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth:true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            get().connectSocket();
        } catch(error){
            console.log("Error in authCheck:", error);
            set({authUser: null})
        } finally {
            set({isCheckingAuth:false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data});
            get().connectSocket();
            toast.success("Account created successfully!")
        } catch(error){
            console.log("Error in signup:", error);
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true})
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            get().connectSocket();
            toast.success("Logged in successfully!")
        } catch(error){
            console.log("Error in login:", error);
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },
}))