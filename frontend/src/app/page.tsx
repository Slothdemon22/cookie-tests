"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");

  // Function to set the cookie
  const setCookie = async () => {
    try {
      const response = await axios.get("http://localhost:5000/", {
        withCredentials: true, // Ensures cookies are sent & received
      });
      console.log(response.data);
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error setting cookie:", err);
    }
  };

  // Function to check if cookie is received
  const checkCookie = async () => {
    try {
      const response = await axios.get("http://localhost:5000/test-cookie", {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      console.log(response.data);
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error checking cookie:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Cookie Testing</h1>
      <button onClick={setCookie} style={{ marginRight: "10px" }}>
        Set Cookie
      </button>
      <button onClick={checkCookie}>Check Cookie</button>
      {message && <p>{message}</p>}
    </div>
  );
}
