import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://cookie-tests.vercel.app", // No trailing slash
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "OPTIONS"], // Allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("hello");
  res.cookie("myCookie", "Hello from backend!", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Enables secure cookies in production
    sameSite: "strict",
  });
  res.json({ message: "Cookie has been set!" });
});

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
