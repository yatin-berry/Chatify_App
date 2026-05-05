import { Navigate, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="mesh-gradient" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center p-4 z-10"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass-morphism text-white border-white/10',
          style: {
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      />
    </div>
  );
}
export default App;