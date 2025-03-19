import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Enable CORS to allow frontend requests
app.use(
  cors({
    origin: "https://cookie-tests.vercel.app", // Frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ["POST"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(cookieParser());
app.use(express.json());

// ✅ Route to set a cookie
app.get("/", (req, res) => {
  console.log("Setting cookie...");
  res.cookie("myCookie", "Hello from backend!", {
    httpOnly: true,
    secure: true, // Only secure in production
    sameSite: "None", // Allows cross-site cookies
  });
  res.json({ message: "Cookie has been set!" });
});

// ✅ New route to check if cookies are received
app.get("/test-cookie", (req, res) => {
  console.log("Received cookies:", req.cookies);
  if (req.cookies.myCookie) {
    res.json({ message: "Cookie received!", cookieValue: req.cookies.myCookie });
  } else {
    res.json({ message: "No cookie found!" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
