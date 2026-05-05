import express from "express"
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


import { app, server } from "./lib/socket.js";
const __dirname = path.resolve()

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: '10mb' })); // Increased limit for profile pictures
app.use(cookieParser());

const origins = ENV.CLIENT_URL ? ENV.CLIENT_URL.split(',').map(url => url.trim().replace(/\/$/, "")) : [];
if (ENV.NODE_ENV === "development") {
  origins.push("http://localhost:5173");
}

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use("/api/auth", authRoutes)
app.use("/api/messages",messageRoutes)

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
  }

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});