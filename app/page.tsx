"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress over 2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          router.push("/password"); // Navigate to password page after 2s
          return 100;
        }
        return prev + 2; // increment ~2% every 40ms → ~2s total
      });
    }, 40);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Budget Planner</h1>
      <p style={subtitleStyle}>
        Track your spending and take control of your money
      </p>

      {/* Progress bar container */}
      <div style={progressBarContainer}>
        <div style={{ ...progressBarFill, width: `${progress}%` }}></div>
      </div>

      <p style={progressText}>{`Loading ${progress}%`}</p>
    </div>
  );
}

// Color palette
const colors = {
  dark: "#0F2854",
  primary: "#1C4D8D",
  secondary: "#4988C4",
  light: "#BDE8F5"
};

// Styles with React.CSSProperties
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "linear-gradient(to bottom, #0F2854, #1C4D8D)",
  color: "white",
  textAlign: "center",
  padding: "20px"
};

const titleStyle: React.CSSProperties = {
  fontSize: "3rem",
  marginBottom: "20px",
  color: "white"
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  marginBottom: "40px",
  color: colors.light
};

const progressBarContainer: React.CSSProperties = {
  width: "80%",
  height: "12px",
  backgroundColor: "#ffffff33",
  borderRadius: "8px",
  overflow: "hidden"
};

const progressBarFill: React.CSSProperties = {
  height: "100%",
  backgroundColor: colors.light,
  borderRadius: "8px",
  transition: "width 0.04s linear"
};

const progressText: React.CSSProperties = {
  marginTop: "12px",
  color: "#ffffffaa",
  fontSize: "0.9rem"
};
