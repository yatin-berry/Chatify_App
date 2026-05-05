import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

function SignUpPage() {
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
        {/* Glow Decorator */}
        <div className="absolute -bottom-24 -left-24 size-48 bg-purple-500/20 blur-[80px]" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="size-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
              <MessageCircleIcon className="size-8 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Join Chatify</h2>
            <p className="text-slate-400 mt-2">Connect with the world in real-time</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="input-modern pl-12"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-modern pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-modern pl-12"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              className="btn-primary-modern w-full !bg-purple-600 hover:!bg-purple-500 mt-6 flex items-center justify-center gap-2"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUpPage;