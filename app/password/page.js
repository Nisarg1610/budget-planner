"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Color palette
const colors = {
  dark: "#0F2854",
  primary: "#1C4D8D",
  secondary: "#4988C4",
  light: "#BDE8F5"
};

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: simple 4-digit password check
    if (password === "0216") {
      router.push("/home");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Budget Planner</h2>
        <p style={subtitleStyle}>Enter your 4-digit PIN</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="password"
            maxLength={4}
            placeholder="****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>Enter</button>
        </form>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.light,
  padding: "16px"
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "40px 30px",
  width: "100%",
  maxWidth: "360px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(15,40,84,0.15)"
};

const titleStyle = {
  color: colors.dark,
  fontSize: "1.8rem",
  marginBottom: "8px"
};

const subtitleStyle = {
  color: colors.secondary,
  fontSize: "1rem",
  marginBottom: "24px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const inputStyle = {
  padding: "14px",
  fontSize: "1.2rem",
  borderRadius: "12px",
  border: `1px solid ${colors.secondary}`,
  textAlign: "center",
  letterSpacing: "8px",
  color: colors.dark
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: colors.primary,
  color: colors.light,
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer"
};
