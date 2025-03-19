import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.cookie("myCookie", "Hello from backend!", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Enables secure cookies in production
    sameSite: "strict",
  });
  res.json({ message: "Cookie has been set!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));