"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/", {
        withCredentials: true, // Required for cookies
      });
      console.log(response.data);
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error making request:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Click the button to make a request</h1>
      <button onClick={handleRequest}>Request Cookies</button>
      {message && <p>{message}</p>}
    </div>
  );
}
